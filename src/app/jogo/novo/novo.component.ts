import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Jogo } from '../models/jogo';
import { JogoService } from '../services/jogo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Amigo } from 'src/app/amigo/models/amigo';
import { AmigoService } from 'src/app/amigo/services/amigo.services';

@Component({
    selector: 'app-novo',
    templateUrl: './novo.component.html'
})

export class NovoComponent implements OnInit {

    errors: any[] = [];
    cadJogoForm!: FormGroup;
    jogo: Jogo = new Jogo();
    estaEmprestado: Boolean = false;
    
    amigos: Amigo[] = [];

    constructor(private fb:FormBuilder,
                private jogoService: JogoService,
                private amigoService: AmigoService,
                private toastr: ToastrService,
                private router: Router) {}
    
    
    ngOnInit(): void {
        this.amigoService.obterTodos()
            .subscribe(amigos => this.amigos = amigos);

        this.cadJogoForm = this.fb.group({
            nome: [''],
            emprestado: [''],
            amigoId: ['']
        });

        this.cadJogoForm.patchValue({ emprestado: 'false' });
    }

    trocarStatusParaEmprestado() {
        this.estaEmprestado = true;
    }

    trocarStatusParaNaoEmprestado() {
        this.estaEmprestado = false;
    }

    adicionarJogo() {
        if (this.cadJogoForm.dirty && this.cadJogoForm.valid) {
            this.jogo = Object.assign({}, this.jogo, this.cadJogoForm.value);

            
            this.jogo.emprestado ? this.jogo.emprestado = true : this.jogo.emprestado = false;
            alert(this.jogo.emprestado)
            this.jogoService.novoJogo(this.jogo)
                .subscribe(
                    sucesso => { this.processarSucesso(sucesso)},
                    falha => { this.processarFalha(falha) }
                );
        }
    }

    processarSucesso(response: any) {
        this.cadJogoForm.reset();
        this.errors = [];

        let toast = this.toastr.success("Jogo cadastrado com sucesso!", "Sucesso!");
        if (toast) {
            toast.onHidden.subscribe(() => {
                this.router.navigate(['/jogos/listar-todos']);
            });
        }
    }

    processarFalha(fail: any) {
        this.errors = fail.error.erros;
        this.toastr.error("Ocorreu um erro!", "Erro!");
    }
}