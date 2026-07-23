"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X, Rocket, User as UserIcon, LayoutDashboard, Bookmark, PlusCircle, LogOut, ShieldCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const userAvatar = user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg" : "bg-background/60 backdrop-blur-md"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="bg-gradient-to-tr from-primary to-secondary p-2 rounded-xl group-hover:scale-105 transition-transform shadow-md shadow-primary/20">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">ToolNest</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-1",
                  pathname === link.path ? "text-primary font-semibold" : "text-muted"
                )}
              >
                {link.name}
                {pathname === link.path && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Controls & User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl glass hover:bg-surface-hover transition-colors text-foreground border border-border"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5 text-warning" /> : <Moon className="h-5 w-5 text-primary" />}
            </button>
            
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2.5 glass p-1.5 pr-3 rounded-full hover:bg-surface-hover transition-all border border-border group"
                >
                  <div className="relative">
                    <img
                      src={userAvatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover border border-primary/40 shadow-sm"
                    />
                    {user.isPro && (
                      <span className="absolute -bottom-1 -right-1 bg-secondary text-white text-[9px] px-1 font-bold rounded-full border border-background">
                        PRO
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-foreground max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown className={cn("h-4 w-4 text-muted transition-transform duration-200", isUserDropdownOpen && "rotate-180")} />
                </button>

                {/* User Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 glass rounded-2xl shadow-2xl border border-border p-2 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3 py-2.5 border-b border-border mb-1">
                      <p className="text-sm font-bold text-foreground truncate">{user.name}</p>
                      <p className="text-xs text-muted truncate">{user.email}</p>
                      {user.role === 'admin' && (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold mt-1 border border-primary/20">
                          <ShieldCheck size={10} /> Admin
                        </span>
                      )}
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center space-x-2.5 px-3 py-2 text-sm font-medium rounded-xl hover:bg-surface-hover text-foreground transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4 text-primary" />
                      <span>Dashboard</span>
                    </Link>

                    <Link
                      href="/dashboard/add-tool"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center space-x-2.5 px-3 py-2 text-sm font-medium rounded-xl hover:bg-surface-hover text-foreground transition-colors"
                    >
                      <PlusCircle className="h-4 w-4 text-secondary" />
                      <span>Submit Tool</span>
                    </Link>

                    <Link
                      href="/dashboard/bookmarks"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center space-x-2.5 px-3 py-2 text-sm font-medium rounded-xl hover:bg-surface-hover text-foreground transition-colors"
                    >
                      <Bookmark className="h-4 w-4 text-warning" />
                      <span>Bookmarks</span>
                    </Link>

                    <div className="border-t border-border pt-1 mt-1">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserDropdownOpen(false);
                        }}
                        className="flex items-center space-x-2.5 px-3 py-2 text-sm font-medium rounded-xl text-error hover:bg-error/10 w-full text-left transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-border absolute top-16 left-0 right-0 p-4 flex flex-col space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "p-2 text-base font-medium rounded-xl hover:bg-surface-hover",
                pathname === link.path ? "text-primary bg-primary/10 font-bold" : "text-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-border my-2" />
          <div className="flex items-center justify-between p-2">
            <span className="font-medium text-foreground">Theme</span>
            <button onClick={toggleTheme} className="p-2 glass rounded-xl">
              {theme === "dark" ? <Sun className="h-5 w-5 text-warning" /> : <Moon className="h-5 w-5 text-primary" />}
            </button>
          </div>
          {user ? (
            <>
              <div className="flex items-center space-x-3 p-2 bg-surface rounded-xl border border-border">
                <img src={userAvatar} alt={user.name} className="h-10 w-10 rounded-full border border-primary" />
                <div>
                  <p className="font-bold text-sm text-foreground">{user.name}</p>
                  <p className="text-xs text-muted">{user.email}</p>
                </div>
              </div>
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full" variant="outline">Dashboard</Button>
              </Link>
              <Button onClick={() => { logout(); setIsMobileMenuOpen(false); }} variant="destructive" className="w-full">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full" variant="outline">Log in</Button>
              </Link>
              <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full">Sign up</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}