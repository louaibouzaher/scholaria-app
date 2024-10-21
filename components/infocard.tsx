// components/InfoCard.tsx

import React from "react";

const InfoCard: React.FC = () => {
  return (
    <div className="fixed right-0 top-20 w-60 h-screen bg-white p-4 shadow-lg">
      <h2>Details Appear Here</h2>
      <p>This card is always visible on the right side.</p>
    </div>
  );
};

export default InfoCard;
