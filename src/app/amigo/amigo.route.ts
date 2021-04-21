import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { AmigoAppComponent } from './amigo.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { AmigoResolve } from './services/amigo.resolve';

const amigoRouterConfig: Routes = [
    { 
        path: '', component: AmigoAppComponent, 
        children: [
            { path: 'listar-todos', component: ListaComponent },
            { path: 'adicionar-amigo', component: NovoComponent },
            { 
                path: 'editar/:id', component: EditarComponent,
                resolve: { amigo: AmigoResolve }
            },
            { 
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: { amigo: AmigoResolve }
            },
            { 
                path: 'excluir/:id', component: ExcluirComponent,
                resolve: { amigo: AmigoResolve }
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(amigoRouterConfig)],
    exports: [RouterModule]
})

export class AmigoRountingModule { }