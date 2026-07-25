import { BrandLogo } from "../brand/BrandLogo";
import { Container } from "../common/Container";
import { MobileMenu } from "./MobileMenu";

const navigationItems = [
  { href: "/#beranda", label: "Beranda" },
  { href: "/#layanan", label: "Layanan" },
  { href: "/portfolio", label: "Portofolio" },
  { href: "/#proses", label: "Proses" },
] as const;

export function Navbar() {
  return (
    <header className="navbar">
      <Container className="navbar__inner">
        <a
          aria-label="Nexora Space — kembali ke beranda"
          className="navbar__brand-link"
          href="/#beranda"
        >
          <BrandLogo className="navbar__brand" />
        </a>

        <nav className="navbar__desktop-nav" aria-label="Navigasi utama">
          <ul>
            {navigationItems.map((item, index) => (
              <li key={item.href}>
                <a href={item.href}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="navbar__cta" href="/#konsultasi">
          Mulai konsultasi
        </a>

        <MobileMenu />
      </Container>
    </header>
  );
}
