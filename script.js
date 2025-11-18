// Carregar dados do localStorage se existirem
document.addEventListener("DOMContentLoaded", carregarDados);

// Captura do formulário
const form = document.getElementById("formNotas");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const nota1 = parseFloat(document.getElementById("nota1").value);
    const nota2 = parseFloat(document.getElementById("nota2").value);
     const nota3 = parseFloat(document.getElementById("nota3").value);

    // Validação
    if (!nome || isNaN(nota1) || isNaN(nota2)) || isNaN(nota3) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const media = (nota1 + nota2 + nota3) / 2;
    const status = media >= 6 ? "Aprovado" : "Reprovado";
    const classe = media >= 6 ? "aprovado" : "reprovado";

    adicionarNaTabela(nome, nota1, nota2, nota2, media, status, classe);
    salvarDados(); // salva sempre que novo aluno é adicionado

    form.reset(); // limpar o formulário
});

// Função para adicionar linha na tabela
function adicionarNaTabela(nome, nota1, nota2, media, status, classe) {
    const tbody = document.querySelector("#tabelaAlunos tbody");

    const linha = document.createElement("tr");
    linha.classList.add(classe);

    linha.innerHTML = `
        <td>${nome}</td>
        <td>${nota1.toFixed(1)}</td>
        <td>${nota2.toFixed(1)}</td>
         <td>${nota3.toFixed(1)}</td>
        <td>${media.toFixed(1)}</td>
        <td>${status}</td>
    `;

    tbody.appendChild(linha);
}

// Salvar no localStorage
function salvarDados() {
    const linhas = document.querySelectorAll("#tabelaAlunos tbody tr");
    const dados = [];

    linhas.forEach(tr => {
        const tds = tr.querySelectorAll("td");

        dados.push({
            nome: tds[0].textContent,
            nota1: tds[1].textContent,
            nota2: tds[2].textContent,
            media: tds[3].textContent,
            status: tds[4].textContent,
            classe: tr.classList.contains("aprovado") ? "aprovado" : "reprovado"
        });
    });

    localStorage.setItem("alunos", JSON.stringify(dados));
}

// Carregar dados do localStorage ao abrir a página
function carregarDados() {
    const dados = JSON.parse(localStorage.getItem("alunos")) || [];

    dados.forEach(item => {
        adicionarNaTabela(
            item.nome,
            Number(item.nota1),
            Number(item.nota2),
            Number(item.nota3),
            Number(item.media),
            item.status,
            item.classe
        );
    });
}
