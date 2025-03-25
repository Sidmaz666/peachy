// src/app/blog/[id]/page.js
import { useState, Peachy } from '@peach/component';
import { AppState } from '@peach/state';

export default function BlogPostPage({ params }) {
  // Example: extract the dynamic id parameter.
  const { id } = params;
  
  // Component-level reactive state example.
  const [getLikes, setLikes] = useState(0);
  
  // Update global state.
  AppState.set('lastVisited', `Blog Post ${id}`);
  
  return (
    <div className="blog-post">
      <h2>Blog Post #{id}</h2>
      <p>This is the blog post with id {id}.</p>
      <p>Likes: {String(getLikes)}</p>
      <button onClick={() => setLikes(getLikes + 1)}>
        Like
      </button>
    </div>
  );
}
