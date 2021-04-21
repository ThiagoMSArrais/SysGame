import { Component } from "@angular/core";
import { FormBuilder } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AmigoService } from '../services/amigo.services';
import { Amigo } from '../models/amigo';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-excluir',
    templateUrl: './excluir.component.html'
})

export class ExcluirComponent {
    
    errors: any[] = [];
    amigo: Amigo = new Amigo();
    
    constructor(private fb: FormBuilder,
                private toastr: ToastrService,
                private amigoService: AmigoService,
                private route: ActivatedRoute,
                private router: Router) { 

        this.amigo = this.route.snapshot.data['amigo'];  
    }
    
    
    excluirAmigo() {
        this.amigoService.excluirAmigo(this.amigo.amigoId)
            .subscribe(
                amigo => { this.sucessoExclusao(amigo) },
                error => { this.falha(error) }
            )
    }

    sucessoExclusao(response: any) {
        
        let toast = this.toastr.success('Amigo excluído com sucesso!', 'Sucesso!');

        if (toast) {
            toast.onHidden.subscribe(() => {
                this.router.navigate(['/amigos/listar-todos']);
            });
        }
    }

    falha(falha: any) {
        this.errors = falha.error.errors;
        this.toastr.error('Houve um erro no processamento!', 'Erro!');       
    }

 }