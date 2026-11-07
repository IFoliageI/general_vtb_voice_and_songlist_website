export const site = {
  // 浏览器标题与 SEO 站点名；顶栏使用短标题 brandTitle
  title: 'VTuber 音声与歌单',
  brandTitle: '音声板',
  logoImage: '/icons/index.ico',
  // SEO 描述
  description: '整理 VTuber 音声与歌单的静态站点模板',
  keywords: 'VTuber, VoiceButton, 音声板',
  // 社交分享封面图（预留，可换）
  socialImage: '',
  themeColor: '#E9DACD',

  footer: {
    content: '本模板可替换成你自己的音声与歌单',
  },
};

// 侧边栏品牌 / 推广链接（图标与站点 favicon 分开，使用独立的外链图标）
export interface Links {
  title: string;
  url: string;
  icon: string; // 图标：图片地址（侧边栏外链专用，如 /icons/external-link.svg）
}

// 通用示例外链：替换成你自己的主页 / 直播间即可
export const sideLinks: Links[] = [
  { title: 'Bilibili 主页', url: 'https://space.bilibili.com/', icon: '/icons/external-link.ico' },
  { title: '直播间', url: 'https://live.bilibili.com/', icon: '/icons/external-link.ico' },
];

// 侧边栏「友链」——格式和上面 sideLinks 完全一样：
//   加一行 = 多一个友链；删一行 = 少一个友链；全删光（保持 []）= 侧边栏自动隐藏「友链」这一栏。
// 下面留了一行注释好的例子，去掉行首的 // 并改成你自己的即可生效。
export const friendLinks: Links[] = [
  { title: '友站示例', url: 'https://example.com', icon: '/icons/external-link.ico' },
];

// ============================================================
// 页面装饰 GIF（通用功能；默认关闭）
// ============================================================
// 用途：在任意页面的自定义位置摆一张 GIF（或 png / webp / 静态图都行），
//       比如 index 页右下角放一只猫、about 页左上角放一个小图标。
// 开关：pageGifs 保持空数组 [] = 什么都不显示，和没加这个功能时完全一样。
// 生效：图片由 src/components/PageGif.astro 统一渲染，已在 BaseLayout 中引入一次，
//       不需要去改各个页面文件。
//
// 怎么用（把下面注释里的示例去掉行首 // 即可；图片放到 public/gifs/ 下）：
//   1. 本地图片：src 写 '/gifs/neko.gif'（public 目录下的路径，会自动补部署基路径）。
//   2. 外链图片：src 直接写完整地址，如 'https://example.com/neko.gif'（原样使用）。
//   3. 只想在首页显示：pages: ['index']；省略 pages 就是所有页面都显示。
//   4. 摆位置：常用 right + bottom（右下角）或 left + top（左上角），如
//      right: '24px', bottom: '88px'。单位要自己写在字符串里（px / rem / % 都可以）。
//   5. 加链接：link: 'https://...' 会在新窗口打开；站内路径写 '/request/'，
//      会自动补部署基路径。
//   6. 手机端默认隐藏；系统开了「减少动态效果」也默认隐藏。
//
// pageGifs 里每个对象就是一张图：加几条显示几张，删光（保持 []）就什么都不显示。
// 下面留一行注释状态的示例，不要真的加进去（默认必须保持空数组）。
//
// export const pageGifs: PageGif[] = [
//   { src: '/gifs/neko.gif', pages: ['index'], right: '24px', bottom: '88px', width: '120px' },
// ];

/** 页面标识：与 src/pages 下的页面一一对应 */
export type PageName = 'index' | 'request' | 'about' | '404';

/** 一张可放在页面任意位置的 GIF（或任何图片） */
export interface PageGif {
  /** 必填。本地路径（如 '/gifs/neko.gif'，会自动拼部署基路径）或完整 http(s) 直链 */
  src: string;
  /** 显示在哪几页；省略 = 所有页面（空数组 [] 表示哪一页都不显示） */
  pages?: PageName[];
  /** 定位（用一组即可，如 right + bottom）；值要带单位，如 '24px' / '2rem' / '10%' */
  left?: string;
  /** 见 left：距页面顶部的距离 */
  top?: string;
  /** 见 left：距页面右侧的距离 */
  right?: string;
  /** 见 left：距页面底部的距离 */
  bottom?: string;
  /** 宽度，默认 '140px'；高度按原图比例自动计算，值要带单位 */
  width?: string;
  /** 不透明度 0–1，默认 1；0 表示完全透明（仍然存在，只是看不见） */
  opacity?: number;
  /** 层级 z-index；不填就不写，按文档顺序层叠（低于抽屉 60/70、菜单 80、Toast 90） */
  zIndex?: number;
  /** 可选：点击后跳转（支持外部链接；站内以 / 开头会自动补部署基路径） */
  link?: string;
  /** 无障碍文本，默认 'GIF'；纯装饰图可以填 '' */
  alt?: string;
  /** 窄屏（≤ 720px）是否隐藏，默认 true */
  hideOnMobile?: boolean;
  /** 系统开启「减少动态效果」时是否隐藏，默认 true */
  respectReducedMotion?: boolean;
}

/**
 * 页面装饰图配置。
 * 默认空数组 = 什么都不显示，行为与未加此功能时完全一致。
 * 示例（保持注释状态，不要真加进去）：
 *   { src: '/gifs/neko.gif', pages: ['index'], right: '24px', bottom: '88px', width: '120px' },
 */
export const pageGifs: PageGif[] = [
  // { src: '/gifs/neko.gif', pages: ['index'], right: '24px', bottom: '88px', width: '120px' },
];
