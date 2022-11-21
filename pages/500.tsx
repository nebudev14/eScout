export default function ServerError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:text-white">
      <h1 className="mb-2 text-3xl">500 - Server-side error occurred</h1>
      <a
        className="text-xl duration-150 hover:underline hover:text-pink-600"
        href="/teams"
      >
        Go back?
      </a>
    </div>
  );
}
