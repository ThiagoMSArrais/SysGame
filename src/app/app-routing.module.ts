import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './navegacao/home/home.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'amigos',
    loadChildren: () => import('./amigo/amigo.module')
      .then(m => m.AmigoModule)
  },
  {
    path: 'jogos',
    loadChildren: () => import('./jogo/jogo.module')
      .then(m => m.JogoModule)
  },
  { path: 'home', component: HomeComponent },
  { path: 'nao-encontrado', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
