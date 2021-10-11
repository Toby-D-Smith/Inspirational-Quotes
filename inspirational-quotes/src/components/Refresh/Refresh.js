import React from "react";
import "./Refresh.css";

const Refresh = ({ updateQuote }) => {
  return (
    <div>
      <button onClick={updateQuote} className="refresh-button">
        Refresh
      </button>
    </div>
  );
};

export default Refresh;
