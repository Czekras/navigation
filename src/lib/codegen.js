/**
 * Builds the `<li><a>` markup for one section from the current pages and
 * class-name settings.
 *
 * @param {Array<{name: string, slug: string, href: string}>} pages
 * @param {{item: string, link: string, active: string}} cls - Class names for `<li>`, `<a>`, and the active-page `<a>` variant.
 * @param {string} spanClass - Optional class for the `<span>` wrapper, when `wrapSpan` is on.
 * @param {boolean} wrapSpan - Whether to wrap each link's text in a `<span>`.
 * @param {boolean} ariaCurrentEnabled - Whether to emit `aria-current="page"` on the active link.
 * @returns {string}
 */
export function makeCodeText(
  pages,
  cls,
  spanClass,
  wrapSpan,
  ariaCurrentEnabled,
) {
  const active = (cls.active || '').trim()
  const sc = (spanClass || '').trim()
  return pages
    .map((p) => {
      const activeCheck = `<?php if (get_meta('slug') == '${p.slug}') echo `
      const link = active ? `${cls.link} ${activeCheck}'${active}'?>` : cls.link
      const ariaCurrent = ariaCurrentEnabled
        ? ` ${activeCheck}'aria-current="page"'?>`
        : ''
      const spanOpen = sc ? `<span class="${sc}">` : '<span>'
      const inner = wrapSpan ? `${spanOpen}${p.name}</span>` : p.name
      return `<li class="${cls.item}"><a class="${link}" href="${p.href}"${ariaCurrent}>${inner}</a></li>`
    })
    .join('\n')
}
