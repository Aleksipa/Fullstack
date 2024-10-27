import { useState, useEffect } from "react";
import "./App.css";
import { getAllDiaries, addDiary } from "./diaryService";
import { DiaryEntry, NewDiary, Weather, Visibility } from "./types";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiary>({
    date: "",
    weather: "sunny",
    visibility: "good",
    comment: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data as DiaryEntry[]);
    });
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewDiary({ ...newDiary, [name]: value });
  };

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const data = await addDiary(newDiary);
      setDiaries(diaries.concat(data as DiaryEntry));
      setNewDiary({
        date: "",
        weather: "sunny",
        visibility: "good",
        comment: "",
      });
      setError(null);
    } catch (err) {
      console.error("Error in diaryCreation:", err);
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const weatherOptions: Weather[] = [
    "sunny",
    "rainy",
    "cloudy",
    "stormy",
    "windy",
  ];
  const visibilityOptions: Visibility[] = ["great", "good", "ok", "poor"];

  return (
    <div className="App" style={{ textAlign: "left" }}>
      <h1>Diary entries</h1>
      <h2>Add new entry</h2>
      {error && (
        <div role="alert" style={{ color: "red" }}>
          <strong>Error: </strong>
          <span>{error}</span>
        </div>
      )}
      <form onSubmit={diaryCreation}>
        <div>
          <input
            type="date"
            name="date"
            value={newDiary.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <p>Weather:</p>
          {weatherOptions.map((option) => (
            <label key={option} className="mr-4">
              <input
                type="radio"
                name="weather"
                value={option}
                checked={newDiary.weather === option}
                onChange={handleInputChange}
                required
                className="mr-1"
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          ))}
        </div>
        <div>
          <p>Visibility:</p>
          {visibilityOptions.map((option) => (
            <label key={option} className="mr-4">
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={newDiary.visibility === option}
                onChange={handleInputChange}
                required
                className="mr-1"
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          ))}
        </div>
        <div>
          <textarea
            name="comment"
            value={newDiary.comment}
            onChange={handleInputChange}
            placeholder="Comment"
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>
      <div>
        <h2>Diary entries</h2>
        {diaries.map((diary) => (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <p>
              visibility: {diary.visibility}
              <br />
              weather: {diary.weather}
            </p>
            <br />
            {diary.comment}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
