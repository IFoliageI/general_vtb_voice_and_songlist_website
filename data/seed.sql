-- ============================================================
--  默认种子数据：分组骨架 + 空状态文案
--
--  由 scripts/seed-defaults.mjs 施加（幂等：已存在的行不会重复插入）。
--  刻意与 schema.sql 分开：测试用例用 schema.sql 建临时库结构，
--  若 schema.sql 自带种子会与 fixture 插入的分组撞唯一约束。
--
--  这些只是开箱示例，可以随意改名 / 增删：
--    首页（voice）：问候 / 台词 / 叫声 / 往日（隐藏分组）
--    歌单（song） ：流行 / 民谣 / 摇滚
-- ============================================================

INSERT OR IGNORE INTO groups (id, section, group_name, title, sort_order, is_secret) VALUES
  (1, 'voice', 'greeting',  '问候', 1, 0),
  (2, 'voice', 'lines',     '台词', 2, 0),
  (3, 'voice', 'noise',     '叫声', 3, 0),
  (4, 'voice', 'forgotten', '往日', 4, 1),
  (5, 'song',  'song_pop',  '流行', 1, 0),
  (6, 'song',  'song_folk', '民谣', 2, 0),
  (7, 'song',  'song_rock', '摇滚', 3, 0);

INSERT OR IGNORE INTO settings (key, value) VALUES
  ('voice_empty_hint', '还没有音声哦，把音频放进 public/audio 对应分组目录就能用啦'),
  ('song_empty_hint',  '还没有歌曲哦，把音频放进 public/audio/songs 就能听啦');
