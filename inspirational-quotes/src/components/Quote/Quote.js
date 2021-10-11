import React, { useState } from "react";
import "./Quote.css";

const Quote = ({ quote }) => {
  return (
    <article>
      <h3>{quote}</h3>
    </article>
  );
};

export default Quote;
