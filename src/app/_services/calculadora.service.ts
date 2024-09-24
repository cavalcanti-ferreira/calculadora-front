import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pontuacao } from "../_models/pontuacao";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {
  constructor(private http: HttpClient) {}

  private calculadoraApiURL: string = "https://calculadoraunivesp-latest.onrender.com";

  private pontuaçãoController: string = "/api/pontuacao";

  //private findAllPontuacaoURI: string = "http://localhost:8080" + this.pontuaçãoController;
  private findAllPontuacaoURI: string = this.calculadoraApiURL + this.pontuaçãoController;

  public findAllPontuacao(): Observable<Pontuacao[]> {
    const params = new HttpParams().set('enteFederativoId', 1);
    return this.http.get<Pontuacao[]>(`${this.findAllPontuacaoURI}`, {params});
  }
}