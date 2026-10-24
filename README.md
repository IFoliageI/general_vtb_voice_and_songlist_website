# 通用 VTuber 音声与歌单模板

> Astro 5 + SolidJS 纯静态站点模板：**音声按钮板 + 歌单页 + 关于页**。
> 内容用本地 SQLite 管理，构建时生成静态 JSON —— **部署后不需要 Node、也不需要数据库**。

---

## 这个模板能做什么

- **音声按钮板**：点一下播放一条音声；支持分组、合集（一个按钮展开多个成员）、彩蛋（隐藏分组，连续点击标题解锁）、按钮左侧特效图标
- **歌单页**：按「歌曲类型 / 原唱作者」两种视图浏览，支持音档时长、上传者与「歌切指路」纯文本
- **内容管线**：`data/content.db` 是唯一内容源 → 构建时生成 `src/data/content.json` 与可 diff 的 `data/content-dump.sql`
- **媒体来源灵活**：本地相对路径，或完整 HTTP(S) 直链（OSS / 图床），后者原样保留签名参数
- **子路径部署**：GitHub Pages 项目页（`/<repo>/`）、Cloudflare Pages 子目录都能直接跑
- **可选 Cloudflare D1**：构建期从 D1 REST 读取内容（默认关闭，纯本地照常可用）
- **明暗主题** + 一套中文开发文档 + 81 个单元测试

## 快速开始

```powershell
pnpm install

# 首次：从结构建库 + 施加默认分组
node scripts/content-migrate.mjs   # 从快照恢复（模板仓库已带 content.db，通常不需要）
node scripts/seed-defaults.mjs     # 幂等：补默认分组与空状态文案（也可 pnpm content:seed）

# 加内容
pnpm content:add --group greeting --zh "早上好" --path "greeting/morning.mp3"
#   音频文件放到 public/audio/greeting/morning.mp3

# 本地预览（会自动同步内容）
pnpm dev            # http://localhost:4321

# 构建静态产物
pnpm build          # 产物在 dist/
```

## 常用命令

| 命令 | 作用 |
|---|---|
| `pnpm dev` / `pnpm build` / `pnpm preview` | 开发 / 构建 / 预览（构建前自动同步内容） |
| `pnpm test` | 单元测试（81 例） |
| `pnpm content:stats` / `groups` / `list` | 查看分组统计 / 分组 id / 条目清单 |
| `pnpm content:add` | 新增条目（支持 `--stack`、`--hidden`、`--special-effect` 等） |
| `pnpm content:seed` | 施加默认分组与空状态文案（幂等） |
| `pnpm content:check` | 检查内容库与磁盘音频是否一致 |
| `pnpm content:verify` | 构建产物校验 |
| `pnpm d1:push` / `d1:export` | 本地 → D1 / D1 → 快照（默认 dry-run） |

完整说明见 **[开发文档.md](开发文档.md)** 与 **[配色修改指南.md](配色修改指南.md)**。

## 目录结构

```
data/            content.db（内容源，需入库）、schema.sql（结构）、seed.sql（默认种子）、content-dump.sql（快照）
public/audio/    音档（按分组放子目录；songs/ 放歌单）
src/components/  SoundBoard / SongBoard 等岛屿组件
src/data/        content.json（生成物）、voices.ts、songs.ts、site.ts（站点身份，改这里）
src/pages/       首页 / request（歌单）/ about
scripts/         内容同步、CLI、D1 工具、预览服务器、校验
tests/           node:test 单元测试
docs/            部署与 D1 说明
```

## 用这个模板前，请替换

1. **站点身份**：`src/data/site.ts`（站点名、描述、关键词、页脚、侧栏外链、友链）
2. **占位图标**：`public/icons/index.ico`（站点 logo）、`public/icons/external-link.ico`、`public/favicon.ico`、`public/thumbs/placeholder.svg`
3. **关于页**：`src/pages/about.astro` 里的贡献者 / 素材来源 / 声明
4. **默认分组**：`data/seed.sql`（问候 / 台词 / 叫声 / 往日 / 流行 / 民谣 / 摇滚）改成你自己的分区
5. **音频**：把 `public/audio/<分组>/` 下的文件换成真实音档

## 部署

| 平台 | 说明 |
|---|---|
| 任意静态托管 / nginx | `pnpm build` 后发布 `dist/`，见 [部署/部署指南.md](部署/部署指南.md) |
| GitHub Pages | 见 [docs/部署-Cloudflare-GitHubPages.md](docs/部署-Cloudflare-GitHubPages.md)；子路径部署需设 `SITE_BASE=/<仓库名>/` |
| Cloudflare Pages / Workers | 同上文档，配置见根目录 `wrangler.jsonc` |

> GitHub Actions 工作流默认**仅手动触发**（避免模板刚复制时就误发布）。启用 Pages 后，取消 `.github/workflows/deploy.yml` 里 `push:` 两行注释即可恢复自动部署。

## 许可

模板代码可自由使用与修改；示例图标与字体请自行确认授权后替换为自己拥有的资源。
