import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Quote from "../Quote/Quote";
import Title from "../Title/Title";
import Refresh from "../Refresh/Refresh";
import Line from "../Line/Line";
import NewQuote from "../NewQuote/NewQuote";
function App() {
  const [currentQuote, setCurrentQuote] = useState();
  const [allQuotes, setAllQuotes] = useState([""]);

  async function getQuotes() {
    const res = await axios.get(`/api/quotes`);
    setAllQuotes(res.data.quote.map((quoteObject) => quoteObject.quote));
  }
  useEffect(() => {
    getQuotes();
  }, []);

  useEffect(() => {
    getNewQuote();
    console.log("New Quote on Load!", currentQuote);
  }, [allQuotes]);
  //Selects a new quote that is different to the last one
  function getNewQuote() {
    let isSameQuote = true;
    while (isSameQuote && allQuotes.length >= 2) {
      let newQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
      if (newQuote !== currentQuote) {
        isSameQuote = false;
        setCurrentQuote(newQuote);
      }
    }
  }
  console.log(currentQuote);
  return (
    <div className="App">
      <Title></Title>
      <Quote quote={currentQuote}></Quote>
      <Refresh updateQuote={getNewQuote}></Refresh>
      <Line></Line>
      <NewQuote setCurrentQuote={setCurrentQuote} getQuotes={getQuotes}></NewQuote>
    </div>
  );
}

export default App;
