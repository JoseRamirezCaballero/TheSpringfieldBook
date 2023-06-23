const playButton = document.getElementById("play-button");
playButton.addEventListener("click", function () {
  const bgMusic = document.getElementById("bg-music");
  const playIcon = document.getElementById("play-icon");
  if (bgMusic.paused) {
    bgMusic.play();
    typeMessage(obtenerFraseHomero("Musica"), 4);
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
const vistaPrincipal = document.getElementById("vista-principal");
const vistaSecundaria = document.getElementById("vista-secundaria");
imgDonut.addEventListener("click", function () {
  clickSound.play();
  imgDonut.classList.remove("grayscale");
  imgDonut.classList.remove("w-52");
  imgDonut.classList.remove("h-52");
  imgDonut.classList.add("w-48");
  imgDonut.classList.add("h-48");
  setTimeout(function () {
    imgDonut.src = "./src/media/dona-mordida.png";
    typeMessage(obtenerFraseHomero("Rosquilla"), 4);
    setTimeout(function () {
      vistaPrincipal.classList.add("hidden");
      vistaSecundaria.classList.remove("hidden");
    }, 400);
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

//FILTRADO
const generoButton = document.getElementById("genero");

const generoMenu = document.getElementById("divFiltrar");

generoButton.addEventListener("click", function () {
  const isHidden = generoMenu.classList.contains("hidden");

  if (isHidden) {
    generoMenu.classList.remove("hidden");
  } else {
    generoMenu.classList.add("hidden");
  }
});

const characters = async () => {
  try {
    const response = await fetch(
      "https://apisimpsons.fly.dev/api/personajes?limit=650"
    );
    const data = await response.json();
    return data.docs.filter(
      (character) =>
        character.Nombre !== "Spud & Cooder" &&
        character.Nombre !== "Jebediah Springfield"
    );
  } catch (error) {
    console.error(error);
  }
};

let vivo,
  fallecido,
  ficticio,
  robot,
  desconocido,
  divino,
  otro,
  musica,
  rosquilla;

fetch(
  "https://painted-brass-cow.glitch.me/api/chatHomero.json"
)
  .then((response) => response.json())
  .then((data) => {
    vivo = data.Vivo;
    fallecido = data.Fallecido;
    ficticio = data.Ficticio;
    robot = data.Robot;
    desconocido = data.Desconocido;
    divino = data.Divino;
    otro = data.Otro;
    musica = data.Musica;
    rosquilla = data.Rosquilla;
  })
  .catch((error) => {
    console.error(error);
  });

const imageContainer = document.getElementById("image-container");

(async () => {
  try {
    const charactersData = await characters();
    charactersData.forEach((character) => {
      const divElement = document.createElement("div");
      divElement.id = character.Genero.toLowerCase();
      divElement.className =
        "flex items-center justify-center mb-2 bg-[#0097ce] rounded-xl cursor-pointer";

      const imgElement = document.createElement("img");
      imgElement.className = "h-48 max-w-full rounded-lg p-2";
      imgElement.src = character.Imagen;
      imgElement.alt = character.Nombre;

      divElement.appendChild(imgElement);

      divElement.addEventListener("click", () => {
        const sectionModal = document.querySelector("#modal");
        const nombreElement = sectionModal.querySelector("#nombre");
        const estadoElement = sectionModal.querySelector("#estado");
        const historiaElement = sectionModal.querySelector("#historia");
        const contenedorEstado = document.getElementById("contenedorEstado");

        const infoAdicionalElement =
          sectionModal.querySelector("#infoAdicional");

        nombreElement.textContent = character.Nombre;
        historiaElement.textContent = character.Historia;
        infoAdicionalElement.textContent = `¡Ay, caramba! Este personaje es tan extraordinario que dejará a todos en un estado de asombro absoluto. Resulta que es del género ${character.Genero} y se desempeña en el hilarante oficio de ${character.Ocupacion}. Así que prepárate para pasar momentos inolvidables junto a ${character.Nombre}`;

        let estado = "";

        if (character.Estado === "Vivo") {
          contenedorEstado.classList.add("bg-green-100", "text-green-800");
          estado = "La vida de esta alma aún resplandece con la gracia divina";
        } else if (character.Estado === "Fallecido") {
          contenedorEstado.classList.add("bg-red-100", "text-red-800");
          estado =
            "Sus días en la tierra han terminado, pero su espíritu vive con el Todopoderoso";
        } else if (character.Estado === "Ficticio") {
          contenedorEstado.classList.add("bg-purple-100", "text-purple-800");
          estado =
            "Aunque ficticio en su existencia, su influencia perdura en los corazones";
        } else if (character.Estado === "Robot") {
          contenedorEstado.classList.add("bg-blue-100", "text-blue-800");
          estado =
            "Es un robot. ¿Sabías que los robots tienen una vida dura? ¡Siempre tienen muchos 'problemas' para resolver!";
        } else if (character.Estado === "Desconocido") {
          contenedorEstado.classList.add("bg-gray-100", "text-gray-800");
          estado =
            "Encomendamos al misterio divino el alma de aquel cuyo origen desconocemos";
        } else if (character.Estado === "Divino") {
          contenedorEstado.classList.add("bg-yellow-100", "text-yellow-800");
          estado =
            "¡Este ser es divino! Su presencia ilumina nuestras vidas con su gracia infinita";
        } else {
          contenedorEstado.classList.add("bg-gray-100", "text-gray-800");
          estado = "Un enigma sin resolver";
        }
        typeMessage(obtenerFraseHomero(character.Estado), 5);
        estadoElement.textContent = estado;

        sectionModal.classList.remove("hidden");
      });

      imageContainer.appendChild(divElement);
    });

    const buscarPersonajeInput = document.getElementById("buscarPersonaje");
    buscarPersonajeInput.addEventListener("input", (event) => {
      const textoBusqueda = event.target.value.toLowerCase();
      const tarjetasPersonajes = imageContainer.querySelectorAll("div");

      tarjetasPersonajes.forEach((tarjeta) => {
        const nombrePersonaje = tarjeta.querySelector("img").alt.toLowerCase();
        if (nombrePersonaje.includes(textoBusqueda)) {
          tarjeta.classList.remove("hidden");
        } else {
          tarjeta.classList.add("hidden");
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
})();

const masculinoButton = document.querySelector("#filtrarMasculino");
const femeninoButton = document.querySelector("#filtrarFemenino");

masculinoButton.addEventListener("click", function () {
  filtrarPersonajes("masculino");
});

femeninoButton.addEventListener("click", function () {
  filtrarPersonajes("femenino");
});

const filtrarPersonajes = (genero) => {
  const tarjetasPersonajes = imageContainer.querySelectorAll("div");

  tarjetasPersonajes.forEach((tarjeta) => {
    if (tarjeta.id.toLowerCase() === genero.toLowerCase()) {
      tarjeta.classList.remove("hidden");
    } else {
      tarjeta.classList.add("hidden");
    }
  });
  divFiltrar.classList.add("hidden");
};

const closeButton = document.querySelector("#close");

closeButton.addEventListener("click", () => {
  const sectionModal = document.querySelector("#modal");
  typeMessage(
    "¡Ay caramba! ¡Vamos a explorar otro personaje, a ver si hay alguien más emocionante que yo en esta historia! ¡D'oh!",
    4
  );
  sectionModal.classList.add("hidden");
});

function obtenerFraseHomero(estado) {
  let frase;

  switch (estado) {
    case "Vivo":
      frase = vivo;
      break;
    case "Fallecido":
      frase = fallecido;
      break;
    case "Ficticio":
      frase = ficticio;
      break;
    case "Robot":
      frase = robot;
      break;
    case "Desconocido":
      frase = desconocido;
      break;
    case "Divino":
      frase = divino;
      break;
    case "Musica":
      frase = musica;
      break;
    case "Rosquilla":
      frase = rosquilla;
      break;
    default:
      frase = otro;
      break;
  }

  const indice = Math.floor(Math.random() * frase.length);
  return frase[indice];
}
