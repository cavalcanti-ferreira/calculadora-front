import { Component } from '@angular/core';
import { CalculadoraService } from './_services/calculadora.service';
import { Pontuacao } from './_models/pontuacao';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { FormProfessor } from './_models/formProfessor';
import moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public pontuacoes: Pontuacao[] = [];
  public columnsToDisplay: string[] = [];
  public formProfessor: FormProfessor;
  public somaFinal: number;

  public displayedColumns: any[] = [
    {titulo: 'Título', coluna: 'titulo'},
    {titulo: 'Nível', coluna: 'nivel'},
    {titulo: 'Valor Unitário', coluna: 'valorUnitario'},
  ]

  constructor(
    private calculadoraService: CalculadoraService,
  ) {
    this.formProfessor = new FormProfessor();
    this.somaFinal = 0;
  }

  dataSource = new MatTableDataSource<Pontuacao>(this.pontuacoes);
  selection = new SelectionModel<Pontuacao>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.pontuacoes.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.pontuacoes);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Pontuacao): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  public getCalculation(): void {

    this.formProfessor.titulos = +this.getSelection().reduce((a, b) => a + b, 0).toFixed(2);

    let months = moment(this.formProfessor.dataFinal)
                  .diff(moment(this.formProfessor.dataInicial), 'months');
    this.formProfessor.tempoRegencia = months * 0.3;

    let desconto = this.formProfessor.quantidadeLicenca * 0.3;

    this.somaFinal = +(this.formProfessor.tempoRegencia + this.formProfessor.titulos - desconto).toFixed(2);
  }

  public cleanForm() {
    this.selection.clear();
    this.formProfessor = new FormProfessor();
    this.somaFinal = 0;
  }

  private getSelection(): number[] {
    return this.selection.selected.flatMap((data) => data.valorUnitario);
  }

  ngOnInit(): void {
    this.columnsToDisplay = ['select'].concat(this.displayedColumns.map(coluna => coluna.coluna));

    this.calculadoraService.findAllPontuacao().subscribe({
      next: (pontuacoes: Pontuacao[]) => {
        this.pontuacoes = pontuacoes;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
