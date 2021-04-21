import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AmigoService } from './services/amigo.services';
import { AmigoResolve } from './services/amigo.resolve';
import { AmigoRountingModule } from './amigo.route';

import { AmigoAppComponent } from "./amigo.app.component";
import { DetalhesComponent } from "./detalhes/detalhes.component";
import { EditarComponent } from "./editar/editar.component";
import { ExcluirComponent } from "./excluir/excluir.component";
import { ListaComponent } from "./lista/lista.component";
import { NovoComponent } from "./novo/novo.component";

@NgModule({
    declarations: [
        AmigoAppComponent,
        NovoComponent,
        ListaComponent,
        DetalhesComponent,
        EditarComponent,
        ExcluirComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AmigoRountingModule
    ],
    providers: [
        AmigoService,
        AmigoResolve
    ]
})

export class AmigoModule { }