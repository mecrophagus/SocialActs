import AuthView from "@/components/auth/AuthView";
export const metadata = {
  title: "Acceso",
  robots: { index: false, follow: false },
};
export default function AccessPage() {
  return <AuthView />;
}
