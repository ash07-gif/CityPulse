"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Bell, User, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import issuesData from "@/lib/mock-data";

// Assume current user for notifications
const currentUserReporter = 'Rajesh Kumar';

export function Header() {
  const { setTheme, theme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    router.push('/');
  }

  // Filter issues reported by the current user and generate notifications from their timeline
  const notifications = issuesData
    .filter(issue => issue.reporter === currentUserReporter)
    .flatMap(issue => 
      issue.timeline
        .filter(event => event.status !== 'Open') // We only notify on status changes
        .map(event => ({
          id: `${issue.id}-${event.date}`,
          issueId: issue.id,
          title: issue.title,
          status: event.status,
          date: event.date
        }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
        <SidebarTrigger className="hidden md:flex" />

        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{notifications.length}</span>
                    )}
                    <span className="sr-only">Toggle notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <Link href={`/dashboard/issues/${notification.issueId}`} passHref key={notification.id}>
                      <DropdownMenuItem className="flex flex-col items-start whitespace-normal">
                          <div>Your issue <span className="font-semibold">"{notification.title}"</span> has been updated to <span className="font-semibold">{notification.status}</span>.</div>
                          <div className="text-xs text-muted-foreground mt-1">{notification.date}</div>
                      </DropdownMenuItem>
                    </Link>
                  ))
                ) : (
                  <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <Link href="/dashboard/profile" passHref><DropdownMenuItem>Profile</DropdownMenuItem></Link>
                    <Link href="/dashboard/settings" passHref><DropdownMenuItem>Settings</DropdownMenuItem></Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
  )
}
