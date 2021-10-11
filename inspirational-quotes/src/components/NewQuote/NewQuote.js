import React, { useState } from "react";
import axios from "axios";
import "./NewQuote.css";

const Newquote = ({ setCurrentQuote }) => {
  const [newQuote, setNewQuote] = useState({
    quote: "",
    message: "",
  });
  async function register(event) {
    event.preventDefault();
    setCurrentQuote(newQuote.quote);
    const body = JSON.stringify({
      quote: newQuote.quote,
    });

    const responce = await axios.post("/api/newquote", body, {
      headers: {
        "Content-Type": `application/json`,
      },
    });
    console.log(responce);
    setNewQuote({
      ...newQuote,
      message: responce.data.message,
    });
  }
  return (
    <section>
      <form className="flex" onSubmit={register}>
        <textarea
          name="quote"
          placeholder="Add a new quote..."
          rows="3"
          cols="40"
          onChange={(e) => setNewQuote({ ...newQuote, quote: e.target.value })}
          required
        ></textarea>
        <button className="submit-button" type="submit">
          Add New Quote
        </button>
        {newQuote.message ? <h3>{newQuote.message}</h3> : null}
      </form>
    </section>
  );
};

export default Newquote;
