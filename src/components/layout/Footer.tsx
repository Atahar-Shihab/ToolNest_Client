import Link from "next/link";
import { Rocket, Globe, Share2, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="glass border-t mt-auto">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-tr from-primary to-secondary p-1.5 rounded-lg">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">ToolNest</span>
            </Link>
            <p className="text-muted text-sm max-w-xs">
              Discover, compare, and review the best AI tools for your next project. 
              The ultimate directory for AI enthusiasts.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="X / Twitter">
                <Share2 className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="GitHub">
                <Globe className="h-5 w-5" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="Discord">
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Explore</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/tools" className="hover:text-primary transition-colors">All Tools</Link></li>
              <li><Link href="/tools?category=Writing" className="hover:text-primary transition-colors">Writing Assistants</Link></li>
              <li><Link href="/tools?category=Coding" className="hover:text-primary transition-colors">Coding AI</Link></li>
              <li><Link href="/tools?category=Design" className="hover:text-primary transition-colors">Design Tools</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Subscribe</h3>
            <p className="text-muted text-sm mb-4">Get the latest AI tools delivered to your inbox weekly.</p>
            <form className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-surface border border-border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="button" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted">
          <p>© {new Date().getFullYear()} ToolNest. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with ❤️ for the AI community</p>
        </div>
      </div>
    </footer>
  );
}