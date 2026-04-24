import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
} from '@/components/ui/sidebar';
import { MainNav } from '@/components/main-nav';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

const SpiceGuardLogo = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-7"
    >
      <path d="M13.414,3.414c-1.334-1.333-3.49-1.333-4.824,0L4,8V4H2v6h6V8H5.414l2.5-2.5a1,1,0,0,1,1.414,0L12,8.189,14.085,6.1a3.003,3.003,0,0,1,4.243,4.242L12,16.686,5.657,10.343a5.003,5.003,0,0,0-7.07,7.07L12,24l8.414-8.414a5.003,5.003,0,0,0,0-7.07L18,6.086l-2.086,2.085-2.5-2.5Z"/>
    </svg>
  );

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-headline text-2xl font-semibold text-primary"
          >
            <SpiceGuardLogo />
            <span>SpiceGuard</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="font-headline text-xl font-semibold text-foreground">
              Adulteration Detection Platform
            </h1>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/firebase/studio-extra-samples" target="_blank" rel="noopener noreferrer">
              <Github />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
