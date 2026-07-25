import { Menu, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { BrandLogo } from "../brand/BrandLogo";

const navigationItems = [
  { href: "/#beranda", label: "Beranda", number: "01" },
  { href: "/#tentang", label: "Tentang", number: "02" },
  { href: "/#layanan", label: "Layanan", number: "03" },
  { href: "/#proses", label: "Proses", number: "04" },
] as const;

export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const dialog = dialogRef.current;

    if (!trigger || !dialog) {
      return;
    }

    const openMenu = () => {
      dialog.showModal();
    };

    const closeFromNavigation = (event: Event) => {
      const target = event.target;

      if (target instanceof Element && target.closest("[data-menu-close]")) {
        dialog.close();
      }
    };

    trigger.addEventListener("click", openMenu);
    dialog.addEventListener("click", closeFromNavigation);
    trigger.removeAttribute("disabled");

    return () => {
      trigger.removeEventListener("click", openMenu);
      dialog.removeEventListener("click", closeFromNavigation);
    };
  }, []);

  return (
    <>
      <button
        className="icon-button navbar__menu-button"
        type="button"
        aria-label="Buka menu navigasi"
        aria-haspopup="dialog"
        aria-controls="mobile-navigation-dialog"
        disabled
        ref={triggerRef}
      >
        <Menu aria-hidden="true" size={24} strokeWidth={1.6} />
      </button>

      <dialog
        className="mobile-menu__dialog"
        id="mobile-navigation-dialog"
        ref={dialogRef}
      >
        <div className="mobile-menu__content">
          <h2 className="sr-only">Navigasi utama</h2>
          <p className="sr-only">Pilih bagian halaman yang ingin dituju.</p>

          <div className="mobile-menu__topbar">
            <BrandLogo className="mobile-menu__brand" />
            <form method="dialog">
              <button
                className="icon-button"
                type="submit"
                aria-label="Tutup menu navigasi"
              >
                <X aria-hidden="true" size={24} strokeWidth={1.6} />
              </button>
            </form>
          </div>

          <nav aria-label="Navigasi mobile">
            <ol className="mobile-menu__list">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} data-menu-close>
                    <span>{item.number}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mobile-menu__footer">
            <p>Renovation &amp; Interior</p>
            <span>Studio konsep / 2026</span>
          </div>
        </div>
      </dialog>
    </>
  );
}
