export const SECTIONS = ["Header", "Drawer", "Footer", "Sitemap"];

export const DEFAULT_PAGES = [
  { name: "トップページ", slug: "top", href: "/" },
  { name: "お知らせ", slug: "news", href: "/news/" },
  { name: "お問い合わせ", slug: "contact", href: "/contact/" },
  { name: "プライバシーポリシー", slug: "privacy", href: "/privacy/" },
  { name: "サイトマップ", slug: "site", href: "/site/" },
];

export function defaultClasses(title) {
  const base = { Header: "header", Drawer: "drawer", Footer: "footer", Sitemap: "sitemap" }[title];
  return {
    item: `${base}__item`,
    link: `${base}__link`,
    active: `${base}__link--active`,
  };
}
