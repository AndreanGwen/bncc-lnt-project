"use client";
import Navbar from "@/common/navbar/Navbar";
import { motion } from "motion/react";

export default function AboutPage() {
  return (
    <>
      <Navbar
        home="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        search="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        detail="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        filter="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        about="text-white bg-black hover:bg-black/70 hover:scale-110 transition"
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full min-h-screen flex items-center justify-center flex-col gap-4 px-6 text-center"
      >
        <h1 className="text-4xl font-semibold">About This Website</h1>

        <p className="text-lg text-gray-600 max-w-2xl">
          This website is a country search platform that allows users to explore
          information about countries around the world, including details such
          as region, population, languages, currencies, and more.
        </p>

        <p className="text-lg text-gray-600 max-w-2xl">
          It is built using <span className="font-semibold">React</span> with{" "}
          <span className="font-semibold">Next.js</span> to provide a fast,
          responsive, and modern web experience.
        </p>
      </motion.div>
    </>
  );
}
