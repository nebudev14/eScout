import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:text-white">
      <h1 className="mb-2 text-3xl">404 - Page not Found</h1>
      <Link
        className="text-xl duration-150 hover:underline hover:text-pink-600"
        href="/teams"
      >
        Go back?
      </Link>
    </div>
  );
}
