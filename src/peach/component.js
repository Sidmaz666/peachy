// component.js
// Core component system supporting JSX with full reactivity for component-level state.
// Includes a hooks mechanism and a mountComponent function that re-renders a component when its local state changes.

// --- Peachy Core Component System ---
// Peachy is a simple component system that supports JSX and reactivity.
// Includes a createElement function that transforms JSX into DOM elements,
export const Peachy = {
  // createElement is used by Babel to transform JSX.
  createElement(type, props, ...children) {
    if (typeof type === 'function') {
      return type({ ...props, children });
    }
    const element = document.createElement(type);
    if (props) {
      Object.keys(props).forEach(prop => {
        if (prop === 'className') {
          element.setAttribute('class', props[prop]);
        } else if (prop.startsWith('on') && typeof props[prop] === 'function') {
          element.addEventListener(prop.substring(2).toLowerCase(), props[prop]);
        } else if (prop !== 'children') {
          element.setAttribute(prop, props[prop]);
        }
      });
    }
    children.flat().forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        element.appendChild(child);
      }
    });
    return element;
  },

  // Render static elements.
  render(element, container) {
    container.innerHTML = '';
    container.appendChild(element);
  }
};

// --- Reactive Hooks System ---
// Each mounted component gets its own hook storage context. We use a global variable
// "currentInstance" to associate hook calls during rendering with the component instance.

let currentInstance = null;

export function mountComponent(Component, container) {
  const instance = {
    Component,
    container,
    hooks: [],
    hookIndex: 0,
    update() {
      this.hookIndex = 0;
      currentInstance = this;
      const element = this.Component();
      this.container.innerHTML = '';
      this.container.appendChild(element);
    }
  };
  currentInstance = instance;
  const element = Component();
  container.innerHTML = '';
  container.appendChild(element);
  return instance;
}

export function useState(initialValue) {
  if (!currentInstance) {
    throw new Error("useState must be called within a component's render cycle.");
  }
  const hookIndex = currentInstance.hookIndex++;
  if (currentInstance.hooks.length <= hookIndex) {
    currentInstance.hooks.push(initialValue);
  }
  const setState = (newVal) => {
    currentInstance.hooks[hookIndex] = newVal;
    currentInstance.update();
  };
  const getState =  currentInstance.hooks[hookIndex];
  return [getState, setState];
}

/**
 * useGlobalState
 * A custom hook that subscribes to changes on a specific key of a global state object.
 * It returns a getter and setter for that global state key.
 *
 * @param {GlobalState} globalState - The global state instance (e.g., PersistentAppState).
 * @param {string} key - The key within the global state.
 * @returns {[function, function]} - A getter function and a setter function.
 */
export function useGlobalState(globalState, key) {
  // Initialize the local state with the current global state value.
  const [getValue, setValue] = useState(globalState.get(key));
  
  // Subscribe to global state changes.
  // Note: In a production-ready hook, you would remove the subscription on unmount.
  globalState.subscribe((newState) => {
    // If the global state's key value has changed, update the local state.
    if (newState[key] !== getValue) {
      setValue(newState[key]);
    }
  });
  
  // Return the local getter and a setter that updates the global state.
  const setter = (newVal) => {
    globalState.set(key, newVal);
  };
  return [getValue, setter];
}

// (Optional) A helper to unmount a component.
export function unmountComponent(container) {
  container.innerHTML = '';
}

