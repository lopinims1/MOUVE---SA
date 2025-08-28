document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (!form) return;

    const inputs = form.querySelectorAll("input");
    let nameInput, emailInput, passwordInput, registerBtn, loginBtn;

    // Função para criar e inserir a div de mensagem logo após o input de senha
    function createMessageDiv(afterInput) {
        let div = document.createElement("div");
        div.id = "message";
        div.style.minHeight = "20px"; // mantém espaço para evitar salto
        div.style.margin = "10px 0";
        div.style.fontWeight = "bold";
        afterInput.insertAdjacentElement('afterend', div);
        return div;
    }

    function showMessage(msg, color="red") {
        messageDiv.textContent = msg;
        messageDiv.style.color = color;
    }

    // Garante que o admin sempre exista
    if (!localStorage.getItem("admin_geral@gmail.com")) {
        localStorage.setItem("admin_geral@gmail.com", JSON.stringify({
            name: "Admin",
            email: "admin_geral@gmail.com",
            password: "admin_geral123"
        }));
    }

    // Identificar se é registro (3 inputs) ou login (2 inputs)
    if (inputs.length === 3) {
        // REGISTRO
        nameInput = inputs[0];
        emailInput = inputs[1];
        passwordInput = inputs[2];
        registerBtn = document.getElementById("register.button");

        // Cria div de mensagem após senha
        var messageDiv = createMessageDiv(passwordInput);

        registerBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            if (!name || !email || !password) {
                showMessage("Preencha todos os campos!");
                return;
            }

            if (!email.endsWith("@gmail.com")) {
                showMessage("Use um e-mail válido do Gmail.");
                return;
            }

            if (localStorage.getItem(email)) {
                showMessage("Esse e-mail já está registrado. Faça login.");
                return;
            }

            const user = { name, email, password };
            localStorage.setItem(email, JSON.stringify(user));
            localStorage.setItem("currentUser", email);

            showMessage("Conta criada com sucesso.\nSeja bem-vindo ao Mouve!", "#10AACD");
            setTimeout(() => window.location.href = "index.html", 1500);
        });

    } else if (inputs.length === 2) {
        // LOGIN
        emailInput = inputs[0];
        passwordInput = inputs[1];
        loginBtn = document.getElementById("logar.button");

        // Cria div de mensagem após senha
        var messageDiv = createMessageDiv(passwordInput);

        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value;

            if (!email || !password) {
                showMessage("Preencha todos os campos!");
                return;
            }

            const savedUser = localStorage.getItem(email);
            if (!savedUser) {
                showMessage("Usuário não encontrado. Crie uma conta primeiro.");
                return;
            }

            const user = JSON.parse(savedUser);
            if (user.password !== password) {
                showMessage("Senha incorreta. Tente novamente.");
                return;
            }

            localStorage.setItem("currentUser", email);

            if (email === "admin_geral@gmail.com" && password === "admin_geral123") {
                showMessage("Bem-vindo, administrador!", "#10AACD");
            }

            showMessage("Login realizado com sucesso!", "#10AACD");
            setTimeout(() => window.location.href = "index.html", 1500);
        });
    }
});