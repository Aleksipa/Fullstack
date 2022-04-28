import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = ({ books, show }) => {
  const [filterGenre, setFilterGenre] = useState("");
  const { data, loading, error, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: filterGenre },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const filteredBooks = data?.allBooks;

  const uniqueGenres = books.reduce((acc, book) => {
    if (!acc.includes(book.genres[0]) && book.genres[0] !== undefined) {
      acc.push(book.genres[0]);
    }
    return acc;
  }, []);

  if (!show) {
    return null;
  }

  if (loading) return <div>Loading</div>;
  if (error) return <div>error</div>;

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{filterGenre ? filterGenre : "all"}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {uniqueGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => {
              setFilterGenre(genre);
            }}
          >
            {genre}
          </button>
        ))}
        <button onClick={() => setFilterGenre("")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
