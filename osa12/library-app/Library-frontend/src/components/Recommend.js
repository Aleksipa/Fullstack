import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS_AND_ALL_AUTHORS, ME } from "../queries";

const Recommend = ({ show }) => {
  const { data: meData } = useQuery(ME);

  const favoriteGenre = meData?.me?.favoriteGenre;

  const { data, loading, error, refetch } = useQuery(
    ALL_BOOKS_AND_ALL_AUTHORS,
    {
      variables: { genre: favoriteGenre },
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  const filteredBooks = data?.allBooks;

  if (!show) {
    return null;
  }

  if (loading) return <div>Loading</div>;
  if (error) return <div>error</div>;

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
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
    </div>
  );
};

export default Recommend;
