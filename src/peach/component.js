// component.js
// Enhanced Peachy component system with full nested reactivity, isolated hook contexts,
// and complete support for HTML/SVG elements with proper namespace and attribute mapping.

const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
let currentNamespace = null;

export const Peachy = {
  /**
   * createElement transforms JSX into DOM elements.
   * For SVG elements, builds them as strings to preserve attribute casing.
   * For functional components, mounts them into a div container.
   * Always passes a props object (defaulting to {}) for consistent destructuring.
   */
  createElement(type, props = {}, ...children) {
    // Handle functional components
    if (typeof type === "function") {
      const container = document.createElement("div");
      mountComponent(type, container, { ...props, children });
      return container;
    }

    // Determine if this is an SVG element
    const isSvgElement = type === "svg" || currentNamespace === SVG_NAMESPACE;
    let previousNamespace = currentNamespace;

    if (type === "svg") {
      currentNamespace = SVG_NAMESPACE;
    }

    if (isSvgElement) {
      // Build SVG as a string
      let svgString = `<${type}`;
      const eventListeners = [];

      // Add attributes to the string, preserving exact names
      if (props) {
        Object.keys(props).forEach((prop) => {
          if (prop === "className") {
            svgString += ` class="${props[prop]}"`;
          } else if (prop.startsWith("on") && typeof props[prop] === "function") {
            // Store event listeners to apply later
            eventListeners.push({
              event: prop.substring(2).toLowerCase(),
              handler: props[prop],
            });
          } else if (prop !== "children") {
            svgString += ` ${prop}="${props[prop]}"`;
          }
        });
      }

      svgString += ">";

      // Process children
      children.flat().forEach((child) => {
        if (typeof child === "string" || typeof child === "number") {
          svgString += String(child);
        } else if (child instanceof Node) {
          // Convert DOM nodes to string representation (simplified)
          svgString += child.outerHTML;
        } else if (typeof child === "object" && child.type) {
          // Recursively build nested SVG elements
          svgString += this.createElement(child.type, child.props || {}, ...(child.children || []));
        }
      });

      svgString += `</${type}>`;

      // Parse the string into a DOM element
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = svgString;
      const element = tempContainer.firstChild;

      // Apply event listeners
      eventListeners.forEach(({ event, handler }) => {
        element.addEventListener(event, handler);
      });

      // Restore namespace
      if (type === "svg") {
        currentNamespace = previousNamespace;
      }

      return element;
    } else {
      // Handle standard HTML elements with namespace management
      const namespace = currentNamespace || HTML_NAMESPACE;
      const element = document.createElementNS(namespace, type);

      // Set attributes, preserving exact names and values
      if (props) {
        Object.keys(props).forEach((prop) => {
          if (prop === "className") {
            element.setAttribute("class", props[prop]);
          } else if (prop.startsWith("on") && typeof props[prop] === "function") {
            element.addEventListener(prop.substring(2).toLowerCase(), props[prop]);
          } else if (prop !== "children") {
            element.setAttribute(prop, props[prop]);
          }
        });
      }

      // Process children
      children.flat().forEach((child) => {
        if (typeof child === "string" || typeof child === "number") {
          element.appendChild(document.createTextNode(String(child)));
        } else if (child instanceof Node) {
          element.appendChild(child);
        }
      });

      // Restore namespace after processing children of <svg>
      if (type === "svg") {
        currentNamespace = previousNamespace;
      }

      return element;
    }
  },

  /**
   * Renders an element into a container.
   */
  render(element, container) {
    container.innerHTML = "";
    container.appendChild(element);
  },
};

// ---------- Hook Context Management ----------
const instanceStack = [];

function generateUID() {
  return "_" + Math.random().toString(16).slice(2);
}

function createComponentContext() {
  return {
    id: generateUID(),
    hooks: [],
    hookIndex: 0,
    update: null,
  };
}

function pushInstance(instance) {
  instanceStack.push(instance);
  currentInstance = instance;
}

function popInstance() {
  instanceStack.pop();
  currentInstance = instanceStack[instanceStack.length - 1] || null;
}

let currentInstance = null;

/**
 * Mounts a component into a container, supporting optional props.
 * It now also checks for lifecycle callbacks attached to the returned element.
 * If the component does not return a valid DOM node, we wrap it in a <div>.
 */
export function mountComponent(Component, container, props = {}) {
  const instance = createComponentContext();
  instance.Component = Component;
  instance.container = container;
  instance.props = props;
  instance.update = function () {
    instance.hookIndex = 0;
    currentInstance = instance;
    const updatedElement = instance.Component(instance.props);
    if (!(updatedElement instanceof Node)) {
      throw new Error("Component did not return a valid DOM Node in update cycle.");
    }
    container.innerHTML = "";
    container.appendChild(updatedElement);
  };
  pushInstance(instance);
  const element = instance.Component(instance.props);
  popInstance();
  if (!(element instanceof Node)) {
    throw new Error("Component did not return a valid DOM Node.");
  }
  // Call lifecycle beforemount if defined
  const lifecycle = element.__lifecycle || {};
  if (typeof lifecycle.beforemount === "function") {
    lifecycle.beforemount();
  }
  container.innerHTML = "";
  container.appendChild(element);
  // Call lifecycle mount if defined; by default this is the main mounting routine.
  if (typeof lifecycle.mount === "function") {
    lifecycle.mount();
  }
  // Store lifecycle in the instance for unmounting later
  instance.__lifecycle = lifecycle;
  return instance;
}

/**
 * Unmounts a component by calling its unmount lifecycle (if provided) and clearing its container.
 */
export function unmountComponent(container) {
  const child = container.firstChild;
  if (child && child.__lifecycle && typeof child.__lifecycle.unmount === "function") {
    child.__lifecycle.unmount();
  }
  container.innerHTML = "";
}

// ---------- Hooks ----------
/**
 * useState creates a reactive state value.
 * Returns [value, setValue].
 */
export function useState(initialValue) {
  if (!currentInstance) {
    throw new Error("useState must be called within a component's render cycle.");
  }
  const instance = currentInstance;
  const hookIndex = instance.hookIndex++;
  if (instance.hooks.length <= hookIndex) {
    instance.hooks.push(initialValue);
  }
  const setState = (newVal) => {
    instance.hooks[hookIndex] = newVal;
    if (instance.update) {
      instance.update();
    }
  };
  const value = instance.hooks[hookIndex];
  return [value, setState];
}

/**
 * useGlobalState subscribes to a key in a global state object.
 * Returns [value, setter]. Optionally accepts a defaultValue.
 */
export function useGlobalState(globalState, key, defaultValue) {
  if (globalState.get(key) === undefined && defaultValue !== undefined) {
    globalState.set(key, defaultValue);
  }
  const [value, setValue] = useState(globalState.get(key));

  globalState.subscribe((newState) => {
    setValue(newState[key]);
  });

  const setter = (newVal) => {
    globalState.set(key, newVal);
  };
  return [value, setter];
}
