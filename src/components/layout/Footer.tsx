import { ArrowUp } from "lucide-react";

import { BrandLogo } from "../brand/BrandLogo";
import { Container } from "../common/Container";

export function Footer() {
  return (
    <footer className="footer" id="kontak">
      <Container>
        <div className="footer__lead">
          <div>
            <p className="eyebrow">NEXORA SPACE / RENOVATION &amp; INTERIOR</p>
            <h2>Ruang yang dibangun dari kebutuhan nyata.</h2>
          </div>
          <a className="footer__back-to-top" href="/#beranda">
            <ArrowUp aria-hidden="true" size={20} />
            Kembali ke atas
          </a>
        </div>

        <div className="footer__bottom">
          <BrandLogo className="footer__brand" />
          <p>
            Mitra renovasi dan interior untuk hunian, ruang kerja, dan ruang
            komersial yang dirancang secara terukur.
          </p>
          <span>© 2026 NEXORA SPACE</span>
        </div>
      </Container>
    </footer>
  );
}
