import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Jogo } from '../models/jogo';
import { JogoService } from '../services/jogo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Amigo } from 'src/app/amigo/models/amigo';
import { AmigoService } from 'src/app/amigo/services/amigo.services';

@Component({
    selector: 'app-editar',
    templateUrl: './editar.component.html'
})

export class EditarComponent implements OnInit{
    errors: any[] = [];
    jogoForm: FormGroup;
    jogo: Jogo = new Jogo();
    estaEmprestado: Boolean = false;

    amigos: Amigo[] = [];

    constructor(private fb: FormBuilder,
                private jogoService: JogoService,
                private amigoService: AmigoService,
                private router: Router,
                private toastr: ToastrService,
                private route: ActivatedRoute) {

        this.jogo = this.route.snapshot.data['jogo'];  
    }

    ngOnInit(): void {
        this.amigoService.obterTodos()
            .subscribe(amigos => this.amigos = amigos);

        this.jogoForm = this.fb.group({
            nome: [''],
            emprestado: [''],
            amigoId: ['']
        });

        this.preencherForm();
    }

    trocarStatusParaEmprestado() {
        this.estaEmprestado = true;
    }

    trocarStatusParaNaoEmprestado() {
        this.estaEmprestado = false;
    }

    preencherForm() {
        this.estaEmprestado = this.jogo.emprestado;
        this.jogoForm.patchValue({
            nome: this.jogo.nome,
            emprestado: this.jogo.emprestado + '',
            amigoId: this.jogo.amigoId
        })
    }

    editarJogo() {
        if (this.jogoForm.dirty && this.jogoForm.valid)
        {
            this.jogo = Object.assign({}, this.jogo, this.jogoForm.value);

            this.jogo.emprestado ? this.jogo.emprestado = true : this.jogo.emprestado = false;
            !this.jogo.emprestado ? this.jogo.amigoId = '' : undefined;

            this.jogoService.atualizarJogo(this.jogo)
                .subscribe(
                    sucesso => { this.processarSucesso(sucesso) },
                    falha => {this.processarFalha(falha)}
                )
        }
    }

    processarSucesso(resolve: any) {
        this.errors = [];

        let toast = this.toastr.success('Atualizado o jogo com sucesso!', 'Sucesso!');
        if (toast) {
            toast.onHidden.subscribe(() => {
                this.router.navigate(['/jogos/listar-todos']);
            })
        }
    }

    processarFalha(falha: any) {
        this.errors = falha.error.errors;
        this.toastr.error('Houve um erro no processamento!', 'Erro!');   
    }
}