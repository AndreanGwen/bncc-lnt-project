import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="pb-2">404 Not Found</p>
      <h1 className="md:text-5xl text-2xl font-semibold">
        Oops! Page Not Found
      </h1>
      <p className="md:pb-12 pb-7 pt-4 text-center text-sm md:text-[17px]">
        The page you are looking for doesn't exist. Click <br /> button below to
        go Home Page
      </p>

      <Link
        href="/"
        className="md:px-5 md:py-2 px-3 py-1 bg-black text-white rounded-lg hover:scale-105 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
