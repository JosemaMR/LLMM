/* =========================
   ELEMENTOS
========================= */

const terminal = document.getElementById("terminal");
const loading = document.getElementById("loading");
const messagesScreen = document.getElementById("messages");

const passwordInput = document.getElementById("password");
const accessButton = document.getElementById("access-button");

const errorMessage = document.getElementById("error-message");

const messageElement = document.getElementById("message");
const tapIndicator = document.querySelector(".tap-indicator");

const progressBar = document.getElementById("progress-bar");
const loadingPercent = document.getElementById("loading-percent");


/* =========================
   CONFIGURACIÓN
========================= */

// Esta será la contraseña.
// Luego podemos cambiarla por una que tenga
// significado para tu amigo.

const PASSWORD = "cumpleanos";


/* =========================
   MENSAJES
========================= */

const messages = [

    "Bueno...",

    "Hoy es un día bastante importante.",

    "Porque hace unos cuantos años nació alguien bastante importante para mí.",

    "Y después de todos estos años...",

    "hemos acabado viviendo unas cuantas historias 😂",

    "Algunas bastante buenas.",

    "Otras que probablemente sea mejor no recordar.",

    "Pero todas han merecido la pena.",

    "Así que simplemente quería decirte una cosa.",

    "Gracias por estar ahí.",

    "Y ahora sí...",

    "🎂 FELIZ CUMPLEAÑOS 🎂"

];


let currentMessage = 0;
let changingMessage = false;


/* =========================
   COMPROBAR CONTRASEÑA
========================= */

function checkPassword() {

    const enteredPassword =
        passwordInput.value.trim().toLowerCase();


    if (enteredPassword === PASSWORD) {

        errorMessage.textContent = "";

        startLoading();

    } else {

        errorMessage.textContent =
            "> ACCESS DENIED. Contraseña incorrecta.";

        passwordInput.value = "";

        passwordInput.focus();

        terminal.classList.remove("glitch");

        // Reinicia la animación
        void terminal.offsetWidth;

        terminal.classList.add("glitch");
    }
}


/* =========================
   ENTER EN CONTRASEÑA
========================= */

passwordInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        checkPassword();

    }

});


accessButton.addEventListener("click", checkPassword);


/* =========================
   CARGANDO SISTEMA
========================= */

function startLoading() {

    terminal.classList.add("hidden");

    loading.classList.remove("hidden");

    let progress = 0;

    const interval = setInterval(() => {

        progress++;

        progressBar.style.width = progress + "%";

        loadingPercent.textContent =
            progress + "%";


        if (progress >= 100) {

            clearInterval(interval);

            setTimeout(() => {

                loading.classList.add("hidden");

                messagesScreen.classList.remove("hidden");

                showMessage();

            }, 500);
        }

    }, 25);
}


/* =========================
   MOSTRAR MENSAJE
========================= */

function showMessage() {

    messageElement.textContent =
        messages[currentMessage];

}


/* =========================
   SIGUIENTE MENSAJE
========================= */

function nextMessage() {

    if (changingMessage) return;

    if (currentMessage >= messages.length - 1) {

        return;
    }

    changingMessage = true;


    messageElement.classList.add("fade-out");


    setTimeout(() => {

        currentMessage++;

        showMessage();

        messageElement.classList.remove("fade-out");

        changingMessage = false;


        // Último mensaje
        if (currentMessage === messages.length - 1) {

            tapIndicator.textContent =
                "❤️";

        }

    }, 350);
}


/* =========================
   TOCAR LA PANTALLA
========================= */

messagesScreen.addEventListener("click", nextMessage);


/* =========================
   SWIPE EN MÓVIL
========================= */

let touchStartY = 0;

messagesScreen.addEventListener("touchstart", function(event) {

    touchStartY = event.changedTouches[0].screenY;

});


messagesScreen.addEventListener("touchend", function(event) {

    const touchEndY =
        event.changedTouches[0].screenY;

    const difference =
        touchStartY - touchEndY;


    if (Math.abs(difference) > 50) {

        nextMessage();

    }

});
