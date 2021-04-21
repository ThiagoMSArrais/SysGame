import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JogoAppComponent } from './jogo.app.component';
import { NovoComponent } from './novo/novo.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ListaComponent } from './lista/lista.component';
import { JogoService } from './services/jogo.service';
import { JogoResolve } from './services/jogo.resolve';
import { JogoRoutingModule } from './jogo.route';
import { AmigoService } from '../amigo/services/amigo.services';

@NgModule({
    declarations: [
        JogoAppComponent,
        NovoComponent,
        DetalhesComponent,
        EditarComponent,
        ExcluirComponent,
        ListaComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        JogoRoutingModule
    ],
    providers: [
        JogoService,
        AmigoService,
        JogoResolve
    ]
})

export class JogoModule {}