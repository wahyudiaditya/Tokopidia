import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const token = cookieStore.get("access_token");
  if (!token) return redirect("/login");

  return children;
}
