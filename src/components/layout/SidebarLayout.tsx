'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppLogoIcon } from './AppLogoIcon';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  Home,
  Sparkles,
  Wallet,
  ShieldCheck,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const saved = localStorage.getItem('messtrack_sidebar_collapsed');
    if (saved !== null) {
      setIsCollapsed(saved === 'true');
    }
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('messtrack_sidebar_collapsed', String(next));
      return next;
    });
  };

  const navItems = [
    { label: 'Overview', href: '/', icon: Home },
    { label: 'Jadwal Piket', href: '/piket', icon: Sparkles },
    { label: 'Kas & Keuangan', href: '/keuangan', icon: Wallet },
  ];

  const adminItem = { label: 'Admin Portal', href: '/dashboard', icon: ShieldCheck };

  const isNavActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#f1f3f7] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 p-2 sm:p-4 lg:p-6 transition-colors duration-250">
      {/* SaaS App Shell Container with Soft Rounded Corners */}
      <div className="min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-2rem)] lg:min-h-[calc(100vh-3rem)] rounded-[2rem] sm:rounded-[2.5rem] bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col md:flex-row overflow-hidden transition-all duration-300">
        
        {/* ===================================================================== */}
        {/* MOBILE TOP HEADER (< 768px) */}
        {/* ===================================================================== */}
        <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-5 py-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 -ml-1 rounded-2xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer active:scale-95"
              aria-label="Buka menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" aria-label="Home" className="flex items-center gap-2">
              <AppLogoIcon size={34} />
              <span className="font-extrabold text-sm tracking-tight text-zinc-950 dark:text-white">
                Mess<span className="text-zinc-500 dark:text-zinc-400">Track</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </header>

        {/* ===================================================================== */}
        {/* MOBILE DRAWER OVERLAY (< 768px) */}
        {/* ===================================================================== */}
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            />
            <div className="relative w-72 max-w-[80vw] h-full bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-250">
              <div>
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-zinc-100 dark:border-zinc-800">
                  <Link href="/" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2.5">
                    <AppLogoIcon size={34} />
                    <span className="font-extrabold text-sm tracking-tight text-zinc-950 dark:text-white">
                      Mess<span className="text-violet-900 dark:text-violet-400">Track</span>
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 rounded-2xl text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isNavActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition active:scale-95 ${
                          active
                            ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                            : 'text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-5 border-t border-zinc-100 dark:border-zinc-800">
                <Link
                  href={adminItem.href}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition active:scale-95 ${
                    isNavActive(adminItem.href)
                      ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 shrink-0 text-violet-800 dark:text-violet-400" />
                  <span>{adminItem.label}</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* DESKTOP SAAS SIDEBAR (>= 768px) */}
        {/* ===================================================================== */}
        <aside
          className={`hidden md:flex flex-col justify-between shrink-0 border-r border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/50 transition-all duration-300 ease-in-out ${
            isCollapsed ? 'w-[4.75rem] p-3' : 'w-64 p-5'
          }`}
        >
          {/* Top: Brand Header & Nav Links */}
          <div className="space-y-6">
            {/* Top Bar inside Sidebar: Text Only & Toggle Button */}
            <div
              className={`flex items-center ${
                isCollapsed ? 'flex-col gap-3 justify-center' : 'justify-between px-1'
              }`}
            >
              {!isCollapsed && (
                <Link href="/" aria-label="Home" className="focus:outline-none">
                  <span className="font-extrabold text-base tracking-tight text-zinc-950 dark:text-white">
                    Mess<span className="text-violet-900 dark:text-violet-400">Track</span>
                  </span>
                </Link>
              )}

              <button
                onClick={toggleCollapse}
                aria-label={isCollapsed ? 'Perlebar Menu' : 'Perkecil Menu'}
                title={isCollapsed ? 'Perlebar Menu' : 'Perkecil Menu'}
                className="p-2 rounded-2xl text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200/80 dark:hover:border-zinc-700 transition cursor-pointer active:scale-90"
              >
                {isCollapsed ? (
                  <PanelLeftOpen className="w-4 h-4 text-violet-900 dark:text-violet-400" />
                ) : (
                  <PanelLeftClose className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Navigation Menu List */}
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isNavActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={isCollapsed ? item.label : undefined}
                    className={`group relative flex items-center rounded-2xl font-bold text-xs transition-all active:scale-95 ${
                      isCollapsed
                        ? 'justify-center h-11 w-11 mx-auto'
                        : 'gap-3 px-3.5 py-3'
                    } ${
                      active
                        ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}

                    {isCollapsed && (
                      <span className="pointer-events-none absolute left-full ml-3 px-2.5 py-1.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[11px] font-bold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition duration-150 whitespace-nowrap shadow-xl z-50">
                        {item.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Admin Portal Link */}
          <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
            <Link
              href={adminItem.href}
              title={isCollapsed ? adminItem.label : undefined}
              className={`group relative flex items-center rounded-2xl font-bold text-xs transition-all active:scale-95 ${
                isCollapsed
                  ? 'justify-center h-11 w-11 mx-auto'
                  : 'gap-3 px-3.5 py-3'
              } ${
                isNavActive(adminItem.href)
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0 text-violet-800 dark:text-violet-400 transition-transform group-hover:scale-105" />
              {!isCollapsed && <span className="truncate">{adminItem.label}</span>}

              {isCollapsed && (
                <span className="pointer-events-none absolute left-full ml-3 px-2.5 py-1.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[11px] font-bold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition duration-150 whitespace-nowrap shadow-xl z-50">
                  {adminItem.label}
                </span>
              )}
            </Link>
          </div>
        </aside>

        {/* ===================================================================== */}
        {/* MAIN APP CONTENT WITH MINIMAL TOP HEADER */}
        {/* ===================================================================== */}
        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-900/90">
          {/* Clean Modern Navbar: Image Logo Only (Left) & Theme Toggle (Right) */}
          <header className="hidden md:flex items-center justify-between px-8 py-3.5 border-b border-zinc-100 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md">
            <Link href="/" aria-label="Home" className="flex items-center focus:outline-none transition-transform hover:scale-105 active:scale-95">
              <AppLogoIcon size={34} />
            </Link>

            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </header>

          {/* Dynamic Page Scroll Area */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
};
