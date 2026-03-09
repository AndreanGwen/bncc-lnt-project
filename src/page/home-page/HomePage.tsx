import Navbar from "@/common/navbar/Navbar";

export default function HomePage() {
  return (
    <div className={`w-full min-h-screen bg-[#f8f8fa]`}>
      <Navbar
        home="text-white bg-black hover:bg-black/70 hover:scale-110 transition"
        search="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        detail="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        filter="text-black bg-white hover:bg-black/1 hover:scale-110 transition"
        about="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
      />
    </div>
  );
}
