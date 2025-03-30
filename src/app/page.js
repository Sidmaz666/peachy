import { Peachy } from "@peach/component";
import Button from "@components/Button";
import CodeBlock from "@components/CodeBlock";
import Peach3dModel from "@components/Peach3dModel";
import { Link } from "@peach/router";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Enhanced Grid Matrix Background */}
      <section className="py-20 relative overflow-hidden">
        {/* Enhanced Grid Matrix Background */}
        <div className="absolute inset-0 grid-matrix">
          <div className="absolute inset-0 grid-bg"></div>
          <div className="absolute inset-0 grid-horizontal-lines"></div>
          <div className="absolute inset-0 grid-vertical-lines"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium mb-6">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                <span>Now in beta</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Build modern web apps with{" "}
                <span className="text-gradient">Peachy</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                A minimal, lightweight, secure, and reactive front-end framework
                for building beautiful Single Page Applications.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/docs">
                  <Button size="lg">
                    Get Started
                    <svg
                      className="ml-2 -mr-1"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M6.66669 3.33331L10.6667 7.99998L6.66669 12.6666"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </Link>

                <a
                  href="https://github.com/sidmaz666/peachy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg">
                    <svg
                      className="mr-2 -ml-1"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M10 2.66669C12.2092 2.66669 14 4.45755 14 6.66669C14 10.3334 9.33333 13.3334 8 13.3334C6.66667 13.3334 2 10.3334 2 6.66669C2 4.45755 3.79086 2.66669 6 2.66669C7.07333 2.66669 8.04667 3.08002 8.66667 3.76002C9.28667 3.08002 10.26 2.66669 10 2.66669Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    View on GitHub
                  </Button>
                </a>
              </div>
            </div>

            <div
              id="peach-container"
              className="h-[500px] relative transform transition-all duration-300 hover:scale-105"
            >
              <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
                <Peach3dModel />
              </div>
            </div>
          </div>
        </div>

        {/* Gradient glow */}
        <div className="absolute inset-0 glow"></div>
      </section>

      {/* Features */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why choose Peachy?</h2>
            <p className="text-muted-foreground">
              A framework built with simplicity, performance, and developer
              experience in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Lightweight",
                description:
                  "Built for speed with a minimal footprint. No bloated dependencies or unnecessary features.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M20.24 4.24a5.5 5.5 0 0 0-7.78 0L4 12.67V20h7.33l8.46-8.46a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                ),
              },
              {
                title: "Robust State Management",
                description:
                  "Peachy provides local component level state, global and persistent global state management.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 2 L20 6 V12 C20 17 16 22 12 22 C8 22 4 17 4 12 V6 Z"></path>
                    <circle cx="9" cy="11" r="1.5"></circle>
                    <circle cx="15" cy="11" r="1.5"></circle>
                    <circle cx="12" cy="15" r="1.5"></circle>
                    <line x1="9" y1="11" x2="12" y2="15"></line>
                    <line x1="12" y1="15" x2="15" y2="11"></line>
                    <line x1="9" y1="11" x2="15" y2="11"></line>
                  </svg>
                ),
              },
              {
                title: "File-Based Routing",
                description:
                  "Create routes with simple file structures. No configuration required.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 3h10l4 4v6H3z" />
                    <polyline points="13 3,13 7,17 7" />
                    <line x1="8" y1="13" x2="8" y2="18" />
                    <line x1="8" y1="18" x2="6" y2="16" />
                    <line x1="8" y1="18" x2="10" y2="16" />
                  </svg>
                ),
              },
              {
                title: "JSX Components",
                description:
                  "Build with reusable, isolated components with JSX that manage their own state and behavior.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16.5 9.4 7.5 4.21"></path>
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <path d="M3.27 6.96 12 12.01l8.73-5.05"></path>
                    <path d="M12 22.08V12"></path>
                  </svg>
                ),
              },
              {
                title: "Reactivity",
                description:
                  "Automatically update the DOM when your data changes, with no performance overhead.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="12,6 9,12 13,12 10,18 15,11 11,11"></polygon>
                  </svg>
                ),
              },
              {
                title: "Modern Architecture",
                description:
                  "Designed with modern JavaScript best practices and patterns for clean, maintainable code.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 2v1"></path>
                    <path d="M12 21v1"></path>
                    <path d="M4.2 4.2l.7.7"></path>
                    <path d="M19.1 19.1l.7.7"></path>
                    <path d="M2 12h1"></path>
                    <path d="M21 12h1"></path>
                    <path d="M4.2 19.8l.7-.7"></path>
                    <path d="M19.1 4.9l.7-.7"></path>
                    <circle cx="12" cy="12" r="4"></circle>
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass p-6 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl peach-gradient flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="py-8">
              <h2 className="text-3xl font-bold mb-4">Simple, intuitive API</h2>
              <p className="text-muted-foreground mb-8">
                Peachy provides a clean, familiar API that feels natural to use.
                No complex patterns or boilerplate code to worry about.
              </p>

              <div className="space-y-10">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full peach-gradient flex items-center justify-center text-white mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">
                      Familiar Component Syntax
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Write components with standard JSX that feels natural to
                      React developers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full peach-gradient flex items-center justify-center text-white mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Smart State Management</h3>
                    <p className="text-muted-foreground text-sm">
                      Local and global state handling with built-in persistence
                      and reactivity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full peach-gradient flex items-center justify-center text-white mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">
                      Auto-optimized Performance
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Peachy intelligently updates only what needs to change,
                      ensuring smooth user interactions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full peach-gradient flex items-center justify-center text-white mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">
                      Intuitive File-based Routing
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Define routes by organizing files in the app
                      directory—dynamic routes and layouts made effortless.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full peach-gradient flex items-center justify-center text-white mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">
                      Core Utilities
                    </h3>
                    <p className="text-muted-foreground text-sm">
                     Peachy provdes core utilities like useFetch, Link Component and a waitFor function.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full peach-gradient flex items-center justify-center text-white mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">
                      Component Life Cycle
                    </h3>
                    <p className="text-muted-foreground text-sm">
                     Execute code at specific points in a component's lifecycle mount, beforemount and unmount.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full peach-gradient flex items-center justify-center text-white mt-0.5">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">
                      Modern Build Tools & Configuration
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Benefits from a robust toolchain including Babel, Webpack,
                      and Tailwind CSS..
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <CodeBlock
                language="jsx"
                code={`
import { useGlobalState, Peachy } from "@peach/component";
import { PersistedAppState } from "@peach/state";

export default function HomePage() {
  // Reactive persisted state with default "light".
  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const system_theme = prefersDark ? "dark" : "light";
  const [theme, setTheme] = useGlobalState(
    PersistedAppState,
    "theme",
    system_theme
  );

  const root = window.document.documentElement;


  if (theme) {
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }

  return (
    <div>
      <p>
        Persistent Global Theme: {theme || "default"}
      </p>
      <button 
        onClick={() => setTheme("dark")}
        >
        Set Dark Theme
      </button>
    </div>
  );
}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to build with Peachy?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Get started with Peachy today and experience a simpler way to build
            fast, modern web applications.
          </p>


          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/docs">
              <Button size="lg">Read the Docs</Button>
            </Link>
            <a
              href="https://github.com/sidmaz666/peachy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                Star on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
