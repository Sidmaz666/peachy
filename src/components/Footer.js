import { Peachy, useState } from "@peach/component";
import { Link } from "@peach/router";
import PeachyLogo from "@components/PeachyLogo";
import { target } from '../../node_modules/enhanced-resolve/lib/util/entrypoints';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <PeachyLogo className="h-8 w-8" />
              <span className="font-bold text-xl">Peachy</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              A very minimal, lightweight, secure, and reactive front-end
              framework designed for building modern Single Page Applications.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground mb-4">
              Framework
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/docs"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Peachy Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground mb-4">
              Community
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/sidmaz666/peachy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Built with Peachy ❤
          </p>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a
              href="https://github.com/sidmaz666/peachy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
