import axios from "axios";
import { getData } from "./movieService";
import { IOmdbResponse } from "./../models/IOmdbResponse";
import { IMovie } from "./../models/Movie";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getData function", () => {
  test("should fetch movies based on search text", async () => {
    // Assign
    const searchText = "hello";
    const mockMovies: IMovie[] = [
      { imdbID: "1", Title: "A Movie", Year: "2011", Type: "movie", Poster: "url1" }
    ];
    const mockResponse: IOmdbResponse = { Search: mockMovies };
    mockedAxios.get.mockResolvedValue({ data: mockResponse });

    // Act
    const movies = await getData(searchText);

    // Assert
    expect(movies).toEqual(mockMovies);
    expect(mockedAxios.get).toHaveBeenCalledWith(`http://omdbapi.com/?apikey=416ed51a&s=${searchText}`);
  });

  test("should return an empty array when no movies are found", async () => {
    // Assign
    const searchText = "hello";
    const mockResponse: IOmdbResponse = { Search: [] };
    mockedAxios.get.mockResolvedValue({ data: mockResponse });

    // Act
    const movies = await getData(searchText);

    // Assert
    expect(movies).toEqual([]);
  });

  test("should return an empty array when an error occurs", async () => {
    // Assign
    const searchText = "hello";
    mockedAxios.get.mockRejectedValue(new Error("Failed to fetch data"));

    // Act
    const movies = await getData(searchText);

    // Assert
    expect(movies).toEqual([]);
  });
});
