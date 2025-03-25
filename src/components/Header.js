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
