// src/app/blog/[id]/page.js
import { useState, Peachy } from "@peach/component";
import { AppState } from "@peach/state";
import { useFetch } from "@peach/fetch";
import CodeBlock from "@components/CodeBlock";

export default function BlogPostPage({ params }) {
  const { id } = params;
  const [loading, response, error] = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  // Component-level reactive state example.
  const [getLikes, setLikes] = useState(0);

  // Update global state.
  AppState.set("lastVisited", `Blog Post ${id}`);

  return (
    <div className="py-24 min-h-screen">
      <div className="container mx-auto max-w-3xl p-6 rounded-lg shadow-lg border border-border bg-card">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Loading blog post...</p>
          </div>
        ) : error && !response ? (
          <div className="text-center py-12">
            <p className="text-lg text-red-600">Failed to load blog post.</p>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-4">Example Blog Post #{id}</h2>
            <h3 className="text-xl font-bold mb-4">Title {response?.title}</h3>
            <p className="text-muted-foreground mb-6">
              {response && response.body
                ? response.body
                : `This is the blog post with id ${id}.`}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground/80">Likes: {getLikes}</p>
              <button
                onClick={() => setLikes(getLikes + 1)}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
              >
                Like
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto max-w-6xl p-6 mt-6">
        <h3 className="text-xl font-semibold mt-6 mb-2">Example Code</h3>
        <p className="mb-4">
          The following is the code of this page. It demonstrates how to use dynamic routing, extract params and fetch data from an API.
        </p>

        <CodeBlock
          language="jsx"
          code={`// src/app/blog/[id]/page.js
import { useState, Peachy } from "@peach/component";
import { AppState } from "@peach/state";
import { useFetch } from "@peach/fetch";
import CodeBlock from "@components/CodeBlock";

export default function BlogPostPage({ params }) {
  const { id } = params;
  const [loading, response, error] = useFetch(
    `+`https://jsonplaceholder.typicode.com/posts/${id}`+`
  );

  // Component-level reactive state example.
  const [getLikes, setLikes] = useState(0);

  // Update global state.
  AppState.set("lastVisited", `+`Blog Post ${id}`+`);

  return (
    <div className="py-24 min-h-screen">
      <div className="container mx-auto max-w-3xl p-6 rounded-lg shadow-lg border border-border bg-card">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Loading blog post...</p>
          </div>
        ) : error && !response ? (
          <div className="text-center py-12">
            <p className="text-lg text-red-600">Failed to load blog post.</p>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-4">Example Blog Post #{id}</h2>
            <h3 className="text-xl font-bold mb-4">Title {response?.title}</h3>
            <p className="text-muted-foreground mb-6">
              {response && response.body
                ? response.body
                : `+`This is the blog post with id ${id}.`+`}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground/80">Likes: {getLikes}</p>
              <button
                onClick={() => setLikes(getLikes + 1)}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
              >
                Like
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`}
        />
      </div>
    </div>
  );
}
