import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Amigo } from '../models/amigo';

@Component({
    selector: 'app-detalhes',
    templateUrl: './detalhes.component.html'
})

export class DetalhesComponent {

    amigo: Amigo = new Amigo();

    constructor(private route: ActivatedRoute) {
        this.amigo = this.route.snapshot.data['amigo'];
    }
 }