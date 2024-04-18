"use client";
import SearchButton from "@/components/search-button";
import SearchInput from "@/components/search-input";
import SideBar from "@/components/sidebar";
import { useSearch } from "@/contexts/search.context";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setIsSearchOverlayOpen } = useSearch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        event.preventDefault();
        setIsSearchOverlayOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsSearchOverlayOpen]);

  return (
    <>
      <SideBar />
      <SearchInput />
      <div className="ml-80 p-4 min-h-screen flex flex-col justify-start items-start">
        {children}
      </div>
    </>
  );
}
