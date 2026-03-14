import { FaGlobeAmericas } from "react-icons/fa";
import { motion } from "motion/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar({ home, search, detail, filter, about }: any) {
  const frameworks = [
    {
      value: "/",
      label: "Home",
    },
    {
      value: "/search",
      label: "Search",
    },
    {
      value: "/detail",
      label: "Detail",
    },
    {
      value: "/filter",
      label: "Filter",
    },
    {
      value: "/about",
      label: "About",
    },
  ];

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();

  return (
    <>
      <motion.div
        className={`w-full md:h-20 h-14 flex justify-between items-center pr-7 pl-7 fixed z-10 backdrop-blur-xs border-b`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <a className={`flex items-center gap-2 w-fit h-fit`} href={`/`}>
          <div
            className={`h-9 w-9 hidden bg-black md:flex justify-center items-center rounded-full`}
          >
            <FaGlobeAmericas color={`#ffffff`} size={25} />
          </div>
          <h1 className={`font-bold text-[18px]`}>World University</h1>
        </a>

        <div
          className={`bg-white md:flex gap-2 pt-1 pb-1 pr-2 pl-2 w-fit h-fit rounded-full shadow  hidden`}
        >
          <a
            href="/"
            className={`${home}  w-20 h-10 flex justify-center items-center rounded-full`}
          >
            Home
          </a>
          <a
            href="/search"
            className={`${search} w-20 h-10 flex justify-center items-center rounded-full`}
          >
            Search
          </a>
          <a
            href="/detail"
            className={`${detail} w-20 h-10 flex justify-center items-center rounded-full`}
          >
            Detail
          </a>
          <a
            href="/filter"
            className={`${filter} w-20 h-10 flex justify-center items-center rounded-full`}
          >
            Filter
          </a>
          <a
            href="/about"
            className={`${about} w-20 h-10 flex justify-center items-center rounded-full`}
          >
            About
          </a>
        </div>

        <div className="md:hidden">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-35 h-8 px-2 text-xs justify-between"
              >
                {value
                  ? frameworks.find((f) => f.value === value)?.label
                  : "Home"}
                <ChevronsUpDown className="h-3 w-3 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-35 p-0">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        className="text-xs"
                        onSelect={(currentValue) => {
                          setValue(currentValue);
                          setOpen(false);
                          router.push(framework.value);
                        }}
                      >
                        {framework.label}
                        <Check
                          className={cn(
                            "ml-auto h-3 w-3",
                            value === framework.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </motion.div>
    </>
  );
}
