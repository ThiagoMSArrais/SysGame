import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Jogo } from '../models/jogo';
import { ToastrService } from 'ngx-toastr';
import { JogoService } from '../services/jogo.service';

@Component({
    selector: 'app-excluir',
    templateUrl: './excluir.component.html'
})

export class ExcluirComponent {

    errors: any[] = [];
    jogo: Jogo = new Jogo();
    
    constructor(private fb: FormBuilder,
                private toastr: ToastrService,
                private jogoService: JogoService,
                private route: ActivatedRoute,
                private router: Router) { 

        this.jogo = this.route.snapshot.data['jogo'];  
    }
    
    
    excluirJogo() {
        this.jogoService.excluirJogo(this.jogo.jogoId)
            .subscribe(
                jogo => { this.sucessoExclusao(jogo) },
                error => { this.falha(error) }
            )
    }

    sucessoExclusao(response: any) {
        
        let toast = this.toastr.success('Jogo excluído com sucesso!', 'Sucesso!');

        if (toast) {
            toast.onHidden.subscribe(() => {
                this.router.navigate(['/jogos/listar-todos']);
            });
        }
    }

    falha(falha: any) {
        this.errors = falha.error.errors;
        this.toastr.error('Houve um erro no processamento!', 'Erro!');       
    }
 }