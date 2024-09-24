export class FormProfessor {
  nome: string;
  tempoRegencia: number;
  quantidadeLicenca: number;
  titulos: number;

  dataFinal: Date;
  dataInicial: Date;

  constructor() {
    this.nome = "";
    this.tempoRegencia = 0;
    this.titulos = 0;
    this.quantidadeLicenca = 0;
    this.dataFinal = new Date();
    this.dataInicial = new Date();
  }
}