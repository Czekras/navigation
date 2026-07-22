import './Footer.css'

/** Border spans full width; the credit line is centered at the shared max-width. */
export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <span className="app-footer__credit">Created by JC TINIO</span>
      </div>
    </footer>
  )
}
