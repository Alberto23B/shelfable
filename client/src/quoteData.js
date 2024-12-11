const quoteData = [
  "Today a reader, tomorrow a leader. – Margaret Fuller",
  "A word after a word after a word is power. – Margaret Atwood",
  "Show me a family of readers, and I will show you the people who move the world. – Napoleon Bonaparte",
  "A book is a garden, an orchard, a storehouse, a party, a company by the way, a counselor, a multitude of counselors. – Charles Baudelaire",
  "I think books are like people, in the sense that they’ll turn up in your life when you most need them. – Emma Thompson",
  "Books are a uniquely portable magic. – Stephen King",
  "Books are mirrors: You only see in them what you already have inside you. – Carlos Ruiz Zafón",
  "Let’s be reasonable and add an eighth day to the week that is devoted exclusively to reading. – Lena Dunham",
  "If you don’t like to read, you haven’t found the right book. – J.K. Rowling",
  "I can feel infinitely alive curled up on the sofa reading a book. – Benedict Cumberbatch",
  "Some books leave us free and some books make us free. – Ralph Waldo Emerson",
  "There is no Frigate like a Book To take us Lands away. - Emily Dickinson",
  "I guess there are never enough books. - John Steinbeck",
  "The man who does not read good books is no better than the man who can’t. - Mark Twain",
  "Make it a rule never to give a child a book you would not read yourself. - George Bernard Shaw",
];

export function getRandomQuote() {
  const index = Math.floor(Math.random() * quoteData.length);
  return quoteData[index];
}
