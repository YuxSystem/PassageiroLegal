import { usePage } from "@inertiajs/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout";

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }) {
  const queryClient = new QueryClient()
  const user = usePage().props.auth.user;

  if (user?.role === "Admin") {
    return (
      <QueryClientProvider client={queryClient}>
        <AdminLayout>
          <main>
            {children}
          </main>
        </AdminLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

    )
  }

  if (user?.role === "User") {
    return (
      <QueryClientProvider client={queryClient}>
        <UserLayout>
          <main>
            {children}
          </main>
        </UserLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        {children}
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
