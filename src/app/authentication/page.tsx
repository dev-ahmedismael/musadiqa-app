import { redirect } from "next/navigation";

export default function AuthenticationPage() {
  redirect("/authentication/login");
  return <></>;
}
