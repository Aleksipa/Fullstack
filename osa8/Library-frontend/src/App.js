import { useEffect, useState } from "react";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { ALL_BOOKS_AND_ALL_AUTHORS, BOOK_ADDED } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  const uniqById = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.id;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, (data) => {
    const authorExists = data.allAuthors.find(
      (author) => author.id === addedBook.author.id
    );

    return {
      ...data,
      allBooks: uniqById([...data.allBooks, addedBook]),

      allAuthors: authorExists
        ? data.allAuthors.map((author) =>
            author.id === addedBook.author.id ? addedBook.author : author
          )
        : [...data.allAuthors, addedBook.author],
    };
  });
};

const App = () => {
  const client = useApolloClient();
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const [genre, setGenre] = useState("");
  const { data, loading } = useQuery(ALL_BOOKS_AND_ALL_AUTHORS, {
    variables: { genre },
  });

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      notify(`${addedBook.title} added to the library`);

      updateCache(
        client.cache,
        { query: ALL_BOOKS_AND_ALL_AUTHORS, variables: { genre } },
        addedBook
      );
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (loading) {
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

      <Authors show={page === "authors"} authors={data?.allAuthors} />

      <Books
        show={page === "books"}
        books={data?.allBooks}
        filterGenre={genre}
        setFilterGenre={setGenre}
        genres={data?.allGenres}
      />

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
