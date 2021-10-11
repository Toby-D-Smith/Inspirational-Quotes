import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Quote from "./components/Quote/Quote";
import Refresh from "./components/Refresh/Refresh";
import Newquote from "./components/Newquote/Newquote";
import Line from "./components/Line/Line";
import Title from "./components/Title/Title";

function App() {
  const [currentQuote, setCurrentQuote] = useState();
  const [dadJoke, setDadJoke] = useState();
  const [quote, setQuote] = useState();
  const [allQuotes, setAllQuotes] = useState([""]);
  const [isJoke, setIsJoke] = useState(false);

  async function getQuotes() {
    const res = await axios.get(`/api/quotes`);
    setAllQuotes(res.data.quote.map((quoteObject) => quoteObject.quote));
    setCurrentQuote(quote);
  }
  console.log(allQuotes, quote);
  useEffect(() => {
    getQuotes();
  }, []);
  useEffect(() => {
    getNewQuote();
    setCurrentQuote(quote);
  }, [allQuotes]);
  //Selects a new quote that is different to the last one
  function getNewQuote() {
    let isSameQuote = true;
    while (isSameQuote && allQuotes.length >= 2) {
      let newQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
      if (newQuote !== quote) {
        isSameQuote = false;
        setQuote(newQuote);
      }
    }
  }
  //Fetches a Dad Joke from an API
  useEffect(() => {
    async function getJoke() {
      const responce = await fetch("https://icanhazdadjoke.com/slack");
      const dadJokeObject = await responce.json();
      const dadJoke = dadJokeObject.attachments[0].text;
      setDadJoke(dadJoke);
    }
    getJoke();
  }, [quote]);

  function updateQuote() {
    if (isJoke) {
      getNewQuote();
      setCurrentQuote(quote);
    } else {
      setCurrentQuote(dadJoke);
    }
    setIsJoke(!isJoke);
  }
  return (
    <div className="App">
      <Title></Title>
      <Quote quote={currentQuote}></Quote>
      <Refresh updateQuote={updateQuote}></Refresh>
      <Line></Line>
      <Newquote setCurrentQuote={setCurrentQuote}></Newquote>
    </div>
  );
}

export default App;
