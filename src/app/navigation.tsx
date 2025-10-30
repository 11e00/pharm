"use client";

import React, { useState,useEffect } from "react";
import { usePathname,useRouter } from "next/navigation";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconArchive,
  IconInfoCircle,
  IconPhone,
  IconShoppingCart,
  IconUserCircle,
  IconSearch,
} from "@tabler/icons-react";
import { Search } from "@/app/db"; // ✅ your existing Search function

import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence
} from "motion/react";


export default function Navbar() {
  const pathname = usePathname();
    const router = useRouter();

const handleSearch = (q: string) => {
  setShowSearch(false); // triggers AnimatePresence exit animation
  setTimeout(() => Search(q), 200); // delay the redirect slightly to see animation
};
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    setShowSearch(false);
  }, [pathname]);
  const links = [
    {
      title: "Home",
      href: "/",
      icon: (
        <IconHome
          className={
            "h-full w-full " +
            (pathname === "/"
              ? "text-green-500"
              : "text-neutral-500 dark:text-neutral-300")
          }
        />
      ),
    },
    {
      title: "Categories",
      href: "/categories",
      icon: (
        <IconArchive
          className={
            "h-full w-full " +
            (pathname.startsWith("/categories")
              ? "text-green-500"
              : "text-neutral-500 dark:text-neutral-300")
          }
        />
      ),
    },
    {
      title: "Cart",
      href: "/cart",
      icon: (
        <IconShoppingCart
          className={
            "h-full w-full " +
            (pathname === "/cart"
              ? "text-green-500"
              : "text-neutral-500 dark:text-neutral-300")
          }
        />
      ),
    },
    {
      title: "Account",
      href: "/account/profile",
      icon: (
        <IconUserCircle
          className={
            "h-full w-full " +
            (pathname.startsWith("/account")
              ? "text-green-500"
              : "text-neutral-500 dark:text-neutral-300")
          }
        />
      ),
    },
    {
    title: "Search",
    href: "#", // stays here so it's clickable
    icon: (
        <IconSearch
        className={
            "h-full w-full cursor-pointer " +
            (showSearch
            ? "text-green-500" // highlight when active
            : "text-neutral-500 dark:text-neutral-300")
        }
        onClick={(e) => {
            e.preventDefault(); // prevent "#" jump
            setShowSearch((prev) => !prev);
        }}
        />
    ),
    }
  ];

  return (
    <div className="fixed inset-x-0 bottom-2 z-20 flex flex-col items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* search dock (pops above) */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              key="searchDock"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-full mb-5 w-full flex justify-center"
            >
                    <div className="flex w-full max-w-lg items-center justify-center rounded-2xl p-0.5 dark:bg-neutral-800">

      <form
        className="flex w-full max-w-lg items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
      >
        <input
          type="text"
          name="search"
          placeholder="Search item"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
  className="flex-1 
    border-b-3 border-green-500 
    bg-transparent 
    text-center
    text-gray-900
    text-shadow-xs
    placeholder-gray-800 
    bg-radial-[at_50%_100%] from-green-300 to-transparent to-75%    dark:from-black dark:to-transparent
    focus:outline-none focus:border-black
    dark:text-white dark:border-white dark:placeholder-white
  "        />
        

        
      </form>
      </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* main nav */}
        <FloatingDock items={links} />
      </div>
    </div>
  );
}
