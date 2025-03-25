// layout.js
// Global layout used as a fallback for all routes.
// Must include an element with id "page-content" where the page component is mounted.

import { Peachy } from '@peach/component';
import Header from "@components/Header";


export default function Layout() {
  return (
    <div className="layout bg-gray-900 text-slate-100
     flex flex-col w-full min-h-screen relative">
      <Header/>
      <main id="page-content"></main>
      <footer>© 2025 Peachy Framework Example</footer>
    </div>
  );
}
