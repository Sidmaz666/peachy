# Peachy 🍑

Peachy is a very minimal, lightweight, secure, and reactive front-end framework designed for building Single Page Applications (SPAs). It offers a robust state management system (local, global and global with persistence), file-based routing, and a component-based architecture with full reactivity. It's a fun project where I have learned a lot about how frontend framework works, still a proof of concept though.

![og-image](https://github.com/user-attachments/assets/4896b02b-40e1-48f0-9e9c-7e95c888b13a)

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Core Concepts](#core-concepts)
  - [Components](#components)
  - [State Management](#state-management)
  - [Routing](#routing)
  - [Hooks](#hooks)
- [Configuration](#configuration)
  - [Babel](#babel)
  - [Webpack](#webpack)
  - [Tailwind CSS](#tailwind-css)
- [Usage](#usage)
  - [Creating Components](#creating-components)
  - [Using State](#using-state)
  - [Global State](#global-state)
  - [Routing](#routing)
- [Advanced Topics](#advanced-topics)
  - [Persistent State](#persistent-state)
  - [Dynamic Routing](#dynamic-routing)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with Peachy, clone the repository and install the dependencies:

```bash
npx create-peachy-app peachy-app
cd peachy-app
```

To start the development server:

```bash
npm start
```

To build the project for production:

```bash
npm run build
```

## Project Structure

```
peachy/
├── public/
│   └── index.html
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.js
│   │   ├── blog/
│   │   │   └── [id]/
│   │   │       └── page.js
│   │   ├── layout.js
│   │   ├── loading.js
│   │   ├── not-found.js
│   │   └── page.js
│   ├── components/
│   │   └── Header.js
│   ├── peach/
│   │   ├── component.js
│   │   ├── fetch.js
│   │   ├── router.js
│   │   ├── state.js
│   │   └── utils.js
│   ├── index.css
│   └── index.js
├── babel.config.js
├── package.json
├── postcss.config.mjs
├── tailwind.config.js
└── webpack.config.js
```

## Core Concepts

### Components

Components are the building blocks of a Peachy application. They are defined using functions that return JSX.

Example:

```js
import { Peachy } from "@peach/component";
import { Link } from "@peach/router";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-4 py-2 bg-black text-xl">
      <h1>Peachy App</h1>
      <nav className="flex space-x-2 items-center">
        <Link className="cursor-pointer" href="/">
          Home
        </Link>
        <Link className="cursor-pointer" href="/about">
          About
        </Link>
      </nav>
    </header>
  );
}
```

#### Component Lifecycle

Peachy components support lifecycle methods that allow you to execute code at specific points in a component's lifecycle. These lifecycle methods are defined as properties on the JSX element returned by the component.

- **beforemount**: Runs before the component is mounted to the DOM.
- **mount**: Runs immediately after the component is mounted to the DOM.
- **unmount**: Runs when the component is removed from the DOM.

##### Note: `By default any code is executed upon component mounted to DOM.`

Example:

```js
import { Peachy } from "@peach/component";

export default function ExampleComponent() {
  const element = <div>Hello, Peachy!</div>;

  // Define lifecycle methods.
  element.__lifecycle = {
    beforemount() {
      console.log("Component is about to mount.");
    },
    mount() {
      console.log("Component has been mounted.");
    },
    unmount() {
      console.log("Component is being unmounted.");
    },
  };

  return element;
}
```

The `Peach3dModel` component demonstrates the use of lifecycle methods to manage animations and event listeners. For example, it uses the `mount` method to initialize animations and the `unmount` method to clean up resources like `requestAnimationFrame` and event listeners.

### State Management

Peachy provides a robust state management system with both local and global state capabilities.

#### Local State

Local state is managed using the `useState` hook.

Example:

```js
import { useState, Peachy } from "@peach/component";

export default function HomePage() {
  const [getCount, setCount] = useState(0);

  return (
    <div>
      <p>Count: {String(getCount)}</p>
      <button onClick={() => setCount(getCount + 1)}>Increment</button>
    </div>
  );
}
```

#### Global State

Global state is managed using the `AppState` and `PersistedAppState` classes.

Example:

```js
import { Peachy } from "@peach/component";
import { AppState } from "@peach/state";

export default function AboutPage() {
  AppState.set("lastVisited", "About");

  return (
    <div>
      <h2>About Peachy</h2>
      <p>Last visited: {AppState.get("lastVisited")}</p>
    </div>
  );
}
```

### Routing

Peachy uses a file-based routing system similar to Next.js. Routes are defined by the file structure in the `src/app` directory.

Example:

```js
import { useState, Peachy } from "@peach/component";
import { AppState } from "@peach/state";

export default function BlogPostPage({ params }) {
  const { id } = params;
  const [getLikes, setLikes] = useState(0);

  AppState.set("lastVisited", `Blog Post ${id}`);

  return (
    <div>
      <h2>Blog Post #{id}</h2>
      <p>Likes: {String(getLikes)}</p>
      <button onClick={() => setLikes(getLikes + 1)}>Like</button>
    </div>
  );
}
```

### Hooks

Peachy provides several hooks for managing state and side effects.

- `useState`: Manages local component state.
- `useGlobalState`: Manages global state with reactivity.

## Configuration

### Babel

Babel is configured to transpile JSX and modern JavaScript features.

```js
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: "> 0.25%, not dead" }],
    [
      "@babel/preset-react",
      { pragma: "Peachy.createElement", runtime: "classic" },
    ],
  ],
};
```

### Webpack

Webpack is used to bundle the application.

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@peach": path.resolve(__dirname, "src/peach"),
      "@app": path.resolve(__dirname, "src/app"),
      "@components": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: "body",
    }),
  ],
  optimization: {
    minimize: true,
  },
};
```

### Tailwind CSS

Tailwind CSS is used for styling.

```js
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: { extend: {} },
  plugins: [],
};
```

## Usage

### Creating Components

- **Define a Component**: Create a function that returns JSX.
- **Example**:

  ```js
  import { Peachy } from "@peach/component";
  import { Link } from "@peach/router";

  export default function Header() {
    return (
      <header className="w-full flex justify-between items-center px-4 py-2 bg-black text-xl">
        <h1>Peachy App</h1>
        <nav className="flex space-x-2 items-center">
          <Link className="cursor-pointer" href="/">
            Home
          </Link>
          <Link className="cursor-pointer" href="/about">
            About
          </Link>
        </nav>
      </header>
    );
  }
  ```

### Using State

- **Local State**: Use the `useState` hook to manage local state within a component.
- **Example**:

  ```js
  import { useState, Peachy } from "@peach/component";

  export default function HomePage() {
    const [getCount, setCount] = useState(0);

    return (
      <div>
        <p>Count: {String(getCount)}</p>
        <button onClick={() => setCount(getCount + 1)}>Increment</button>
      </div>
    );
  }
  ```

### Global State

- **Global State**: Use the `AppState` and `PersistedAppState` classes to manage global state.
- **Example**:

  ```js
  import { Peachy } from "@peach/component";
  import { AppState } from "@peach/state";

  export default function AboutPage() {
    AppState.set("lastVisited", "About");

    return (
      <div>
        <h2>About Peachy</h2>
        <p>Last visited: {AppState.get("lastVisited")}</p>
      </div>
    );
  }
  ```

### Routing

- **Define Routes**: Create files in the `src/app` directory to define routes.
- **Example**:

  ```js
  import { useState, Peachy } from "@peach/component";
  import { AppState } from "@peach/state";

  export default function BlogPostPage({ params }) {
    const { id } = params;
    const [getLikes, setLikes] = useState(0);

    AppState.set("lastVisited", `Blog Post ${id}`);

    return (
      <div>
        <h2>Blog Post #{id}</h2>
        <p>Likes: {String(getLikes)}</p>
        <button onClick={() => setLikes(getLikes + 1)}>Like</button>
      </div>
    );
  }
  ```

## Advanced Topics

### Persistent State

- **Persistent State**: Use `PersistedAppState` to manage state that persists across sessions using IndexedDB.
- **Example**:

  ```js
  import { useGlobalState, Peachy } from "@peach/component";
  import { PersistedAppState } from "@peach/state";

  export default function HomePage() {
    const [getTheme, setTheme] = useGlobalState(PersistedAppState, "theme");

    return (
      <div>
        <p>Persistent Global Theme: {String(getTheme) || "default"}</p>
        <button onClick={() => setTheme("dark")}>Set Dark Theme</button>
      </div>
    );
  }
  ```

### Dynamic Routing

- **Dynamic Routing**: Use bracket notation in file names to define dynamic routes.
- **Example**:

  ```js
  import { useState, Peachy } from "@peach/component";
  import { AppState } from "@peach/state";

  export default function BlogPostPage({ params }) {
    const { id } = params;
    const [getLikes, setLikes] = useState(0);

    AppState.set("lastVisited", `Blog Post ${id}`);

    return (
      <div>
        <h2>Blog Post #{id}</h2>
        <p>Likes: {String(getLikes)}</p>
        <button onClick={() => setLikes(getLikes + 1)}>Like</button>
      </div>
    );
  }
  ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
