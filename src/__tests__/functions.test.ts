import { movieSort } from "../ts/functions";
import { IMovie } from "../ts/models/Movie";

describe("movieSort function", () => {
    test("should sort movies in ascending order when desc is true", () => {
        // Assign: skapa en osorterad lista med filmer
        const movies: IMovie[] = [
            { imdbID: "1", Title: "C Movie", Year: "2011", Type: "movie", Poster: "url1" },
            { imdbID: "2", Title: "A Movie", Year: "2012", Type: "movie", Poster: "url2" },
            { imdbID: "3", Title: "B Movie", Year: "2013", Type: "movie", Poster: "url3" }
        ];
        const desc = true;

        // Act: anropa movieSort-funktionen
        const sortedMovies = movieSort(movies, desc);

        // Assert: kontrollera att filmerna är i stigande ordning
        expect(sortedMovies).toEqual([
            { imdbID: "2", Title: "A Movie", Year: "2012", Type: "movie", Poster: "url2" },
            { imdbID: "3", Title: "B Movie", Year: "2013", Type: "movie", Poster: "url3" },
            { imdbID: "1", Title: "C Movie", Year: "2011", Type: "movie", Poster: "url1" }
        ]);
    });

    test("should sort movies in descending order when desc is false", () => {
        // Assign: skapa en osorterad lista med filmer
        const movies: IMovie[] = [
            { imdbID: "1", Title: "C Movie", Year: "2011", Type: "movie", Poster: "url1" },
            { imdbID: "2", Title: "A Movie", Year: "2012", Type: "movie", Poster: "url2" },
            { imdbID: "3", Title: "B Movie", Year: "2013", Type: "movie", Poster: "url3" }
        ];
        const desc = false;

        // Act: anropa movieSort-funktionen
        const sortedMovies = movieSort(movies, desc);

        // Assert: kontrollera att filmerna är i fallande ordning
        expect(sortedMovies).toEqual([
            { imdbID: "1", Title: "C Movie", Year: "2011", Type: "movie", Poster: "url1" },
            { imdbID: "3", Title: "B Movie", Year: "2013", Type: "movie", Poster: "url3" },
            { imdbID: "2", Title: "A Movie", Year: "2012", Type: "movie", Poster: "url2" }
        ]);
    });

    test("should handle an empty list", () => {
        // Assign: skapa en tom lista
        const movies: IMovie[] = [];

        // Act: anropa movieSort-funktionen
        const sortedMovies = movieSort(movies);

        // Assert: kontrollera att den returnerade listan är tom
        expect(sortedMovies).toEqual([]);
    });

    test("should handle one movie in the list", () => {
        // Assign: skapa en lista med en film
        const movies: IMovie[] = [{ imdbID: "1", Title: "A Movie", Year: "2011", Type: "movie", Poster: "url1" }];

        // Act: anropa movieSort-funktionen
        const sortedMovies = movieSort(movies);

        // Assert: kontrollera att den returnerade listan innehåller samma enda film
        expect(sortedMovies).toEqual([{ imdbID: "1", Title: "A Movie", Year: "2011", Type: "movie", Poster: "url1" }]);
    });
    test("should handle movies with the same title", () => {
        const movies: IMovie[] = [
            { imdbID: "1", Title: "Same Title", Year: "2011", Type: "movie", Poster: "url1" },
            { imdbID: "2", Title: "Same Title", Year: "2012", Type: "movie", Poster: "url2" },
            { imdbID: "3", Title: "Same Title", Year: "2013", Type: "movie", Poster: "url3" }
        ];
        const sortedMovies = movieSort(movies);
        expect(sortedMovies).toEqual([
            { imdbID: "1", Title: "Same Title", Year: "2011", Type: "movie", Poster: "url1" },
            { imdbID: "2", Title: "Same Title", Year: "2012", Type: "movie", Poster: "url2" },
            { imdbID: "3", Title: "Same Title", Year: "2013", Type: "movie", Poster: "url3" }
        ]);
    });
});
