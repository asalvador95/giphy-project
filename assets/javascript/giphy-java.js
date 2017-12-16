// Initial array of disneyMovies
	var disneyMovies = ["The Goofy Movie", "Frozen", "Chip'n'Dale Rescue Rangers", "Lilo and Stitch", "Pirates of the Carribean", "Mulan", "Sword in the Stone", "The Nightmare Before Christmas", "The Incredibles", "Big Hero 6", "The Rescuers"];

// display displayDisneyMoviesGif function re-renders the HTML to display the appropriate content
	function displayDisneyMoviesGif () {
		var disneyMovies = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + disneyMovies + "&limit=10&api_key=RPxQK6gdY7RI33Zyt9U3jnUf9aZOocKu";
		console.log("Artist: " + disneyMovies);
		console.log("queryURL: " + queryURL);

// AJAX call for the specific button being clicked 
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

// div to hold all the gifs 
	dAll = $("<div>");

// For loop to append a button for each string in the array
	for (var i = 0; i < 10; i++) {

// div to hold the gif 
	dTag = $("<div class='gifs'>");

// Create div to hold and display the rating 
	dRating = $("<div>");
	dRating.append ("Rating:" + response.data[i].rating);

//Create div to hold and display the gif
	dGif = $("<div>");

	var image = $("<img class='gif' data-state='still'>");
		image.attr("src", response.data[i].images.fixed_height_still.url);
		image.attr("data-still", response.data[i].images.fixed_height_still.url);
		image.attr("data-animate", response.data[i].images.fixed_height.url)

	dGif.append(image)

			
//put the div dTag together
	dTag.append(dRating);
	dTag.append(dGif);
	dAll.append(dTag);

	}

		$("#gifDiv").html(dAll);

	}); // ends AJAX call

} // ends displaydisneyMoviesGif function


//Function to render buttons
	function renderButtons() {

//Empties the div
	$("#buttons-view").empty();

//Loops through the array of disneyMovies
	for (var i = 0; i < disneyMovies.length; i++) {
		var a = $("<button class='movies'>");
		a.attr("data-name", disneyMovies[i]);
		a.text(disneyMovies[i]);
		$("#buttons-view").append(a);
	}

} //end of renderButtons function


//Function for add disneyMovies button
$("#add-movies").on("click", function(event) {

	event.preventDefault();
	var movies = $("#movies-input").val().trim();
	disneyMovies.push(movies);
	renderButtons();

}); // ends add disneyMovies button


//  click event listener 
$(document).on("click", ".movies", displayDisneyMoviesGif);


//animate on click
$(document).on("click", ".gif", function() {

	var state = $(this).attr("data-state");
	var animateUrl = $(this).attr("data-animate");
	var stillUrl = $(this).attr("data-still");

	if (state === "still") {
		$(this).attr("src", animateUrl);
		$(this).attr("data-state", "animate");
	}

	if (state === "animate") {
		$(this).attr("src", stillUrl);
		$(this).attr("data-state", "still")
	}

}); // ends animate on click


//renders buttons on load
renderButtons();