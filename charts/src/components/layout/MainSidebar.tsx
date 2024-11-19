"use client";

import { Home, LineChart, Settings, Activity, BarChart2, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/providers/SidebarProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/",
  },
  {
    title: "Market Analysis",
    icon: LineChart,
    items: [
      {
        title: "Altcoin Season",
        url: "/market/altcoin-season",
        icon: Activity,
      },
      {
        title: "Market Overview",
        url: "/market/overview",
        icon: BarChart2,
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
];

export function MainSidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "relative h-screen border-r bg-background transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="flex h-14 items-center border-b px-3 justify-between">
        {!isCollapsed && <span className="text-lg font-semibold">Charts</span>}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>
      <nav className="space-y-1 p-2">
        {menuItems.map((item) => (
          <div key={item.title}>
            {!item.items ? (
              <Link
                href={item.url}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === item.url
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground",
                  isCollapsed && "justify-center"
                )}
              >
                <item.icon className="h-4 w-4" />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            ) : (
              <div className="space-y-1">
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                    isCollapsed && "justify-center"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {!isCollapsed && <span>{item.title}</span>}
                </div>
                {!isCollapsed && (
                  <div className="pl-4 space-y-1">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.url}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                          pathname === subItem.url
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <subItem.icon className="h-4 w-4" />
                        <span>{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
} 