import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';
import { AmigoService } from '../services/amigo.services';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Amigo } from '../models/amigo';

@Component({
    selector: 'app-editar',
    templateUrl: './editar.component.html'
})

export class EditarComponent implements OnInit {

    errors: any[] = [];
    amigoForm: FormGroup;
    amigo: Amigo = new Amigo();

    constructor(private fb: FormBuilder,
                private amigoService: AmigoService,
                private router: Router,
                private toastr: ToastrService,
                private route: ActivatedRoute) {

        this.amigo = this.route.snapshot.data['amigo'];  
    }

    ngOnInit(): void {
        this.amigoForm = this.fb.group({
            amigoId: [''],
            nome: ['']
        });

        this.preencherForm();
    }

    preencherForm() {
        this.amigoForm.patchValue({
            amigoId: this.amigo.amigoId,
            nome: this.amigo.nome
        })
    }

    editarAmigo() {
        if (this.amigoForm.dirty && this.amigoForm.valid)
        {
            this.amigo = Object.assign({}, this.amigo, this.amigoForm.value);

            this.amigoService.atualizarAmigo(this.amigo)
                .subscribe(
                    sucesso => { this.processarSucesso(sucesso) },
                    falha => {this.processarFalha(falha)}
                )
        }
    }

    processarSucesso(resolve: any) {
        this.errors = [];

        let toast = this.toastr.success('Atualizado o amigo com sucesso!', 'Sucesso!');
        if (toast) {
            toast.onHidden.subscribe(() => {
                this.router.navigate(['/amigos/listar-todos']);
            })
        }
    }

    processarFalha(falha: any) {
        this.errors = falha.error.errors;
        this.toastr.error('Houve um erro no processamento!', 'Erro!');   
    }
 }