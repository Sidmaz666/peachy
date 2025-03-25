// router.js
// Advanced file‑based router that mimics Next.js 14.
// Scans the “src/app” directory (using Webpack’s require.context) for special files:
// • page.js : The main page component for a route.
// • layout.js : A layout wrapper (global or per‑directory).
// • loading.js : A loading indicator while asynchronously loading pages.
// • not-found.js : A fallback for unknown routes.
// Also supports dynamic routing via bracket notation (e.g. [id].js).

import { mountComponent, Peachy } from "@peach/component";

// Create contexts for page, layout, loading, and not-found files.
const pagesContext = require.context("../app", true, /page\.js$/);
const layoutsContext = require.context("../app", true, /layout\.js$/);
const notFoundContext = require.context("../app", false, /not-found\.js$/);
const loadingContext = require.context("../app", false, /loading\.js$/);

// Helper: Derive a route path from a file path.
// Example: "./page.js" becomes "/", "./about/page.js" becomes "/about"
// In router.js, update the deriveRoutePath function as follows:
const deriveRoutePath = (filePath) => {
  if (filePath === "./page.js") return "/";
  let route = filePath.replace(/^\.\//, "").replace(/\/page\.js$/, "");
  return route ? "/" + route : "/";
};

// Build the routes table from pagesContext.
const routes = {};
pagesContext.keys().forEach((filePath) => {
  const routePath = deriveRoutePath(filePath);
  const pageModule = pagesContext(filePath);
  routes[routePath] = { page: pageModule.default || pageModule };
});

// Get layout for a route. Check for a layout in the same directory as the page,
// otherwise use the global layout at "./layout.js" if available.
const getLayoutForRoute = (route) => {
  let layoutPath;
  // For the root route, use the global layout.
  if (route === "/") {
    layoutPath = "./layout.js";
  } else {
    layoutPath = "." + route + "/layout.js";
  }
  // Check for a route-specific layout.
  if (layoutsContext.keys().includes(layoutPath)) {
    const mod = layoutsContext(layoutPath);
    return mod.default || mod;
  }
  // Fallback: use the global layout if available.
  if (layoutsContext.keys().includes("./layout.js")) {
    const mod = layoutsContext("./layout.js");
    return mod.default || mod;
  }
  return null;
};

// Load global not-found component, if available.
let NotFoundComponent = null;
if (notFoundContext.keys().length > 0) {
  const mod = notFoundContext(notFoundContext.keys()[0]);
  NotFoundComponent = mod.default || mod;
}

// Load global loading component, if available.
let LoadingComponent = null;
if (loadingContext.keys().length > 0) {
  const mod = loadingContext(loadingContext.keys()[0]);
  LoadingComponent = mod.default || mod;
}

export class Router {
  constructor() {
    this.routes = routes;
    this.currentRoute = null;
    window.onpopstate = () => this.handleRoute(window.location.pathname);
  }

  // Programmatically navigate.
  navigate(path) {
    if (this.currentRoute === path) return; // Prevent duplicate navigation
    history.pushState({}, "", path);
    this.handleRoute(path);
  }

  // In router.js, update the resolveRoute method:
  resolveRoute(path) {
    // Exact match first:
    if (this.routes[path]) {
      return { route: this.routes[path], params: {} };
    }

    // Check each registered route for dynamic segments.
    for (let routeKey in this.routes) {
      const paramNames = [];
      // Remove group parentheses: e.g., "/(blog)/[id]" -> "/blog/[id]"
      let normalizedRoute = routeKey.replace(/\(([^)]+)\)/g, "$1");
      // Convert [param] segments to capture groups.
      const regexPath = normalizedRoute.replace(
        /\[([^\]]+)\]/g,
        (_, paramName) => {
          paramNames.push(paramName);
          return "([^/]+)";
        }
      );
      const regex = new RegExp(`^${regexPath}$`);
      const match = path.match(regex);
      if (match) {
        const params = {};
        paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        });
        return { route: this.routes[routeKey], params };
      }
    }
    return null;
  }

  // Then, in handleRoute, update the mounting of the page component to pass dynamic parameters:

  handleRoute(path) {
    this.currentRoute = path;
    const container = document.getElementById("app");
    container.innerHTML = "";

    const resolved = this.resolveRoute(path);
    if (!resolved) {
      if (NotFoundComponent) {
        mountComponent(NotFoundComponent, container);
      } else {
        container.innerHTML = `<h1>404 - Page Not Found</h1>`;
      }
      return;
    }
    const { route, params } = resolved;

    // Optionally, render the loading component.
    if (LoadingComponent) {
      const loadingEl = LoadingComponent();
      container.appendChild(loadingEl);
    }

    // Get layout for the current route.
    const Layout = getLayoutForRoute(path);
    const Page = route.page;

    // Create a wrapper function that passes the params to the page component.
    const PageWithParams = () => Page({ params });

    if (Layout) {
      const layoutEl = Layout();
      container.innerHTML = "";
      container.appendChild(layoutEl);
      const pageContainer = container.querySelector("#page-content");
      if (!pageContainer) {
        console.error('Layout must include an element with id "page-content".');
        return;
      }
      mountComponent(PageWithParams, pageContainer);
    } else {
      mountComponent(PageWithParams, container);
    }
  }
}

export const peachyRouter = new Router();

// Basic Link component that uses the PeachyRouter to navigate.
export const Link = ({ children, href, ...props }) => {
  return (
    <a onClick={() => peachyRouter.navigate(href)} {...props}>
      {children}
    </a>
  );
};
