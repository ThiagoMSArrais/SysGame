import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.services';
import { Amigo } from '../models/amigo';

@Injectable()
export class AmigoService extends BaseService {

    amigo: Amigo = new Amigo();

    constructor(private http:HttpClient) { super() }

    obterTodos(): Observable<Amigo[]> {
        return this.http.get<Amigo[]>(this.UrlServiceV1 + "amigos")
                   .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Amigo> {
        return this.http
                   .get<Amigo>(this.UrlServiceV1 + "amigos/" + id , super.ObterHeaderJson())
                   .pipe(catchError(super.serviceError));
    }

    novoAmigo(amigo: Amigo): Observable<Amigo> {
        return this.http
                   .post(this.UrlServiceV1 + "amigos", amigo, super.ObterHeaderJson())
                   .pipe(map(super.extractData),
                         catchError(super.serviceError));
    }

    atualizarAmigo(amigo: Amigo): Observable<Amigo> {
        return this.http
                   .put(this.UrlServiceV1 + "amigos/" + amigo.amigoId, amigo, super.ObterHeaderJson())
                   .pipe(map(super.extractData),
                         catchError(super.serviceError));
    }

    excluirAmigo(id: string): Observable<Amigo> {
        return this.http
                   .delete(this.UrlServiceV1 + "amigos/" + id, super.ObterHeaderJson())
                   .pipe(map(super.extractData),
                         catchError(super.serviceError));
    }
}