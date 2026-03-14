export default function FooterHome() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 ">
      <div className="max-w-7xl mx-auto px-7 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <h1 className="text-xl font-semibold text-white">World University</h1>
          <p className="text-sm text-gray-400 mt-3 leading-relaxed">
            Discover countries around the world with ease. Explore detailed
            information such as capitals, languages, population statistics, and
            national symbols through an interactive experience.
          </p>
        </div>

        <div>
          <h2 className="text-white font-semibold mb-4">Navigation</h2>
          <ul className="flex flex-col gap-2 text-sm">
            <a className="hover:text-white cursor-pointer" href="/">
              Home
            </a>
            <a className="hover:text-white cursor-pointer" href="search">
              Search Country
            </a>
            <a className="hover:text-white cursor-pointer" href="detail">
              Country Details
            </a>
            <a className="hover:text-white cursor-pointer" href="/about">
              About
            </a>
          </ul>
        </div>

        <div>
          <h2 className="text-white font-semibold mb-4">Contact</h2>
          <ul className="flex flex-col gap-2 text-sm text-gray-400">
            <li>Email: worlduniversity.com</li>
            <li>Location: Indonesia</li>
            <li>Made with React and NextJS</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} World University. All rights reserved.
      </div>
    </footer>
  );
}
