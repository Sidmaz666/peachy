// layout.js
// Global layout used as a fallback for all routes.
// Must include an element with id "page-content" where the page component is mounted.

import { Peachy } from '@peach/component';
import Header from "@components/Header";
import Footer from '@components/Footer';



export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="page-content"></main>
      <Footer /> 
    </div>
  );
}
