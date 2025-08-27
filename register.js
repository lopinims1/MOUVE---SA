// ---------------------------
// Funções auxiliares de LocalStorage
// ---------------------------

// Lê os registros salvos no localStorage
function getRegistros() {
    return JSON.parse(localStorage.getItem("registros")) || [];
  }
  
  // Salva os registros no localStorage
  function salvarRegistros(registros) {
    localStorage.setItem("registros", JSON.stringify(registros));
  }
  
  // Adiciona um novo registro
  function adicionarRegistro(nome, email) {
    let registros = getRegistros();
    const novo = {
      id: Date.now(),
      nome,
      email
    };
    registros.push(novo);
    salvarRegistros(registros);
    listarRegistros();
  }
  
  // Edita um registro existente
  function editarRegistro(id, novoNome, novoEmail) {
    let registros = getRegistros();
    registros = registros.map(r =>
      r.id === id ? { ...r, nome: novoNome, email: novoEmail } : r
    );
    salvarRegistros(registros);
    listarRegistros();
  }
  
  // Exclui um registro
  function excluirRegistro(id) {
    let registros = getRegistros().filter(r => r.id !== id);
    salvarRegistros(registros);
    listarRegistros();
  }
  
  // ---------------------------
  // Renderização na tela
  // ---------------------------
  function listarRegistros() {
    const lista = document.getElementById("listaRegistros");
    if (!lista) return;
  
    let registros = getRegistros();
    lista.innerHTML = "";
  
    registros.forEach(reg => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${reg.nome}</strong> - ${reg.email}
        <button onclick="editarPrompt(${reg.id})">✏️</button>
        <button onclick="excluirRegistro(${reg.id})">❌</button>
      `;
      lista.appendChild(li);
    });
  }
  
  // ---------------------------
  // Helpers para testes
  // ---------------------------
  function editarPrompt(id) {
    const novoNome = prompt("Novo nome:");
    const novoEmail = prompt("Novo email:");
    if (novoNome && novoEmail) {
      editarRegistro(id, novoNome, novoEmail);
    }
  }
  
  // ---------------------------
  // Inicialização
  // ---------------------------
  document.addEventListener("DOMContentLoaded", () => {
    listarRegistros();
  
    // Exemplo: capturar de inputs se você tiver
    const form = document.getElementById("formRegistro");
    if (form) {
      form.addEventListener("submit", e => {
        e.preventDefault();
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        if (nome && email) {
          adicionarRegistro(nome, email);
          form.reset();
        }
      });
    }
  });
  
