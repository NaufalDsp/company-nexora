import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ConsultationDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isSimulated, setIsSimulated] = useState(false);

  useEffect(() => {
    const trigger = triggerRef.current;
    const dialog = dialogRef.current;

    if (!trigger || !dialog) {
      return;
    }

    const openDialog = () => {
      setIsSimulated(false);
      dialog.showModal();
    };

    trigger.addEventListener("click", openDialog);

    return () => {
      trigger.removeEventListener("click", openDialog);
    };
  }, []);

  return (
    <>
      <button
        className="navbar__cta"
        type="button"
        aria-haspopup="dialog"
        aria-controls="consultation-dialog"
        ref={triggerRef}
      >
        <MessageCircle aria-hidden="true" size={17} strokeWidth={1.7} />
        Mulai konsultasi
      </button>

      <dialog
        className="consultation-dialog"
        id="consultation-dialog"
        ref={dialogRef}
      >
        <div className="consultation-dialog__panel">
          <div className="consultation-dialog__header">
            <div>
              <span>WHATSAPP / PREVIEW</span>
              <h2>Konsultasi dengan Nexora Space</h2>
            </div>
            <form method="dialog">
              <button
                className="icon-button"
                type="submit"
                aria-label="Tutup pratinjau WhatsApp"
              >
                <X aria-hidden="true" size={22} strokeWidth={1.6} />
              </button>
            </form>
          </div>

          <div className="consultation-dialog__conversation">
            <p className="consultation-dialog__recipient">
              <MessageCircle aria-hidden="true" size={18} strokeWidth={1.6} />
              Nexora Space
              <span>Renovation &amp; Interior</span>
            </p>
            <div className="consultation-dialog__message">
              Halo Nexora Space, saya ingin berkonsultasi mengenai kebutuhan
              renovasi atau interior.
            </div>
          </div>

          <div className="consultation-dialog__footer">
            <p>
              Ini adalah simulasi. Tidak ada nomor yang dibuka dan tidak ada
              pesan yang dikirim.
            </p>
            {isSimulated ? (
              <p className="consultation-dialog__status" role="status">
                Pratinjau selesai. Tim Nexora Space siap menerima detail proyek
                Anda.
              </p>
            ) : (
              <button
                className="consultation-dialog__action"
                type="button"
                onClick={() => setIsSimulated(true)}
              >
                Buka WhatsApp
                <Send aria-hidden="true" size={17} strokeWidth={1.7} />
              </button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
