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
