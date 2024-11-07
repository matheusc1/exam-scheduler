import { Header } from "@/components/header/header";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="max-w-app mx-auto antialiased px-2 sm:px-0">
      <Header />

      <Outlet />
    </div>
  )
}
