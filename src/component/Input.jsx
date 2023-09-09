import { useState } from 'react';

export default function Input({ func }) {
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');

  const submitSet = () => {
    func.handleSubmit(slug, name);
    setSlug('');
    setName('');
  };

  return (
    <section className="input cmn-py">
      <div className="input__wrapper">
        <form className="input__form input__form--side" onSubmit={submitSet()}>
          <div className="input__form-item">
            <label htmlFor="slug">Slug name</label>
            <input
              type="text"
              id="slug"
              placeholder="news"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <div className="input__form-item">
            <label htmlFor="name">Page name</label>
            <input
              type="text"
              id="name"
              placeholder="お知らせ"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="input__button"
            disabled={!(slug && name)}
          >
            Generate Link →
          </button>
        </form>
      </div>
    </section>
  );
}
