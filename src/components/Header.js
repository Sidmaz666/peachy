import { Peachy, useState } from "@peach/component";
import { Link } from "@peach/router";
import ThemeToggle from "@components/ThemeToggle";
import PeachyLogo from "@components/PeachyLogo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Define the scroll handler
  const handleScroll = () => {
    const shouldScroll = window.scrollY > 100;
    // Only update state if it has changed
    if (scrolled !== shouldScroll) {
      setScrolled(shouldScroll);
    } else if (window.scrollY <= 100) {
      setScrolled(false);
    }
  };

  // Define lifecycle methods to attach and remove the event listener
  const lifecycle = {
    mount() {
      window.addEventListener("scroll", handleScroll);
    },
    unmount() {
      window.removeEventListener("scroll", handleScroll);
    },
  };

  const header = (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 glass"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <PeachyLogo className="h-8 w-8" />
            <span className="font-bold text-xl">Peachy</span>
          </Link>
          <div className="md:flex hidden items-center gap-8">
            <nav className="flex gap-6">
              <Link
                href="/docs"
                className="font-medium hover:text-primary transition-colors"
              >
                Docs
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/sidmaz666/peachy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {/* GitHub SVG */}
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
              <ThemeToggle />
            </div>
          </div>

          <button
            className="md:hidden block"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="glass p-6 mx-4 my-2 rounded-xl">
          <nav className="flex flex-col gap-4">
            <span onClick={() => setMobileMenuOpen(false)}>
              <Link
                href="/docs"
                className="font-medium hover:text-primary transition-colors"
              >
                Docs
              </Link>
            </span>
          </nav>

          <div className="flex items-center gap-4 mt-6">
            <a
              href="https://github.com/sidmaz666/peachy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              {/* GitHub SVG */}
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
    </header>
  );

  // Attach lifecycle callbacks
  header.__lifecycle = lifecycle;

  return header;
}
