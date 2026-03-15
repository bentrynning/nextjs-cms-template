import { getSession } from "@/lib/auth";
import { contentTypes } from "@/lib/content-types";
import { redirect } from "next/navigation";

export default async function AdminIndexPage() {
  const session = await getSession();
  if (session) {
    // Redirect to the first registered content type
    redirect(`/admin/collections/${contentTypes[0].name}`);
  }
  redirect("/admin/login");
}
