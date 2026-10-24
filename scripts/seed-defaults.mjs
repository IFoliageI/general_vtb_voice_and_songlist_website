// ============================================================
//  施加默认种子数据：data/seed.sql  →  data/content.db
//
//  用法：
//      node scripts/seed-defaults.mjs          # 幂等写入（已存在的分组/设置保持原样）
//      node scripts/seed-defaults.mjs --dry-run
//
//  - schema.sql 只建结构；默认分组与空状态文案都在 seed.sql 里，
//    这样测试用 schema.sql 建临时库时不会撞上种子数据。
//  - 写入前自动备份到 data/backups/。
//  - 写完执行：node scripts/content-sync.mjs（或直接 pnpm build，会自动同步）
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { backupDatabase, DB_PATH, openDb, ROOT } from './lib/db.mjs';

const SEED_PATH = path.join(ROOT, 'data', 'seed.sql');
const dryRun = process.argv.includes('--dry-run');

async function main() {
  if (!fs.existsSync(DB_PATH)) {
    console.error('✖ 内容库不存在：' + DB_PATH);
    console.error('  先创建内容库（首次可用：pnpm content:upgrade，或从快照恢复 pnpm content:migrate），再跑本脚本。');
    process.exitCode = 1;
    return;
  }
  if (!fs.existsSync(SEED_PATH)) {
    console.error('✖ 找不到种子文件：' + SEED_PATH);
    process.exitCode = 1;
    return;
  }

  const sql = fs.readFileSync(SEED_PATH, 'utf8');
  const db = openDb({ readOnly: dryRun ? true : false });
  try {
    const beforeGroups = db.prepare('SELECT COUNT(1) n FROM groups').get().n;
    const beforeSettings = db.prepare('SELECT COUNT(1) n FROM settings').get().n;

    if (dryRun) {
      console.log(`· 当前：groups=${beforeGroups} settings=${beforeSettings}`);
      console.log('· dry-run：未写入。去掉 --dry-run 才会真正施加种子。');
      return;
    }

    await backupDatabase(db);
    db.exec(sql);

    const afterGroups = db.prepare('SELECT COUNT(1) n FROM groups').get().n;
    const afterSettings = db.prepare('SELECT COUNT(1) n FROM settings').get().n;
    console.log(`✓ 已施加种子：groups ${beforeGroups} → ${afterGroups}，settings ${beforeSettings} → ${afterSettings}`);
    console.log('下一步：node scripts/content-sync.mjs    （或 pnpm build，会自动同步）');
  } finally {
    db.close();
  }
}

main().catch((error) => {
  console.error('✖ 施加种子失败：' + (error?.message ?? error));
  process.exitCode = 1;
});
