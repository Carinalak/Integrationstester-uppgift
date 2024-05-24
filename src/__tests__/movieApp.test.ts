import { IMovie } from "../ts/models/Movie";
import { createHtml, displayNoResult, handleSubmit, init } from "../ts/movieApp";
import { getData } from "../ts/services/movieService";

jest.mock("../ts/services/movieService");

describe("main tests", () => {
    beforeEach(() => {
        document.body.innerHTML = `
        <form id="searchForm">
        <input id="searchText" value="hello">
        </form>
        <div id="movie-container"></div>
        `;
    });

    
    test("init adds event listener to the form and calls handleSubmit on submit", () => {
  
        const handleSubmitMock = jest.fn();
        document.getElementById("searchForm")?.removeEventListener("submit", handleSubmit);
        document.getElementById("searchForm")?.addEventListener("submit", handleSubmitMock);

        // Assign
        init();

        // Act
        const form = document.getElementById("searchForm") as HTMLFormElement;
        const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);

        // Assert
        expect(handleSubmitMock).toHaveBeenCalled();
    });

    test("Handles an input text and checks the container is empty", async () => {
        // Assign
        let searchText = "hello";
        const container = document.getElementById("movie-container") as HTMLDivElement;
        const mockMovies = [{ Title: "A Movie", Poster: "url1" }];
        (getData as jest.Mock).mockResolvedValue(mockMovies);

        // Act
        await handleSubmit(); 

        // Assert
        expect(getData).toHaveBeenCalledWith(searchText); 
        expect(container.innerHTML).not.toEqual(""); 
    });

    
    test("Handles an input text and displays 'No results' message when no movies found", async () => {
        // Assign
        let searchText = "hello";
        const container = document.getElementById("movie-container") as HTMLDivElement;
        (getData as jest.Mock).mockResolvedValue([]);

        // Act
        await handleSubmit(); 

        // Assert
        expect(getData).toHaveBeenCalledWith(searchText); 
        expect(container.innerHTML).toContain("Inga sökresultat att visa"); 
    });
    
    test("Handles an input text and displays 'No results' message when an error occurs", async () => {
        // Assign
        let searchText = "hello";
        const container = document.getElementById("movie-container") as HTMLDivElement;
        (getData as jest.Mock).mockRejectedValue(new Error("Failed to fetch data"));

        // Act
        await handleSubmit(); 

        // Assert
        expect(getData).toHaveBeenCalledWith(searchText); 
        expect(container.innerHTML).toContain("Inga sökresultat att visa"); 
    });
    
    test("Adds 'No results' message to the container", () => {
        // Assign
        const container = document.createElement("div");

        // Act
        displayNoResult(container);

        // Assert
        expect(container.innerHTML).toContain("Inga sökresultat att visa");
    });
    test("Adds movie elements to the container", () => {
        // Assign
        const container = document.createElement("div");
        const movies: IMovie[] = [
            { imdbID: "1", Title: "C Movie", Year: "2011", Type: "movie", Poster: "url1" },
            { imdbID: "3", Title: "B Movie", Year: "2013", Type: "movie", Poster: "url3" },
            { imdbID: "2", Title: "A Movie", Year: "2012", Type: "movie", Poster: "url2" }
        ];

        // Act
        createHtml(movies, container);

        // Assert
        expect(container.children.length).toBe(movies.length);
        for (let i = 0; i < movies.length; i++) {
            const movieElement = container.children[i] as HTMLElement;
            expect(movieElement.classList.contains("movie")).toBe(true);
            expect(movieElement.getElementsByTagName("h3")[0].innerHTML).toContain(movies[i].Title);
            expect(movieElement.getElementsByTagName("img")[0].src).toContain(movies[i].Poster);
            expect(movieElement.getElementsByTagName("img")[0].alt).toContain(movies[i].Title);
        }
    });

});




