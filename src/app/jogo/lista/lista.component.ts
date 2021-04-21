import { Component, OnInit } from '@angular/core';

import { Jogo } from '../models/jogo';
import { JogoService } from '../services/jogo.service';
import { AmigoService } from 'src/app/amigo/services/amigo.services';
import { Amigo } from 'src/app/amigo/models/amigo';

@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html'
})

export class ListaComponent implements OnInit {

    public jogos: Jogo[];

    errorMessagem: string;

    constructor(private jogoService: JogoService) { }

    ngOnInit(): void {


        this.jogoService.obterTodos()
            .subscribe(
                jogos => this.jogos = jogos,
                error => this.errorMessagem);
    }
}