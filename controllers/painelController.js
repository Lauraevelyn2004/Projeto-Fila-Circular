function atualizarAtendimento() {
    const ultimo = localStorage.getItem('ultimoAtendido');
    const elemento = document.getElementById('ultimoAtendimento');

    if (ultimo) {
        const atendimento = JSON.parse(ultimo);

        if (atendimento.nome && atendimento.nome.trim() !== "") {
            elemento.textContent = atendimento.nome;
        } else {
            elemento.textContent = "Aguardando ...";
        }
    } else {
        elemento.textContent = "Aguardando ...";
    }
}

setInterval(atualizarAtendimento, 1000);
atualizarAtendimento();
