"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  Menu,
  type LucideIcon
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/user-profile";
import React from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "#", label: "Videos", icon: Video },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <MobileSidebar />
          <div className="w-full flex-1">
            {/* Can add a search bar here later */}
          </div>
          <UserProfile />
        </header>
        <main className="flex-1 overflow-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}

function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-card md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6 text-primary"><rect width="256" height="256" fill="none"></rect><path d="M240,128a15.8,15.8,0,0,1-7.1,13.3l-104,60.6a16,16,0,0,1-16.2,0L9.1,141.3A15.9,15.9,0,0,1,1.9,128h0A15.9,15.9,0,0,1,9.1,114.7l103.8-60.5a16,16,0,0,1,16.2,0l104,60.6A15.8,15.8,0,0,1,240,128Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M16,134.4,112,189.3a15.9,15.9,0,0,0,16.2,0l96-55.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M123.5,223.1,112,228.9a16.2,16.2,0,0,1-16.2,0L24.3,189.4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
            <span className="font-headline">Creator Hub</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <NavItem key={item.label} item={item} pathname={pathname} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

function MobileSidebar() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col bg-card">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold mb-4 text-foreground"
          >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6 text-primary"><rect width="256" height="256" fill="none"></rect><path d="M240,128a15.8,15.8,0,0,1-7.1,13.3l-104,60.6a16,16,0,0,1-16.2,0L9.1,141.3A15.9,15.9,0,0,1,1.9,128h0A15.9,15.9,0,0,1,9.1,114.7l103.8-60.5a16,16,0,0,1,16.2,0l104,60.6A15.8,15.8,0,0,1,240,128Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M16,134.4,112,189.3a15.9,15.9,0,0,0,16.2,0l96-55.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M123.5,223.1,112,228.9a16.2,16.2,0,0,1-16.2,0L24.3,189.4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
            <span className="font-headline">Creator Hub</span>
          </Link>
          {navItems.map((item) => (
              <NavItem key={item.label} item={item} pathname={pathname} isMobile />
            ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

type NavItemProps = {
  item: { href: string; label: string; icon: LucideIcon };
  pathname: string;
  isMobile?: boolean;
};

function NavItem({ item, pathname, isMobile = false }: NavItemProps) {
  const { href, label, icon: Icon } = item;
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        isActive && "bg-muted text-primary",
        isMobile && "text-lg"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
