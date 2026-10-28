import Link from "next/link";
import { Rocket, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="glass border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-tr from-primary to-secondary p-1.5 rounded-lg shadow-md">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">ToolNest</span>
            </Link>
            <p className="text-muted text-sm max-w-xs leading-relaxed">
              Discover, compare, and review top AI tools for your next project. 
              Built with precision by <span className="text-foreground font-semibold">Atahar Shihab</span>.
            </p>
            
            {/* Pure Icon Type Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="mailto:shihabatahar@gmail.com" 
                className="p-2.5 rounded-xl glass hover:bg-primary hover:text-white text-muted transition-all border border-border shadow-sm" 
                aria-label="Email"
                title="Send Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a 
                href="https://github.com/Atahar-Shihab" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl glass hover:bg-primary hover:text-white text-muted transition-all border border-border shadow-sm" 
                aria-label="GitHub Profile"
                title="GitHub Profile"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/atahar-shihab" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl glass hover:bg-primary hover:text-white text-muted transition-all border border-border shadow-sm" 
                aria-label="LinkedIn Profile"
                title="LinkedIn Profile"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/atahar.shihab.740192/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl glass hover:bg-primary hover:text-white text-muted transition-all border border-border shadow-sm" 
                aria-label="Facebook Profile"
                title="Facebook Profile"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Column 2: Explore */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Explore</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/tools" className="hover:text-primary transition-colors">All Tools Directory</Link></li>
              <li><Link href="/compare" className="hover:text-primary transition-colors text-primary font-medium">Compare AI Tools</Link></li>
              <li><Link href="/tools?category=Writing" className="hover:text-primary transition-colors">Writing Assistants</Link></li>
              <li><Link href="/tools?category=Coding" className="hover:text-primary transition-colors">Coding AI</Link></li>
              <li><Link href="/tools?category=Design" className="hover:text-primary transition-colors">Design Tools</Link></li>
              <li><Link href="/payment" className="hover:text-primary transition-colors">Pro Membership</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Repositories */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Repositories</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Developer</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Developer</Link></li>
              <li><a href="https://github.com/Atahar-Shihab/ToolNest_Client" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Frontend Client Repo</a></li>
              <li><a href="https://github.com/Atahar-Shihab/ToolNest_Server" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Backend Server Repo</a></li>
            </ul>
          </div>
          
          {/* Column 4: Contact & Creator */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Developer</h3>
            <p className="text-muted text-sm mb-4">Crafted by <strong className="text-foreground">Atahar Shihab</strong></p>
            <div className="flex items-center gap-2">
              <a 
                href="mailto:shihabatahar@gmail.com" 
                className="p-3 rounded-xl glass hover:bg-primary hover:text-white text-foreground font-semibold text-sm transition-all border border-border shadow-md flex items-center gap-2"
                title="Send Email"
              >
                <Mail size={18} />
                <span>Contact</span>
              </a>
              <a 
                href="https://github.com/Atahar-Shihab" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-xl glass hover:bg-primary hover:text-white text-foreground transition-all border border-border shadow-md"
                title="GitHub Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/atahar-shihab" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-xl glass hover:bg-primary hover:text-white text-foreground transition-all border border-border shadow-md"
                title="LinkedIn Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted gap-2">
          <p>© {new Date().getFullYear()} ToolNest by Atahar Shihab. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with ❤️ using Next.js & Node.js
          </p>
        </div>
      </div>
    </footer>
  );
}