import AuthView from "@/components/auth/AuthView";
export const metadata = {
  title: "Registro",
  robots: { index: false, follow: false },
};
export default function RegisterPage() {
  return <AuthView register />;
}
