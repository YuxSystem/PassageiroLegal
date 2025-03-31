import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { PlaneTakeoff, FileText, PlusCircle, User } from 'lucide-react';

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const isSidebarOpen = true;
  const { user } = usePage().props.auth;

  const menuItems = [
    {
      title: 'Nova Solicitação',
      icon: <PlusCircle className="w-5 h-5" />,
      href: '/nova-solicitacao',
    },
    {
      title: 'Minhas Solicitações',
      icon: <FileText className="w-5 h-5" />,
      href: '/solicitacoes',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* AppBar - Mobile Only */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-white md:hidden">
        <div className="flex h-full items-center px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <ScrollArea className="h-full py-6">
                <div className="px-4 flex items-center space-x-2 font-medium text-xl">
                  <PlaneTakeoff className="h-6 w-6 text-sky-600" />
                  <span className="font-semibold">Passageiro Legal</span>
                </div>
                <nav className="mt-6">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#0284C7]/10 hover:text-[#0284C7]"
                    >
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </Link>
                  ))}
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <div className="flex-1">
            <div className="flex items-center space-x-2 font-medium text-xl">
              <PlaneTakeoff className="h-6 w-6 text-sky-600" />
              <span className="font-semibold">Passageiro Legal</span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.profile_photo_url} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-gray-500">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => router.post('/logout')}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Sidebar - Desktop Only */}
      <div
        className={cn(
          'fixed top-0 bottom-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out hidden md:block',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2 font-medium text-xl">
              <PlaneTakeoff className="h-6 w-6 text-sky-600" />
              <span className="font-semibold">Passageiro Legal</span>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1">
            <nav className="p-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-[#0284C7]/10 hover:text-[#0284C7] transition-colors mb-2"
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              ))}
            </nav>
          </ScrollArea>

          {/* User Profile */}
          <div className="p-4 border-t">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={user.profile_photo_url} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-gray-500">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => router.post('/logout')}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn('transition-all duration-200', isSidebarOpen ? 'md:ml-64' : 'md:ml-0')}>
        <main className="p-6 pt-16 md:pt-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
