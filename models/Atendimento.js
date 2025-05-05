import { obterDataAtual, obterHoraAtual, calcularDiferencaHoras } from './utils.js';

export class Atendimento {
    nome;
    cpf;
    data;
    hora;
    horaAtendimento;
    tempoFila;

    constructor(nome, cpf) {
        this.nome = nome;
        this.cpf = cpf;
        this.data = obterDataAtual();
        this.hora = obterHoraAtual();
        this.horaAtendimento = "";
        this.tempoFila = "";
    }

    registrarHoraAtendimento(hora) {
        this.horaAtendimento = hora;
        this.tempoFila = calcularDiferencaHoras(this.hora, this.horaAtendimento);
    }

    toString() {
        return `Nome: ${this.nome} - Data: ${this.data} - Hora de Chegada: ${this.hora}`;
    }
    toStringAtendidoCom() {
        return `${this.nome} - Horario de entrada: ${this.hora} - Atendido(a) ás: ${this.horaAtendimento} - (Tempo de Espera: ${this.tempoFila})`
    }
}
