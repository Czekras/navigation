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

/**
 * Token colors are defined in CodeCard.css, keyed by these class names.
 * Keyword list covers the PHP keywords this app actually emits (see makeCodeText above).
 *
 * @param {string} text - One line of generated code.
 * @returns {Array<string|JSX.Element>} Mixed plain-text and highlighted-span pieces, in order.
 */
function tokenize(text) {
  const out = []
  const re = /("[^"]*")|\b(if|echo)\b/g
  let last = 0
  let m
  let k = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const [token, tokenClass] = m[1]
      ? [m[1], 'code-card__token--string']
      : [m[2], 'code-card__token--keyword']
    out.push(
      <span key={k++} className={`code-card__token ${tokenClass}`}>
        {token}
      </span>,
    )
    last = re.lastIndex
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

/** Renders `code` as one `<div>` per line, with basic PHP token highlighting from `tokenize`. */
export function CodeHighlight({ code }) {
  const lines = code
    .split('\n')
    .map((line, i) => <div key={i}>{tokenize(line)}</div>)
  return <div>{lines}</div>
}
