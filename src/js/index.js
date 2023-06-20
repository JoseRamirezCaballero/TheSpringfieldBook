const btnDona = document.getElementById("donutImage");
const clickSound = document.getElementById("clickSound");
btnDona.addEventListener("click", function () {
  clickSound.play();
  btnDona.classList.remove("grayscale");
  btnDona.classList.remove("w-52");
  btnDona.classList.remove("h-52");
  btnDona.classList.add("w-48");
  btnDona.classList.add("h-48");
  setTimeout(function () {
    btnDona.src = "./src/media/dona-mordida.png";
  }, 600);
});
