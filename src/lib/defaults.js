export const SECTIONS = ["Header", "Drawer", "Footer", "Sitemap"];

export const DEFAULT_PAGES = [
  { name: "トップページ", slug: "top", href: "/" },
  { name: "お知らせ", slug: "news", href: "/news/" },
  { name: "お問い合わせ", slug: "contact", href: "/contact/" },
  { name: "プライバシーポリシー", slug: "privacy", href: "/privacy/" },
  { name: "サイトマップ", slug: "site", href: "/site/" },
];

/**
 * Standard `item`/`link`/`active` class-name trio for one section.
 *
 * @param {string} title - One of `SECTIONS` ("Header", "Drawer", "Footer", "Sitemap").
 * @returns {{item: string, link: string, active: string}}
 */
export function defaultClasses(title) {
  const base = { Header: "header", Drawer: "drawer", Footer: "footer", Sitemap: "sitemap" }[title];
  return {
    item: `${base}__item`,
    link: `${base}__link`,
    active: `${base}__link--active`,
  };
}
