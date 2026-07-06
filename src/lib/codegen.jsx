export function makeCodeText(pages, cls, spanClass, wrapSpan, ariaCurrentEnabled) {
  const active = (cls.active || "").trim();
  const sc = (spanClass || "").trim();
  return pages
    .map((p) => {
      const activeCheck = `<?php if (get_meta('slug') == '${p.slug}') echo `;
      const link = active ? `${cls.link} ${activeCheck}'${active}'?>` : cls.link;
      const ariaCurrent = active && ariaCurrentEnabled ? ` ${activeCheck}'aria-current="page"'?>` : "";
      const spanOpen = sc ? `<span class="${sc}">` : "<span>";
      const inner = wrapSpan ? `${spanOpen}${p.name}</span>` : p.name;
      return `<li class="${cls.item}"><a class="${link}" href="${p.href}"${ariaCurrent}>${inner}</a></li>`;
    })
    .join("\n");
}

// Token colors are defined in CodeCard.css, keyed by these class names.
// Keyword list covers the PHP keywords this app actually emits (see makeCodeText above).
function tokenize(text) {
  const out = [];
  const re = /("[^"]*")|\b(if|echo)\b/g;
  let last = 0;
  let m;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [token, tokenClass] = m[1]
      ? [m[1], "code-card__token--string"]
      : [m[2], "code-card__token--keyword"];
    out.push(
      <span key={k++} className={`code-card__token ${tokenClass}`}>
        {token}
      </span>
    );
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function CodeHighlight({ code }) {
  const lines = code.split("\n").map((line, i) => <div key={i}>{tokenize(line)}</div>);
  return <div>{lines}</div>;
}
