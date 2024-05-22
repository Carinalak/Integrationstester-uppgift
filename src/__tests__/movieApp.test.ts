/*

//import { IMovie } from "../ts/models/Movie";
import { handleSubmit } from "../ts/movieApp";

describe("main tests", () => {
    test("Handles an input text and checks the container is empty", () => {
        // Assign Vad som ska göras:
		// Behöver en text och en lista

        let searchText: string = "hello";
        //let movies: IMovie[] = [];
        //document.body.innerHTML = `<ul id="container"></ul>`;
        


        // Act Funktionen som gör det. Anropa den:
        handleSubmit();
      

        // Assert
        //expect(movies).toHaveLength(1);
        //expect(movies[0].Title).toBe(searchText);
        expect(handleSubmit).toHaveBeenCalledWith(searchText);

    });


});

*/








import { handleSubmit } from "../ts/movieApp";
import { getData } from "../ts/services/movieService";

describe("main tests", () => {

    beforeEach(() => {
        document.body.innerHTML = `
          <input id="searchText" value="hello" />
          <div id="movie-container"></div>
        `;
      });

    test("Handles an input text and checks the container is empty", () => {
        // Assign Vad som ska göras:
		// Tar emot en text från inputfältet
        let searchText = "hello";
        const container = document.getElementById("movie-container") as HTMLDivElement;
        

        // Act Funktionen som gör det:
        handleSubmit(); 
        

        // Assert

        
        expect(getData).toHaveBeenCalledWith(searchText, container);
        expect(container.innerHTML).toBe(""); // Kontrollera att container är tömd
    })
})

