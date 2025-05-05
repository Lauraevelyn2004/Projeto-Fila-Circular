import { Atendimento } from '../models/Atendimento.js';
import { obterDataAtual, obterHoraAtual } from '../models/utils.js';
import { FilaCircular } from '../models/FilaCircular.js';

const minhaFila = new FilaCircular(5);

function addElemento() {
   const nomeInput = document.getElementById("txtnovoNome");
   const cpfInput = document.getElementById("txtnovoCPF");

   if (!minhaFila.isFull()) {
      const novoAtendimento = new Atendimento(
         nomeInput.value,
         cpfInput.value,
         obterDataAtual(),
         obterHoraAtual()
      );

      minhaFila.enqueue(novoAtendimento); // coloca o atendimento na fila
      mostrarFila();

      nomeInput.value = "";
      cpfInput.value = "";
      nomeInput.focus();
   } else {
      alert("Fila cheia!");
   }
}
// fim addElemento
//-----------------------------------
function mostrarFila() {

   const listaFila = document.getElementById("listFila");
   listaFila.innerHTML = "";

   for (let item of minhaFila) {
      const listaElemento = document.createElement("li");
      listaElemento.textContent = item.toString(); // aqui é fundamental!
      listaFila.appendChild(listaElemento);
   }
}



//-----------------------------
function atenderFila() {
   if (!minhaFila.isEmpty()) {
      const atendido = minhaFila.dequeue();

      // Registra a hora de atendimento
      atendido.registrarHoraAtendimento(obterHoraAtual());

      //salvar o ultimo trem atendido no localStorage
      localStorage.setItem('ultimoAtendido', JSON.stringify(atendido));

      //   mostramos os dados atualizados
      const divMensagem = document.getElementById("mensagem-remocao");
      divMensagem.innerHTML = `Próximo a ser atendido(a): ${atendido.toStringAtendidoCom()}`;
      divMensagem.style.display = "block";

      mostrarFila();
   } else {
      alert("Fila vazia!");
   }
}
//---------------------------------------
function buscarPorCPF() {
   const cpfInput = document.getElementById("txtnovoCPF").value;
   if (cpfInput.trim() === "") {
      alert("Digite um CPF válido para busca.");
      return;
   }
   let encontrado = false;
   for (let item of minhaFila) {
      if (item.cpf === cpfInput) {
         alert(`Atendimento encontrado: ${item.toString()}`);
         encontrado = true;
         break;
      }
   }
   if (!encontrado) {
      alert("Nenhum atendimento encontrado com esse CPF.");
   }
   document.getElementById("txtnovoCPF").value = "";
}


//---------------------------------------
window.addElemento = addElemento;
window.atenderFila = atenderFila;
window.buscarPorCPF = buscarPorCPF;
