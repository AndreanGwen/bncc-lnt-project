"use client";
import Navbar from "@/common/navbar/Navbar";

export default function SearchPage() {
  return (
    <div className={`w-full min-h-screen`}>
      <Navbar
        home="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        search="text-white bg-black hover:bg-black/70 hover:scale-110 transition"
        detail="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        filter="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        about="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
      />
    </div>
  );
}
