import { usePage } from "@inertiajs/react";
import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout";

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
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
