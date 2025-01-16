import { useState, useEffect } from "react";
import { getRandomQuote } from "../quoteData";

function Quote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  return (
    <p className="relative z-0 w-2/3 py-4 text-xs italic text-center h-fit md:py-0 sm:my-6 sm:text-base">
      {quote}
    </p>
  );
}

export default Quote;
