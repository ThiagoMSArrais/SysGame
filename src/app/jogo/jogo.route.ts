import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { JogoResolve } from './services/jogo.resolve';

import { JogoAppComponent } from './jogo.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';

const jogoRouterConfig: Routes = [
    { 
        path: '', component: JogoAppComponent,
        children: [
            { path: 'listar-todos', component: ListaComponent },
            { path: 'adicionar-jogo', component: NovoComponent },
            { 
                path: 'editar/:id', component: EditarComponent,
                resolve: { jogo: JogoResolve }
            },
            { 
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: { jogo: JogoResolve }
            },
            { 
                path: 'excluir/:id', component: ExcluirComponent,
                resolve: { jogo: JogoResolve }
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(jogoRouterConfig)],
    exports: [RouterModule]
})

export class JogoRoutingModule {}