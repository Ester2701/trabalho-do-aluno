document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Captura os dados do formulário
    const nome = document.getElementById("nome").value.trim();
    const nota1 = parseFloat(document.getElementById("nota1").value);
    const nota2 = parseFloat(document.getElementById("nota2").value);

    // Validação dos campos
    if (!nome || isNaN(nota1) || isNaN(nota2)) {
        alert("Por favor, preencha todos os campos corretamente!");
        return;
    }

    // Cálculo da média
    const media = (nota1 + nota2) / 2;

    // Verifica se o aluno foi aprovado ou reprovado
    const status = media >= 6 ? "Aprovado" : "Reprovado";
    const statusClass = media >= 6 ? "aprovado" : "reprovado";

    // Cria uma nova linha na tabela
    const tabela = document.getElementById("resultado").getElementsByTagName("tbody")[0];
    const novaLinha = tabela.insertRow();

    novaLinha.classList.add(statusClass);

    novaLinha.insertCell(0).textContent = nome;
    novaLinha.insertCell(1).textContent = nota1.toFixed(1);
    novaLinha.insertCell(2).textContent = nota2.toFixed(1);
    novaLinha.insertCell(3).textContent = media.toFixed(1);
    novaLinha.insertCell(4).textContent = status;

    // Limpar os campos
    document.getElementById("nome").value = '';
    document.getElementById("nota1").value = '';
    document.getElementById("nota2").value = '';
});