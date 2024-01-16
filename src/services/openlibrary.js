import axios from 'axios';
import { OPENLIBRARY_BASE_URL } from "../constants/openlibrary";

export const queryBooks = async (queryParams) => {
  return await axios.get(
    `${OPENLIBRARY_BASE_URL}?q=${queryParams.query}&page=${queryParams.page}&limit=10&sort=${queryParams.sort}`
  )
  .then(books => books.data)
  .catch((error) => {
    console.log(error);
  })
}