import { Peachy } from "@peach/component";
import { Link } from "@peach/router";
import CodeBlock from "@components/CodeBlock";

export default function Docs() {
  return (
    <section className="flex-1 py-20 px-4">
      <div className="container mx-auto max-w-4xl pt-10">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Peachy Documentation</h1>
          <p className="text-muted-foreground text-xl">
            Everything you need to know about building with Peachy.
          </p>
        </div>

        <div className="space-y-12">
          <section id="getting-started">
            <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
            <p className="mb-6">
              Welcome to Peachy! This guide will help you set up your first
              Peachy project.
            </p>

            <h3 className="text-xl font-semibold mb-3">Installation</h3>
            <p className="mb-4">
              To create a new Peachy project, run the following command:
            </p>

            <CodeBlock
              language="bash"
              code={`# Clone the repository
git clone https://github.com/your-repo/peachy.git peachy-app

# Enter the directory
cd peachy-app

# Install dependencies
npm install

# Start the development server
npm start`}
            />

            <h3 className="text-xl font-semibold mt-8 mb-3">
              Project Structure
            </h3>
            <p className="mb-4">
              A basic Peachy project has the following structure:
            </p>

            <CodeBlock
              language="text"
              code={`peachy/
├── public/
│   └── index.html
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.js
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
└── webpack.config.js`}
            />
          </section>

          <section id="core-concepts">
            <h2 className="text-2xl font-bold mb-4">Core Concepts</h2>

            <h3 className="text-xl font-semibold mb-3">Components</h3>
            <p className="mb-4">
              Components are the building blocks of a Peachy application. They
              are defined using functions that return JSX.
            </p>

            <CodeBlock
              language="jsx"
              code={`import { Peachy } from "@peach/component";

export default function Header() {
  return (
    <header className="p-4 bg-primary text-white">
      <h1>My Peachy App</h1>
    </header>
  );
}`}
            />

            <h3 className="text-xl font-semibold mt-8 mb-3">
              State Management
            </h3>
            <p className="mb-4">
              Peachy provides a robust state management system with both local
              and global state capabilities.
            </p>

            <h4 className="text-lg font-medium mt-6 mb-2">Local State</h4>
            <p className="mb-4">
              Local state is managed using the useState hook:
            </p>

            <CodeBlock
              language="jsx"
              code={`import { useState, Peachy } from "@peach/component";

export default function Counter() {
  const [getCount, setCount] = useState(0);

  return (
    <div>
      <p>Count: {String(getCount)}</p>
      <button onClick={() => setCount(getCount + 1)}>
        Increment
      </button>
    </div>
  );
}`}
            />

            <h4 className="text-lg font-medium mt-6 mb-2">Global State</h4>
            <p className="mb-4">
              Global state is managed using the AppState class:
            </p>

            <CodeBlock
              language="jsx"
              code={`import { Peachy } from "@peach/component";
import { AppState } from "@peach/state";

export default function ThemeSwitcher() {
  const currentTheme = AppState.get("theme") || "light";
  
  function toggleTheme() {
    AppState.set("theme", currentTheme === "light" ? "dark" : "light");
  }

  return (
    <div>
      <p>Current theme: {currentTheme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}`}
            />

            <h4 className="text-lg font-medium mt-6 mb-2">
              Persistent App State
            </h4>
            <p className="mb-4">
              Persistent state is maintained across browser sessions using
              PersistedAppState:
            </p>

            <CodeBlock
              language="jsx"
              code={`import { Peachy } from "@peach/component";
import { PersistedAppState } from "@peach/state";

export default function UserPreferences() {
  const username = PersistedAppState.get("username") || "Guest";
  
  function setUsername(newName) {
    PersistedAppState.set("username", newName);
  }

  return (
    <div>
      <p>Welcome, {username}!</p>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
    </div>
  );
}`}
            />

            <h4 className="text-lg font-medium mt-6 mb-2">
              Using Global State with Hooks
            </h4>
            <p className="mb-4">
              For reactive global state updates, use the useGlobalState hook:
            </p>

            <CodeBlock
              language="jsx"
              code={`import { useGlobalState, Peachy } from "@peach/component";
import { AppState, PersistedAppState } from "@peach/state";

export default function Settings() {
  // Reactive global state
  const [getTheme, setTheme] = useGlobalState(AppState, "theme", "light");
  
  // Reactive persistent state
  const [getLanguage, setLanguage] = useGlobalState(PersistedAppState, "language", "en");

  return (
    <div>
      <div>
        <h3>Theme</h3>
        <select 
          value={getTheme} 
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      
      <div>
        <h3>Language</h3>
        <select 
          value={getLanguage} 
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>
    </div>
  );
}`}
            />
          </section>

          <section id="component-lifecycle">
            <h2 className="text-2xl font-bold mb-4">Component Lifecycle</h2>
            <p className="mb-4">
              Peachy components support lifecycle methods that allow you to
              execute code at specific points in a component's lifecycle. These
              lifecycle methods are defined as properties on the JSX element
              returned by the component.
            </p>
            <ul className="list-disc list-inside mb-4 text-sm">
              <li>
                <strong>beforemount</strong>: Runs before the component is
                mounted to the DOM.
              </li>
              <li>
                <strong>mount</strong>: Runs immediately after the component is
                mounted to the DOM.
              </li>
              <li>
                <strong>unmount</strong>: Runs when the component is removed
                from the DOM.
              </li>
            </ul>
            <p className="mb-4 text-sm">
              <em>
                Note: By default any code is executed upon component mounted to
                DOM.
              </em>
            </p>
            <CodeBlock
              language="javascript"
              code={`import { Peachy } from "@peach/component";

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
}`}
            />
            <p className="mt-4 text-sm">
              The <code>Peach3dModel</code> component demonstrates the use of
              lifecycle methods to manage animations and event listeners. For
              example, it uses the <code>mount</code> method to initialize
              animations and the <code>unmount</code> method to clean up
              resources like <code>requestAnimationFrame</code> and event
              listeners.
            </p>
          </section>

          <section id="routing">
            <h2 className="text-2xl font-bold mb-4">Routing</h2>
            <p className="mb-4">
              Peachy uses a file-based routing system similar to Next.js. Routes
              are defined by the file structure in the src/app directory.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Basic Routes</h3>
            <p className="mb-4">
              Create directory and page.js file in the src/app directory to
              define routes:
            </p>

            <CodeBlock
              language="jsx"
              code={`// File: src/app/page.js
import { Peachy } from "@peach/component";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to my Peachy app!</h1>
    </div>
  );
}`}
            />

            <h3 className="text-xl font-semibold mt-6 mb-2">Dynamic Routes</h3>
            <span className="mb-4 flex items-center space-x-2">
              Create dynamic routes using square brackets (
              <Link
                href="/blog/2"
                className="font-medium text-primary/60 hover:text-primary transition-colors"
              >
                example
              </Link>
              ):
            </span>

            <CodeBlock
              language="jsx"
              code={`// File: src/app/users/[id]/page.js
import { useState, Peachy } from "@peach/component";

export default function UserProfilePage({ params }) {
  const { id } = params;
  const [getProfile, setProfile] = useState(null);

  // Fetch user profile data
  if (!getProfile) {
    fetchUserProfile(id).then(profile => setProfile(profile));
  }

  return (
    <div>
      <h2>User Profile #{id}</h2>
      {getProfile ? (
        <div>
          <p>Name: {getProfile.name}</p>
          <p>Email: {getProfile.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}`}
            />

            <h3 className="text-xl font-semibold mt-6 mb-2">Navigation</h3>
            <p className="mb-4">
              Use the Link component to navigate between routes:
            </p>

            <CodeBlock
              language="jsx"
              code={`import { Peachy } from "@peach/component";
import { Link } from "@peach/router";

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/users/123">User #123</Link>
    </nav>
  );
}`}
            />

            <h3 className="text-xl font-semibold mt-6 mb-2">
              Layout & Loading States
            </h3>
            <p className="mb-4">Define common layouts and loading states:</p>

            <CodeBlock
              language="jsx"
              code={`// File: src/app/layout.js
import { Peachy } from "@peach/component";
import Header from "@components/Header";
import Footer from "@components/Footer";

export default function RootLayout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

// File: src/app/loading.js
import { Peachy } from "@peach/component";

export default function Loading() {
  return <div>Loading...</div>;
}

// File: src/app/not-found.js
import { Peachy } from "@peach/component";

export default function NotFound() {
  return <div>Page not found!</div>;
}`}
            />
          </section>

          <section id="data-fetching">
            <h2 className="text-2xl font-bold mb-4">Data Fetching</h2>
            <p className="mb-4">
              Peachy provides utilities for data fetching with automatic caching
              and revalidation.
            </p>

            <CodeBlock
              language="jsx"
              code={`import { useState, Peachy } from "@peach/component";
import { fetch } from "@peach/fetch";

export default function UserList() {
  const [getUsers, setUsers] = useState([]);
  const [getLoading, setLoading] = useState(false);
  
  async function fetchUsers() {
    setLoading(true);
    
    try {
      // Cache for 5 minutes (300 seconds)
      const users = await fetch("https://api.example.com/users", { cache: 300 });
      setUsers(users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }
  
  // Load users when component mounts
  if (getUsers.length === 0 && !getLoading) {
    fetchUsers();
  }

  return (
    <div>
      <h2>Users</h2>
      {getLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {getUsers.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
      <button onClick={fetchUsers} disabled={getLoading}>
        Refresh
      </button>
    </div>
  );
}`}
            />
          </section>

          <section id="hooks">
            <h2 className="text-2xl font-bold mb-4">Custom Hooks</h2>
            <p className="mb-4">
              Peachy supports custom hooks for reusing stateful logic.
            </p>

            <CodeBlock
              language="jsx"
              code={`// hooks/useCounter.js
import { useState } from "@peach/component";

export function useCounter(initialValue = 0) {
  const [getCount, setCount] = useState(initialValue);
  
  const increment = () => setCount(getCount + 1);
  const decrement = () => setCount(getCount - 1);
  const reset = () => setCount(initialValue);
  
  return {
    count: getCount,
    increment,
    decrement,
    reset
  };
}

// Using the hook
import { Peachy } from "@peach/component";
import { useCounter } from "@hooks/useCounter";

export default function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter(10);
  
  return (
    <div>
      <p>Count: {String(count)}</p>
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}`}
            />
          </section>

          <section id="configuration">
            <h2 className="text-2xl font-bold mb-4">Configuration</h2>

            <h3 className="text-xl font-semibold mb-3">Babel</h3>
            <p className="mb-4">Configure Babel to transpile JSX for Peachy:</p>

            <CodeBlock
              language="javascript"
              code={`// babel.config.js
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: "> 0.25%, not dead" }],
    [
      "@babel/preset-react",
      { pragma: "Peachy.createElement", runtime: "classic" },
    ],
  ],
};`}
            />

            <h3 className="text-xl font-semibold mt-8 mb-3">Webpack</h3>
            <p className="mb-4">Configure Webpack for your Peachy project:</p>

            <CodeBlock
              language="javascript"
              code={`// webpack.config.js
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
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@utils": path.resolve(__dirname, "src/utils"),
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
};`}
            />

            <h3 className="text-xl font-semibold mt-8 mb-3">Tailwind CSS</h3>
            <p className="mb-4">
              Configure Tailwind CSS for your Peachy project:
            </p>

            <CodeBlock
              language="javascript"
              code={`// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B3D",
        secondary: "#FFD9CC",
      },
    },
  },
  plugins: [],
};

// postcss.config.mjs
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`}
            />
          </section>

          <section id="deployment">
            <h2 className="text-2xl font-bold mb-4">Deployment</h2>
            <p className="mb-4">
              Deploy your Peachy application to various platforms.
            </p>

            <h3 className="text-xl font-semibold mb-3">Static Deployment</h3>
            <p className="mb-4">Build your app and deploy the static files:</p>

            <CodeBlock
              language="bash"
              code={`# Build the project
npm run build

# The static files will be in the 'dist' directory
# Deploy these files to your static hosting provider`}
            />

            <h3 className="text-xl font-semibold mt-8 mb-3">
              Vercel / Netlify
            </h3>
            <p className="mb-4">
              Deploy to Vercel or Netlify with zero configuration:
            </p>

            <CodeBlock
              language="json"
              code={`// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}`}
            />
          </section>
        </div>
      </div>
    </section>
  );
}
