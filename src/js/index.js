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
  const messages = ["", ".", "..", "..."];
  let i = 0;

  const typing = setInterval(() => {
    if (i === time) {
      clearInterval(typing);
      chatMessage.textContent = message;
      return;
    }

    const currentMessage = messages[i % messages.length];
    chatMessage.textContent = currentMessage;

    i++;
  }, 400);
}

typeMessage("D'oh! ¡Dale un bocado a la rosquilla!", 7);
