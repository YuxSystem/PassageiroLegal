import { usePage } from "@inertiajs/react";
import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout";

import { useLocale } from "@/hooks/useLocale";

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  // Initialize locale sync
  useLocale();
  const user = usePage().props.auth.user;

  if (user?.role === "Admin") {
    return (
      <AdminLayout>
        <main>
          {children}
        </main>
      </AdminLayout>

    )
  }

  if (user?.role === "User") {
    return (
      <UserLayout>
        <main>
          {children}
        </main>
      </UserLayout>
    )
  }

  return (
    <main>
      {children}
    </main>
  )
}
