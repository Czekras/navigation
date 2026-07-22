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
