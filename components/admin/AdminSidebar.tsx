import Image from "next/image";
import Link from "next/link";

const adminNavigation = [
  {
    label: "Resumen",
    href: "/admin",
  },
  {
    label: "Perfiles",
    href: "/admin/perfiles",
  },
];

export default function AdminSidebar() {
  return (
<aside className="border-b border-black/10 bg-brand-ivory lg:min-h-dvh lg:border-b-0 lg:border-r">
  <div className="flex h-full flex-col items-center px-6 py-6 text-center lg:items-stretch lg:px-8 lg:py-8 lg:text-left">
    <Link
      href="/"
      aria-label="Lolitas — Ir a la web pública"
      className="inline-flex w-fit"
    >
      <Image
        src="/brand/lolitas-logo-header.svg"
        alt="Lolitas"
        width={190}
        height={70}
        priority
        className="h-auto w-32"
      />
    </Link>

    <p className="mt-3 font-functional text-[9px] uppercase tracking-[0.28em] text-text-muted-light">
      Administración
    </p>

    <nav
      aria-label="Administración"
      className="mt-8 flex flex-wrap justify-center gap-6 lg:mt-16 lg:flex-col lg:items-stretch lg:justify-start lg:gap-2"
    >
      {adminNavigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="border-b border-transparent py-2 font-functional text-sm text-text-muted-light transition-colors hover:border-brand-burgundy hover:text-brand-burgundy lg:border-b-0 lg:border-l lg:border-transparent lg:pl-4"
        >
          {item.label}
        </Link>
      ))}
    </nav>

    <div className="mt-8 w-full max-w-xs border-t border-black/10 pt-6 lg:mt-auto lg:max-w-none">
      <p className="font-functional text-[10px] uppercase tracking-[0.18em] text-text-muted-light">
        Portal interno
      </p>

      <p className="mt-2 font-functional text-xs leading-5 text-text-muted-light">
        Gestión y administración de Lolitas.
      </p>
    </div>
  </div>
</aside>
  );
}