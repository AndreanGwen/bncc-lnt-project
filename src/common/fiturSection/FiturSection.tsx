import { IoIosSearch, IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineTouchApp } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { motion } from "motion/react";

export default function FiturSection() {
  const data = [
    {
      icon: <IoIosSearch size={40} />,
      title: "Search Countries",
      desc: "Quickly find any country in the world using our fast and responsive search system.",
    },
    {
      icon: <TbListDetails size={40} />,
      title: "Detailed Information",
      desc: "Explore important country data including capital, language, and population.",
    },
    {
      icon: <MdOutlineTouchApp size={40} />,
      title: "Interactive Map",
      desc: "Click on the world map to instantly discover and navigate to countries.",
    },
    {
      icon: <IoMdInformationCircleOutline size={40} />,
      title: "Comprehensive Insights",
      desc: "Learn more about countries with simple and easy-to-understand information.",
    },
  ];

  return (
    <div className="w-full h-fit pt-24 px-7 pb-24">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h1 className="text-3xl font-semibold">Our Features</h1>
        <p className="text-gray-500 pt-2">
          Discover powerful tools designed to help you explore countries around
          the world with ease.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
        {data.map((item, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-2xl shadow p-8 text-center transition hover:shadow-xl hover:-translate-y-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Icon */}
            <div className="flex justify-center items-center w-16 h-16 mx-auto bg-gray-100 rounded-xl text-blue-600">
              {item.icon}
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold pt-5">{item.title}</h2>

            {/* Description */}
            <p className="text-gray-500 text-sm pt-3">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
