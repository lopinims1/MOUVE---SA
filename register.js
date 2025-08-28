document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return; // segurança, caso a página não tenha <form>

  const inputs = form.querySelectorAll("input");

  // Identificar se é registro (3 inputs) ou login (2 inputs)
  if (inputs.length === 3) {
      // ======== REGISTRO ========
      const registerBtn = document.getElementById("register.button");

      registerBtn.addEventListener("click", (e) => {
          e.preventDefault();

          const name = inputs[0].value.trim();
          const email = inputs[1].value.trim();
          const password = inputs[2].value;

          // Validação: só aceita emails do Gmail
          if (!email.endsWith("@gmail.com")) {
              alert("Por favor, use um e-mail válido do Gmail (ex: exemplo@gmail.com).");
              return;
          }

          // Verificar se já existe conta com esse email
          if (localStorage.getItem(email)) {
              alert("Esse e-mail já está registrado. Faça login.");
              return;
          }

          // Criar usuário
          const user = { name, email, password };

          // Salvar no localStorage (email = chave)
          localStorage.setItem(email, JSON.stringify(user));

          // Logar automaticamente após registro
          localStorage.setItem("currentUser", email);

          alert("Conta criada com sucesso! Redirecionando para a home...");
          window.location.href = "index.html"; // manda direto pra home
      });

