import axios from "axios";

interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

interface ValidationError {
  data: string;
}

const baseUrl = "http://localhost:3000/api/diaries";

async function getAllDiaries(): Promise<Diary[]> {
  try {
    const response = await axios.get<Diary[]>(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching diaries:", error);
    throw error;
  }
}

async function addDiary(newDiary: Omit<Diary, "id">): Promise<Diary> {
  try {
    const response = await axios.post<Diary>(baseUrl, newDiary);
    return response.data;
  } catch (error) {
    console.error("Error adding diary:", error);
    if (axios.isAxiosError<ValidationError>(error)) {
      if (error.response?.data) {
        throw new Error(JSON.stringify(error.response.data));
      }
    }
    throw new Error("An unexpected error occurred");
  }
}

export { getAllDiaries, addDiary };
export type { Diary };
