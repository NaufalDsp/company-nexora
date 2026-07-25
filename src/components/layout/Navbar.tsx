import { motion, useScroll, useTransform } from "motion/react";

import { BrandLogo } from "../brand/BrandLogo";
import { Container } from "../common/Container";
import { MobileMenu } from "./MobileMenu";
import { navigationItems } from "./navigation-items";

export function Navbar() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 96],
    ["rgba(17, 18, 16, 0)", "rgba(17, 18, 16, 0.94)"],
  );

  return (
    <motion.header className="navbar" style={{ backgroundColor }}>
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
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="navbar__cta" href="/#konsultasi">
          Mulai konsultasi
        </a>

        <MobileMenu />
      </Container>
    </motion.header>
  );
}
