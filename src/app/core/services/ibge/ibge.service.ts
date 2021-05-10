import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CEP } from 'src/app/shared/models/cep';
import { UF } from 'src/app/shared/models/uf';

@Injectable({
  providedIn: 'root',
})
export class IbgeService {
  constructor(private http: HttpClient) {}

  getUFs() {
    return this.http.get<UF[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
    );
  }

  getDataCep(cep: string) {
    return this.http.get<CEP>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
