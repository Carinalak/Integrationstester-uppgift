import { movieSort } from "../ts/movieFunctions";
import { IMovie } from "../ts/models/Movie";
//import * as functions from "../ts/movieFunctions";
import * as movieFunctions from "../ts/movieFunctions";

describe("main tests", () => {
    let mockedMovieSort: jest.SpyInstance<void>;
    //let mockedIMovie: jest.SpyInstance<void>;
    //let mockedDesc: jest.SpyInstance<void>;

    beforeEach(() => {
        mockedMovieSort = jest.spyOn(movieFunctions, "movieSort");
        //mockedIMovie = jest.spyOn(Movie, "IMovie");
        //mockedDesc = jest.spyOn(movieFunctions, "desc");
      });

      afterEach(() => {
       // mockedMovieSort.mockReset();
        mockedMovieSort.mockReset();
       // mockedDesc.mockReset();
    });

    test("Handles a list and a boolean", () => {
        // Assign Vad som ska göras:
	
        const movies: IMovie[] = [];
        const desc: boolean = true;
        
        mockedMovieSort.mockImplementation(() => {
            return { success: true, error: "" };
        });
        mockedMovieSort.mockImplementation(() => {
            return { movies }
        });

        // Act Funktionen som gör det:
        movieSort(movies, desc); 

        // Assert
        expect(mockedMovieSort).toHaveBeenCalled();
        
    })
})
