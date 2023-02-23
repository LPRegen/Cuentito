const textare = document.querySelector('#userInput');
const countbox = document.querySelector('#countbox');

textare.addEventListener('input', function() {
  countbox.innerHTML = 280 - textare.value.length;
});



function generateNewStory() {
  document.getElementById("userInput").innerHTML = "";
  document.getElementById("userInput").value = "";
  document.getElementById("cuentito").innerHTML = "";
  document.getElementById("cuentito").textContent = "";
}
// Show progress bar
function showProgressBar() {
	document.getElementById("progressbar-container").style.display = "block";
}

// Update progress bar width
function updateProgressBar(width) {
	  document.getElementById("progressbar").style.width = width + "%";
}

// Hide progress bar
function hideProgressBar() {
	document.getElementById("progressbar-container").style.display = "none";
}



document.querySelector("form").addEventListener("submit", function(e){
    // prevent the default form submission
	e.preventDefault();
	$('#form-column').hide();
        $('.notice-bar').hide();
	showProgressBar();
	const userInput = document.getElementById("userInput").value;
  // send userInput to the PHP script that generates the story


// set the total duration of the animation to 50 seconds
const duration = 50000;

// calculate the amount of time in milliseconds for each update of the progress bar
const updateInterval = duration / 100;

// initialize the width of the progress bar to 0
let i = 0;

// start the interval to update the width of the progress bar
const interval = setInterval(() => {
  // increment the width of the progress bar
  i += 1;
  // update the width of the progress bar in the UI
  document.getElementById("progressbar").style.width = `${i}%`;
  // if the width of the progress bar reaches 100%, stop the interval

		        if (i > 15 && i <= 25 ) {
			$('.message-container').html("<p>Dependiendo la cantidad de gente conectada, esto puede demorar un poco...</p>");
		        } else if (i > 25 && i <=35 ) {
   $('.message-container').html("<p>Primero vas a ver tu Cuentito escrito y luego las imágenes...</p>");
		        } else if (i > 35 && i <=65 ) {
			$('.message-container').html("");
   $('.message-container').html("<p>Si el proceso tarda más de un minuto, no te preocupes. Te avisamos por mail cuando tu Cuentito esté terminado!</p>");
		        } else if (i > 65 && i <=85 ) {
   $('.message-container').html("<p>Podés editar tu Cuentito marcando el texto que quieras cambiar y agregando nuevo.</p>");
 		        } else if (i > 86 ) {
} else if (i > 95 ) {
   $('.message-container').html("<p>¡Ya casi terminamos!</p>");
} 
  if (i >= 100) {
    clearInterval(interval);
  }
}, updateInterval);

// stop the interval after 50 seconds
setTimeout(() => {
  clearInterval(interval);
}, duration);


        const controller = new AbortController();

        let fetchRequest;
        fetchRequest = fetch("/app/generateStory.php", {
		method: "POST",
		body: JSON.stringify({ input: userInput, task: 'generate_story' }),
		headers: { "Content-Type": "application/json" },
	        signal: controller.signal,
	})
	.then(response => response.json())
	.then(data => {
                if (data.error) {
    	          // show error message in notice bar
    	          const noticeBar = document.querySelector('.notice-bar');
    	          noticeBar.innerHTML = data.error;
    	          noticeBar.style.background = '#fbbcc0';
    	          //noticeBar.style.animation = 'none';
    	          noticeBar.style.display = 'block';
    	          noticeBar.style.opacity = '1';
		  window.stop();
		  // Hide the progressbar-container div
		  const progressbarContainer = document.querySelector('.progressbar-container');
		  progressbarContainer.style.display = 'none';
		  // Show the form-container div
		  const formContainer = document.querySelector('#form-column');
		  formContainer.style.display = 'block';
		  
                }
		  //console.log(data.post_id);
		  const post_id = data.post_id;
		  if (post_id) {
			window.location = post_id + "?fresh=true";
		  } 
        })
        .catch(error => {
        if (error.name === "AbortError") {
// Handle the case where the fetch request was cancelled
// Stop the execution of all scripts
window.stop();
// Hide the progressbar-container div
const progressbarContainer = document.querySelector('.progressbar-container');
progressbarContainer.style.display = 'none';
// Show the form-container div
const formContainer = document.querySelector('#form-column');
formContainer.style.display = 'block';
} else {
        // show error message in notice bar
        const noticeBar = document.querySelector('.notice-bar');
        noticeBar.innerHTML = "Error " + error.message + ". Por favor intentar nuevamente.";
        noticeBar.style.display = 'block';
	throw error;
}
  });
  const cancelButton = document.querySelector("#cancel-request");

  cancelButton.addEventListener("click", () => {
  // code to cancel the fetch request here
  if (controller) {
controller.abort();
}
 });
});



	function setRandomPlaceholder() {
  // Load the prompts list from a text file
		fetch("/app/prompts.txt")
		.then(response => response.text())
		.then(data => {
      // Split the data into an array of prompts
			const prompts = data.split("\n");
			
      // Get a random prompt from the list
			const randomIndex = Math.floor(Math.random() * prompts.length);
			const prompt = prompts[randomIndex];
			
      // Set the placeholder text
  		        const textarea = document.getElementById("userInput");
			textarea.placeholder = "Escribí 10 palabras que describan una situación, personajes o la idea principal de tu Cuentito. Por ejemplo:\n\n" + prompt;
		})
		.catch(error => {
			console.error("Error loading prompts:", error);
		});
	}

// Call the function when the page loads
	setRandomPlaceholder();

setInterval(setRandomPlaceholder, 30000); // 30 seconds




const textarea = document.querySelector('#userInput');
const submitButton = document.querySelector('#write');

textarea.addEventListener('input', function() {
  const wordCount = textarea.value.trim().split(/\s+/).length;
  if (wordCount >= 10) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});
