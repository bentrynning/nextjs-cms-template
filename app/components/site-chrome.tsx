"use client";

import { usePathname } from "next/navigation";
import Nav from "./nav";
import Footer from "./footer";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
