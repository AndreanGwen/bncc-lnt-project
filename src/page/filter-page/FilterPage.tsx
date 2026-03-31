"use client";
import Navbar from "@/common/navbar/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { CgDetailsMore } from "react-icons/cg";
import { IoSearchOutline } from "react-icons/io5";

export default function FilterPage() {
  const router = useRouter();
  return (
    <div className="bg-[#f8f8fa]">
      <Navbar
        home="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        search="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        filter="text-white bg-black hover:bg-black/70 hover:scale-110 transition"
        detail="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        about="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full min-h-screen flex items-center justify-center gap-4"
      >
        <Card
          className="hover:bg-black/5"
          onClick={() => router.push("/search-filter")}
        >
          <CardContent className="md:w-60 md:h-20 w-40 h-10 text-xs md:text-sm flex justify-center items-center cursor-pointer gap-2">
            <IoSearchOutline size={20} />
            <span>Filter Search</span>
          </CardContent>
        </Card>

        <Card
          className="hover:bg-black/5"
          onClick={() => router.push("/detail")}
        >
          <CardContent
            className="md:w-60 md:h-20 w-40 h-10 text-xs md:text-sm flex justify-center items-center cursor-pointer gap-2
          "
          >
            <CgDetailsMore size={20} />
            <span>Detail Filter</span>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
