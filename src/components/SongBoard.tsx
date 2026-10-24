import { createSignal, createMemo } from 'solid-js';
import { SoundBoard } from './SoundBoard';
import { songGroups, groupSongsByArtist, SONG_EMPTY_HINT } from '../data/songs';

type GroupMode = 'type' | 'artist';

// 「歌单」页面：在共用的音效板之上，加一个右上角的「展示方式」切换开关。
//   歌曲类型 = 用 songs.ts 里分好的分组（翻唱 / 原创 …）
//   原唱作者 = 把所有歌按 artist 字段重新分组
export function SongBoard() {
  const [mode, setMode] = createSignal<GroupMode>('type');
  const groups = createMemo(() => (mode() === 'artist' ? groupSongsByArtist(songGroups) : songGroups));

  return (
    <>
      <div class="page-head">
        <div>
          <div class="page-title">歌单</div>
          <div class="page-sub">想听哪首就点哪首</div>
        </div>
        <div class="mode-switch" role="group" aria-label="展示方式">
          <button
            type="button"
            classList={{ active: mode() === 'type' }}
            aria-pressed={mode() === 'type'}
            onClick={() => setMode('type')}
          >歌曲类型</button>
          <button
            type="button"
            classList={{ active: mode() === 'artist' }}
            aria-pressed={mode() === 'artist'}
            onClick={() => setMode('artist')}
          >原唱作者</button>
        </div>
      </div>

      <SoundBoard
        groups={groups()}
        enableSecret={false}
        showSongCut={true}
        searchPlaceholder="搜索歌曲…"
        noResultWord="歌曲"
        emptyGroupText="（本组暂无歌曲，把音频放进 public/audio/songs 即可）"
        noAudioText="这首还没有音频文件"
        emptyHint={SONG_EMPTY_HINT}
      />
    </>
  );
}

export default SongBoard;
