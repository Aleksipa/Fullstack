import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const authorResults = useQuery(ALL_AUTHORS);
  const bookResults = useQuery(ALL_BOOKS);

  if (authorResults.loading || bookResults.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors
        show={page === "authors"}
        authors={authorResults.data.allAuthors}
      />

      <Books show={page === "books"} books={bookResults.data.allBooks} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
