import { Component } from "@angular/core";
import { Jogo } from '../models/jogo';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-detalhes',
    templateUrl: './detalhes.component.html'
})

export class DetalhesComponent {

    jogo: Jogo = new Jogo();

    constructor(private route: ActivatedRoute) {
        this.jogo = this.route.snapshot.data['jogo'];
    }
}