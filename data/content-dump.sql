-- ============================================================
--  内容快照（由 scripts/content-sync.mjs 自动生成，请勿手工编辑）
--  内容源是 data/content.db；本文件用于 git diff 审阅 / 备份。
--  恢复缺失数据库：pnpm content:migrate（已有数据库不会被覆盖）
-- ============================================================
PRAGMA foreign_keys = ON;
BEGIN;
DELETE FROM items; DELETE FROM stacks; DELETE FROM groups; DELETE FROM settings;
INSERT INTO groups (id, section, group_name, title, sort_order, is_secret) VALUES (1, 'voice', 'greeting', '问候', 1, 0);
INSERT INTO groups (id, section, group_name, title, sort_order, is_secret) VALUES (2, 'voice', 'lines', '台词', 2, 0);
INSERT INTO groups (id, section, group_name, title, sort_order, is_secret) VALUES (3, 'voice', 'noise', '叫声', 3, 0);
INSERT INTO groups (id, section, group_name, title, sort_order, is_secret) VALUES (4, 'voice', 'forgotten', '往日', 4, 1);
INSERT INTO groups (id, section, group_name, title, sort_order, is_secret) VALUES (5, 'song', 'song_pop', '流行', 1, 0);
INSERT INTO groups (id, section, group_name, title, sort_order, is_secret) VALUES (6, 'song', 'song_folk', '民谣', 2, 0);
INSERT INTO groups (id, section, group_name, title, sort_order, is_secret) VALUES (7, 'song', 'song_rock', '摇滚', 3, 0);
INSERT INTO settings (key, value) VALUES ('song_empty_hint', '还没有歌曲哦，把音频放进 public/audio/songs 就能听啦');
INSERT INTO settings (key, value) VALUES ('voice_empty_hint', '还没有音声哦，把音频放进 public/audio 对应分组目录就能用啦');
DELETE FROM item_audio;
DELETE FROM audio_cleanup;
DELETE FROM audio_retired;
DELETE FROM sqlite_sequence WHERE name IN ('groups', 'stacks', 'items');
INSERT INTO sqlite_sequence (name, seq) VALUES ('groups', 7);
COMMIT;
