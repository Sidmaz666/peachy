// router.js
// Advanced file-based router mimicking Next.js 14 with dynamic routing.

import { mountComponent, Peachy } from "@peach/component";

// Create contexts for page, layout, loading, and not-found files.
const pagesContext = require.context("../app", true, /page\.js$/);
const layoutsContext = require.context("../app", true, /layout\.js$/);
const notFoundContext = require.context("../app", false, /not-found\.js$/);
const loadingContext = require.context("../app", false, /loading\.js$/);

// Helper: derive route path from file path.
const deriveRoutePath = (filePath) => {
  if (filePath === "./page.js") return "/";
  let route = filePath.replace(/^\.\//, "").replace(/\/page\.js$/, "");
  return route ? "/" + route : "/";
};

// Build routes table.
const routes = {};
pagesContext.keys().forEach((filePath) => {
  const routePath = deriveRoutePath(filePath);
  const pageModule = pagesContext(filePath);
  routes[routePath] = { page: pageModule.default || pageModule };
});

// Get layout for a route.
const getLayoutForRoute = (route) => {
  let layoutPath;
  if (route === "/") {
    layoutPath = "./layout.js";
  } else {
    layoutPath = "." + route + "/layout.js";
  }
  if (layoutsContext.keys().includes(layoutPath)) {
    const mod = layoutsContext(layoutPath);
    return mod.default || mod;
  }
  if (layoutsContext.keys().includes("./layout.js")) {
    const mod = layoutsContext("./layout.js");
    return mod.default || mod;
  }
  return null;
};

// Load not-found component if available.
let NotFoundComponent = null;
if (notFoundContext.keys().length > 0) {
  const mod = notFoundContext(notFoundContext.keys()[0]);
  NotFoundComponent = mod.default || mod;
}

// Load loading component if available.
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

  navigate(path) {
    if (this.currentRoute === path) return;
    history.pushState({}, "", path);
    this.handleRoute(path);
  }

  resolveRoute(path) {
    if (this.routes[path]) {
      return { route: this.routes[path], params: {} };
    }
    for (let routeKey in this.routes) {
      const paramNames = [];
      let normalizedRoute = routeKey.replace(/\(([^)]+)\)/g, "$1");
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

    if (LoadingComponent) {
      const loadingEl = LoadingComponent();
      if (!(loadingEl instanceof Node)) {
        console.error("LoadingComponent must return a DOM Node.");
      } else {
        container.appendChild(loadingEl);
      }
    }

    const Layout = getLayoutForRoute(path);
    const Page = route.page;
    const PageWithParams = () => Page({ params });
    if (Layout) {
      let layoutEl = Layout();
      if (!(layoutEl instanceof Node)) {
        console.error("Layout must return a DOM Node.");
        return;
      }
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

export const Link = ({ children, href, scroll = true, ...props }) => {
  return (
    <a onClick={() => {
      peachyRouter.navigate(href)
      // Scroll to the Top 
      if(scroll) window.scrollTo(0, 0);
      }} {...props}>
      {children}
    </a>
  );
};
