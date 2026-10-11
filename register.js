// =========================================================
// FogoSM — SISTEMA DE REGISTRO
// =========================================================


// Elementos del formulario
const registerForm = document.getElementById("registerForm");

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const ageCheck = document.getElementById("ageCheck");
const termsCheck = document.getElementById("termsCheck");

const registerButton = document.getElementById("registerButton");
const registerMessage = document.getElementById("registerMessage");


// Reglas de contraseña
const ruleLength = document.getElementById("ruleLength");
const ruleNumber = document.getElementById("ruleNumber");
const ruleLowercase = document.getElementById("ruleLowercase");


// =========================================================
// COMPROBAR CONTRASEÑA EN TIEMPO REAL
// =========================================================

passwordInput.addEventListener("input", () => {

    const password = passwordInput.value;

    const hasLength = password.length >= 3;
    const hasNumber = /\d/.test(password);
    const hasLowercase = /[a-z]/.test(password);


    ruleLength.textContent =
        hasLength
            ? "✓ Mínimo 3 caracteres"
            : "○ Mínimo 3 caracteres";


    ruleNumber.textContent =
        hasNumber
            ? "✓ Al menos 1 número"
            : "○ Al menos 1 número";


    ruleLowercase.textContent =
        hasLowercase
            ? "✓ Al menos 1 letra minúscula"
            : "○ Al menos 1 letra minúscula";

});


// =========================================================
// MOSTRAR MENSAJE
// =========================================================

function showMessage(message, type) {

    registerMessage.textContent = message;

    registerMessage.className =
        "auth-message " + type;

}


// =========================================================
// REGISTRO
// =========================================================

registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;


    // -----------------------------------------
    // COMPROBACIONES
    // -----------------------------------------

    if (username.length < 3) {

        showMessage(
            "El nombre de usuario debe tener al menos 3 caracteres.",
            "error"
        );

        return;
    }


    if (password.length < 3) {

        showMessage(
            "La contraseña debe tener al menos 3 caracteres.",
            "error"
        );

        return;
    }


    if (!/\d/.test(password)) {

        showMessage(
            "La contraseña debe contener al menos un número.",
            "error"
        );

        return;
    }


    if (!/[a-z]/.test(password)) {

        showMessage(
            "La contraseña debe contener al menos una letra minúscula.",
            "error"
        );

        return;
    }


    if (password !== confirmPassword) {

        showMessage(
            "Las contraseñas no coinciden.",
            "error"
        );

        return;
    }


    if (!ageCheck.checked) {

        showMessage(
            "Debes confirmar que tienes al menos 13 años.",
            "error"
        );

        return;
    }


    if (!termsCheck.checked) {

        showMessage(
            "Debes aceptar los términos y condiciones.",
            "error"
        );

        return;
    }


    // -----------------------------------------
    // DESACTIVAR BOTÓN
    // -----------------------------------------

    registerButton.disabled = true;
    registerButton.textContent = "Creando cuenta...";


    // -----------------------------------------
    // CREAR USUARIO EN SUPABASE AUTH
    // -----------------------------------------

    const { data, error } = await supabaseClient.auth.signUp({

        email: email,

        password: password,

        options: {

            data: {
                username: username
            }

        }

    });


    // -----------------------------------------
    // ERROR
    // -----------------------------------------

    if (error) {

        console.error("Error de registro:", error);

        showMessage(
            error.message,
            "error"
        );

        registerButton.disabled = false;
        registerButton.textContent = "Crear cuenta";

        return;
    }


    // -----------------------------------------
    // REGISTRO CORRECTO
    // -----------------------------------------

    console.log("Usuario creado:", data);


    showMessage(
        "Cuenta creada correctamente. Revisa tu correo electrónico para verificarla.",
        "success"
    );


    registerForm.reset();


    ruleLength.textContent =
        "○ Mínimo 3 caracteres";

    ruleNumber.textContent =
        "○ Al menos 1 número";

    ruleLowercase.textContent =
        "○ Al menos 1 letra minúscula";


    registerButton.disabled = false;
    registerButton.textContent = "Crear cuenta";

});