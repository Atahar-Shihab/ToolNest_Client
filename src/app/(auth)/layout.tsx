import React from 'react';
import Link from 'next/link';
import { Rocket } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#0A0D14] text-foreground p-4">
      {/* Background Gradients & Mesh Pattern */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Top Brand Logo */}
      <div className="z-10 mb-6">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="bg-gradient-to-tr from-primary to-secondary p-2.5 rounded-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <Rocket className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">ToolNest</span>
        </Link>
      </div>

      <div className="z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
