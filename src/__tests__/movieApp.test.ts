import { displayNoResult, handleSubmit } from "../ts/movieApp";
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

    
});




