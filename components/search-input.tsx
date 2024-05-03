"use client";
import { useSearch } from "@/contexts/search.context";
import { useEffect, useLayoutEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation"; //SImon Code

const SearchInput = () => {
  const { isSearchOverlayOpen, setIsSearchOverlayOpen } = useSearch();
  const ref = useRef<HTMLInputElement>(null); // Specify HTMLInputElement type for ref

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Ensure you prevent the default form behavior
    const searchQuery = inputRef.current?.value; // Safe access to the current input value
    router.push("/search"); // Navigate to the search page
    setIsSearchOverlayOpen(false); // Close the search overlay
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsSearchOverlayOpen(false);
      }
    };

    if (isSearchOverlayOpen) {
      document.body.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOverlayOpen, setIsSearchOverlayOpen]);

  useLayoutEffect(() => {
    if (isSearchOverlayOpen && ref.current) {
      ref.current.focus();
    }
  }, [isSearchOverlayOpen]);

  if (!isSearchOverlayOpen) {
    return null; // If search overlay is not open, return null to render nothing
  }

  return (
    <form
      onSubmit={handleSearch}
      className="fixed z-50 h-screen w-screen bg-black bg-opacity-10 flex justify-center items-start pt-64 backdrop-blur-sm"
    >
      <div className="relative p-4 w-1/3 h-12 rounded-full bg-gray-100 flex justify-between items-center">
        <input
          ref={inputRef}
          placeholder="Search for a paper, author, or journal..."
          type="text"
          className="w-full appearance-none bg-gray-100 focus:appearance-none"
        />
        <button type="submit" className="absolute right-6">
          <CiSearch size={25} />
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
