import './AddPageForm.css'

/**
 * Name + slug inputs for adding a new page. Shows inline hints for two
 * validation states the parent computes: a duplicate slug, and a slug that
 * had spaces/underscores auto-converted to hyphens (with a link explaining
 * why hyphens are preferred for URLs).
 */
export default function AddPageForm({
  nameField,
  slugField,
  onName,
  onSlug,
  onAdd,
  canAdd,
  duplicateSlug,
  slugHadSpace,
}) {
  return (
    <form
      className="add-page-form"
      onSubmit={(e) => {
        e.preventDefault()
        if (canAdd) onAdd()
      }}
    >
      <div className="add-page-form__fields">
        <input
          className="add-page-form__input"
          value={nameField}
          onChange={onName}
          placeholder="ページ名"
          aria-label="ページ名"
        />
        <input
          className="add-page-form__input add-page-form__input--mono"
          value={slugField}
          onChange={onSlug}
          placeholder="スラッグ（例: company）"
          aria-label="スラッグ（例: company）"
        />
        {slugHadSpace && (
          <span className="add-page-form__hint">
            スペースやアンダースコア（_）は「-」に変換されました。URLには「-」の使用が推奨されています（
            <a
              href="https://developers.google.com/search/docs/crawling-indexing/url-structure?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google
            </a>
            ）
          </span>
        )}
        {duplicateSlug && (
          <span className="add-page-form__warning">
            このURLは既に使用されています
          </span>
        )}
      </div>
      <button
        className="add-page-form__submit"
        type="submit"
        disabled={!canAdd}
      >
        ページを追加
      </button>
    </form>
  )
}
