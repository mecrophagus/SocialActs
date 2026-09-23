export default function AdminFooter() {
  return (
    <footer className="border-t border-black/10 bg-brand-ivory px-6 py-8 md:px-10 lg:px-14">
      <div className="mx-auto grid max-w-6xl gap-8 text-center md:grid-cols-[1fr_auto] md:items-end md:gap-12 md:text-left">
        {/* Declaración institucional */}
        <div className="mx-auto max-w-2xl md:mx-0">
          <p className="font-functional text-[9px] uppercase tracking-[0.24em] text-brand-burgundy">
            Compromiso
          </p>

          <p className="mt-3 font-functional text-xs leading-5 text-text-muted-light">
            Lolitas rechaza y condena cualquier forma de trata de seres
            humanos, explotación, coacción o actividad realizada sin
            consentimiento.
          </p>
        </div>

        {/* Huella del desarrollador */}
        <div className="mx-auto md:mx-0 md:text-right">
          <p className="font-functional text-[10px] leading-5 text-text-muted-light">
            Desarrollado con{" "}
            <span
              aria-label="amor"
              className="text-brand-burgundy"
            >
              ♥
            </span>{" "}
            por{" "}
            <a
              href="https://github.com/mecrophagus"
              target="_blank"
              rel="noreferrer"
              className="border-b border-brand-burgundy/30 text-brand-burgundy transition-colors hover:border-brand-burgundy"
            >
              Jaime Alvarez
            </a>
          </p>

          <p className="mt-1 font-functional text-[9px] uppercase tracking-[0.16em] text-black/35">
            Diseño · Desarrollo web
          </p>
        </div>
      </div>
    </footer>
  );
}