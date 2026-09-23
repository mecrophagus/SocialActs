import { notFound } from "next/navigation";

import AdminFooter from "@/components/admin/AdminFooter";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /*
   * Seguridad provisional.
   *
   * Mientras no tengamos Supabase Auth + roles + RLS,
   * el panel de administración solo estará disponible
   * durante desarrollo.
   */
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="min-h-dvh bg-[#f4f1eb] text-brand-ink lg:grid lg:grid-cols-[250px_1fr]">
      <AdminSidebar />

      <div className="flex min-h-dvh min-w-0 flex-col">
        <main className="flex-1">
          {children}
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}