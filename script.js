const score_counter = document.getElementById("score");
const hi_counter = document.getElementById("hi");
const play_zone = document.getElementById("play-zone");
const play_zone_wrapper = document.getElementById("play-zone-wrapper");
const start_wrapper = document.getElementById("start-wrapper");
const colors = [
  "#fff",
  "#f0f089",
  "#89CFF0",
  "#E3242B",
  "red",
  "blue",
  "cyan",
  "purple",
  "orange",
  "yellow",
  "lightyellow",
  "lightblue",
];
//sounds
const pop_sound = document.getElementById("pop-snd");
const lose_sound = document.getElementById("lose-snd");
const hi_sound = document.getElementById("hi-snd");

let score = 0;
let hi = 0;
let animation_duration = 2;

// FUNCTIONS
const startGame = () => {
  start_wrapper.style.display = "none"; // Hide start wrapper

  let bubble = document.createElement("div"); // Creating bubble div element
  play_zone.appendChild(bubble); // Append bubble div element inside of play_zone element
  play_zone_wrapper.style.padding = "70px"; // set play_zone_wrapper padding to 70px

  bubble.style.width = bubble.style.height = "80px"; // set bubble width and height to 80px
  bubble.style.top = Math.floor(Math.random() * play_zone.offsetHeight) + "px"; // y bubble position
  bubble.style.left = Math.floor(Math.random() * play_zone.offsetWidth) + "px"; // x bubble position
  bubble.classList.add("bubble"); // add bubble class to bubble element
  bubble.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)]; // set random color to bubble element
  bubble.style.animationDuration = animation_duration + "s"; // set animation duration

  // if bubble 'show' animation ends
  bubble.addEventListener("animationend", () => {
    bubble.style.animationName = "hide"; // start hide bubble animation
    bubble.style.width = bubble.style.height = "0px"; // set bubble width and height to 0

    // if bubble 'hide' animation ends
    bubble.addEventListener("animationend", () => {
      // if score is higher than highest score
      if (score > hi) {
        hi_sound.currentTime = 0;
        hi_sound.play(); // play win sound

        hi_counter.innerHTML = hi = score; // show and set HI score to new score
        localStorage.setItem("bubble_game_highest_score", hi); // save new HI score
      } else {
        lose_sound.currentTime = 0;
        lose_sound.play(); // play loose sound
      }

      animation_duration = 2; // set animation duration to default
      bubble.remove(); // remove bubble element
      play_zone_wrapper.style.padding = "0"; // reset play_zone_wrapper padding
      start_wrapper.style.display = "flex"; // show start_wrapper
      alert(`Your score is ${score}`); // show score
      score_counter.innerHTML = score = 0; // reset score
    });
  });

  // if player clicked bubble element
  bubble.addEventListener("click", () => {
    pop_sound.currentTime = 0;
    pop_sound.play(); // play pop sound

    bubble.remove(); // remove bubble element

    score_counter.innerHTML = score += 1; // update score

    if (score > hi) {
      // if score is higher than HI score
      hi_counter.innerHTML = score; // show current score in HI score counter
    }

    startGame(); // run startGame function again

    // if animation duration is more than 0.6s speed it up by 0.05s
    animation_duration <= 0.6
      ? (animation_duration = 0.6)
      : (animation_duration -= 0.05);
  });
};

// if there's no HI score saved - save it
if (localStorage.getItem("bubble_game_highest_score", hi) !== null) {
  hi_counter.innerHTML = hi = localStorage.getItem(
    "bubble_game_highest_score",
    hi
  );
}

start_wrapper.addEventListener("click", startGame); // if player click start_wrapper - run startGame function
