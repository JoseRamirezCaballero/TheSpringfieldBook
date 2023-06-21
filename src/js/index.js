const bgMusic = document.getElementById("bg-music");
const playButton = document.getElementById("play-button");
const playIcon = document.getElementById("play-icon");

playButton.addEventListener("click", function () {
  if (bgMusic.paused) {
    bgMusic.play();
    typeMessage("¡Woo-hoo! ¡La música es lo máximo!", 4);
    playIcon.innerHTML = `
    <svg
      aria-hidden="true"
      class="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 4h4v16H6zM14 4h4v16h-4z"
      ></path>
    </svg>  
    `;
  } else {
    bgMusic.pause();
    playIcon.innerHTML = `
      <svg
        aria-hidden="true"
        class="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 4v16l13-8z"
        ></path>
      </svg>
    `;
  }
});

const imgDonut = document.getElementById("donutImage");
const clickSound = document.getElementById("clickSound");
imgDonut.addEventListener("click", function () {
  clickSound.play();
  imgDonut.classList.remove("grayscale");
  imgDonut.classList.remove("w-52");
  imgDonut.classList.remove("h-52");
  imgDonut.classList.add("w-48");
  imgDonut.classList.add("h-48");
  setTimeout(function () {
    imgDonut.src = "./src/media/dona-mordida.png";
    typeMessage(
      "!Oye, te dije que podías tomar un bocado, pero no la mitad de la rosquilla!",
      4
    );
  }, 600);
});

function typeMessage(message, time = 7) {
  const chatMessage = document.getElementById("chat-message");
  const dots = ["", ".", "..", "..."];
  let i = 0;

  const typingEffect = setInterval(() => {
    if (i === time) {
      clearInterval(typingEffect);
      chatMessage.textContent = message;
      return;
    }

    const typing = dots[i % dots.length];
    chatMessage.textContent = typing;

    i++;
  }, 400);
}
typeMessage("D'oh! ¡Dale un bocado a la rosquilla!", 7);
