import { Component, OnInit, ViewChildren, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';

import { AmigoService } from '../services/amigo.services';
import { Amigo } from '../models/amigo';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-novo',
    templateUrl: './novo.component.html'
})

export class NovoComponent implements OnInit{
    
    errors: any[] = [];
    cadAmigoForm!: FormGroup;
    amigo: Amigo = new Amigo();

    constructor(private fb:FormBuilder,
                private amigoService: AmigoService,
                private toastr: ToastrService,
                private router: Router) {}
    
    
    ngOnInit(): void {
        this.cadAmigoForm = this.fb.group({
            nome: ['']
        })
    }


    adicionarAmigo() {
        if (this.cadAmigoForm.dirty && this.cadAmigoForm.valid) {
            this.amigo = Object.assign({}, this.amigo, this.cadAmigoForm.value);

            this.amigoService.novoAmigo(this.amigo)
                .subscribe(
                    sucesso => { this.processarSucesso(sucesso)},
                    falha => { this.processarFalha(falha) }
                );
        }
    }

    processarSucesso(response: any) {
        this.cadAmigoForm.reset();
        this.errors = [];

        let toast = this.toastr.success("Amigo cadastrado com sucesso!", "Sucesso!");
        if (toast) {
            toast.onHidden.subscribe(() => {
                this.router.navigate(['/amigos/listar-todos']);
            });
        }
    }

    processarFalha(fail: any) {
        this.errors = fail.error.erros;
        this.toastr.error("Ocorreu um erro!", "Erro!");
    }
}