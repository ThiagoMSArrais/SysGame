import { Injectable } from "@angular/core";

import { BaseService } from 'src/app/services/base.services';
import { Jogo } from '../models/jogo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class JogoService extends BaseService {

    jogo: Jogo = new Jogo();

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Jogo[]> {
        return this.http.get<Jogo[]>(this.UrlServiceV1 + "jogos")
                        .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Jogo> {
        return this.http.get<Jogo>(this.UrlServiceV1 + "jogos/" + id, super.ObterHeaderJson())
                   .pipe(catchError(super.serviceError));
    }

    novoJogo(jogo: Jogo): Observable<Jogo> {
        return this.http.post(this.UrlServiceV1 + "jogos", jogo, super.ObterHeaderJson())
                   .pipe(map(super.extractData),
                          catchError(super.serviceError));
    }

    atualizarJogo(jogo: Jogo): Observable<Jogo> {
        return this.http.put(this.UrlServiceV1 + "jogos/" + jogo.jogoId, jogo, super.ObterHeaderJson())
                   .pipe(map(super.extractData),
                         catchError(super.serviceError));
    }

    excluirJogo(id: string): Observable<Jogo> {
        return this.http
                   .delete(this.UrlServiceV1 + "jogos/" + id, super.ObterHeaderJson())
                   .pipe(map(super.extractData),
                         catchError(super.serviceError));
    }
}