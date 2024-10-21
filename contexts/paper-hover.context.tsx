import React, { createContext, useContext, useState, ReactNode } from "react";

type PaperContextType = {
  hoveredPaper: any; // Define a more specific type based on your paper data structure
  setHoveredPaper: (paper: any) => void;
};

const PaperHoverContext = createContext<PaperContextType | undefined>(
  undefined
);

export const PaperHoverProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [hoveredPaper, setHoveredPaper] = useState(null);

  return (
    <PaperHoverContext.Provider value={{ hoveredPaper, setHoveredPaper }}>
      {children}
    </PaperHoverContext.Provider>
  );
};

export const usePaperHover = () => {
  const context = useContext(PaperHoverContext);
  if (context === undefined) {
    throw new Error("usePaperHover must be used within a PaperHoverProvider");
  }
  return context;
};
