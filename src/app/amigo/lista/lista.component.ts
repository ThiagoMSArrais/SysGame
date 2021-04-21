import { Component, OnInit } from "@angular/core";

import { Amigo } from '../models/amigo';
import { AmigoService } from '../services/amigo.services';


@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html'
})

export class ListaComponent implements OnInit {

    public amigos: Amigo[];
    errorMessagem: string;

    constructor(private amigoService: AmigoService) { }

    ngOnInit(): void {
        this.amigoService.obterTodos()
            .subscribe(
                amigos => this.amigos = amigos,
                error => this.errorMessagem);
    }
 }