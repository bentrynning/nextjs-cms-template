import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminIndexPage() {
  const session = await getSession();
  if (session) {
    redirect("/admin/posts");
  }
  redirect("/admin/login");
}
