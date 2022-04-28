import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery, useApolloClient } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";

const App = () => {
  const client = useApolloClient();
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const authorResults = useQuery(ALL_AUTHORS);
  const bookResults = useQuery(ALL_BOOKS);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (authorResults.loading || bookResults.loading) {
    return <div>loading...</div>;
  }

  const Notify = ({ errorMessage }) => {
    if (!errorMessage) {
      return null;
    }
    return <div style={{ color: "red" }}>{errorMessage}</div>;
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logOut = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logOut}>logout</button>
          </>
        )}
        <button onClick={() => setPage("recommend")}>recommend</button>
        {!token && <button onClick={() => setPage("login")}>login</button>}
      </div>
      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === "authors"}
        authors={authorResults.data.allAuthors}
      />

      <Books show={page === "books"} books={bookResults.data.allBooks} />

      <NewBook show={page === "add"} />

      <Recommend show={page === "recommend"} />

      <LoginForm
        setToken={setToken}
        setError={notify}
        show={page === "login"}
      />
    </div>
  );
};

export default App;
