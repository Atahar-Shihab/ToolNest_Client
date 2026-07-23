"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Settings, 
  Bookmark, 
  MessageSquare,
  Users,
  Database,
  BarChart
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  const userLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Tools", path: "/dashboard/my-tools", icon: Database },
    { name: "Add Tool", path: "/dashboard/add-tool", icon: PlusCircle },
    { name: "Bookmarks", path: "/dashboard/bookmarks", icon: Bookmark },
    { name: "My Reviews", path: "/dashboard/my-reviews", icon: MessageSquare },
    { name: "Profile", path: "/dashboard/profile", icon: Settings },
  ];

  const adminLinks = [
    { name: "Manage Users", path: "/dashboard/admin/users", icon: Users },
    { name: "All Tools", path: "/dashboard/admin/all-tools", icon: Database },
    { name: "Manage Reviews", path: "/dashboard/admin/reviews", icon: MessageSquare },
    { name: "Analytics", path: "/dashboard/admin/analytics", icon: BarChart },
  ];

  return (
    <aside className="w-64 glass h-[calc(100vh-4rem)] sticky top-16 hidden lg:block overflow-y-auto">
      <div className="p-6 space-y-8">
        <div>
          <h3 className="text-xs uppercase text-muted font-semibold tracking-wider mb-4">
            Menu
          </h3>
          <nav className="space-y-1">
            {userLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted hover:text-foreground hover:bg-surface-hover"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {user?.role === "admin" && (
          <div>
            <h3 className="text-xs uppercase text-muted font-semibold tracking-wider mb-4">
              Admin
            </h3>
            <nav className="space-y-1">
              {adminLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-secondary/10 text-secondary" 
                        : "text-muted hover:text-foreground hover:bg-surface-hover"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </aside>
  );
}