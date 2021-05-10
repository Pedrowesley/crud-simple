import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ModalConfirmationComponent } from 'src/app/shared/components/modal-confirmation/modal-confirmation.component';
import { CEP } from 'src/app/shared/models/cep';
import { UF } from 'src/app/shared/models/uf';
import { IbgeService } from './../../core/services/ibge/ibge.service';
import { User } from './../../shared/models/user';

@Component({
  selector: 'app-form-informations',
  templateUrl: './form-informations.component.html',
  styleUrls: ['./form-informations.component.css'],
})
export class FormInformationsComponent implements OnInit {
  @ViewChild('modalContent') modalContent: ModalConfirmationComponent;
  ufs: UF[] = [];
  user = {} as User;
  paramId: number;
  title: string;
  loadingUser: boolean;
  loadingUfs: boolean;
  isValidForm: boolean;

  constructor(
    public toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private ibgeService: IbgeService
  ) {}

  ngOnInit(): void {
    this.getEstados();
    this.activatedRoute.params.subscribe((params) => {
      this.paramId = params?.id;
      this.title = this.paramId ? 'Editar usuário' : 'Cadastrar usuário';

      if (this.paramId) {
        this.title = 'Editar usuário';
        this.getUser(this.paramId);
      } else {
        this.title = 'Cadastrar usuário';
      }
    });
  }

  confirmUpdateUser() {
    this.modalContent.openModal();
  }

  methodSave() {
    let count = 0;
    Object.entries(this.user).map(([key, value]) => {
      if (!value?.trim()) {
        count = count + 1;
      }
    });

    if (!count && this.user.cpf.length >= 11 && this.user.cep.length >= 8) {
      if (this.paramId) {
        this.confirmUpdateUser();
      } else {
        this.insertUser();
      }
    } else {
      this.toastService.show(
        'Por favor preencha todos os campos corretamente',
        {
          classname: 'bg-danger text-light',
          delay: 10000,
        }
      );
    }
  }

  getEstados() {
    this.ibgeService.getUFs().subscribe({
      next: (res: UF[]) => {
        this.ufs = res;
      }, // nextHandler
      error: (error: HttpErrorResponse) => {
        this.toastService.show(
          'Ops... Estamos com problemas ao exibir os estados, tente novamente mais tarde',
          { classname: 'bg-danger text-light', delay: 10000 }
        );
      }, // errorHandler
    });
  }

  getCEP() {
    const errorToast = () => {
      this.toastService.show(
        'Ops... Estamos com problemas ao exibir os estados, tente novamente mais tarde',
        { classname: 'bg-danger text-light', delay: 10000 }
      );
    };

    this.ibgeService.getDataCep(this.user.cep).subscribe({
      next: (res: CEP) => {
        if (!res.erro) {
          this.user.cep = res.cep;
          this.user.logradouro = res.logradouro;
          this.user.bairro = res.bairro;
          this.user.localidade = res.localidade;
          this.user.uf = res.uf;
        } else {
          errorToast();
        }
      }, // nextHandler
      error: (error: HttpErrorResponse) => {
        errorToast();
      }, // errorHandler
    });
  }

  getUser(id: number) {
    this.loadingUser = true;
    this.userService.getUser(id).subscribe({
      complete: () => {
        this.loadingUser = false;
      },
      next: (res: User) => {
        this.user = res;
      }, // nextHandler
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }, // errorHandler
    });
  }

  toastError() {
    this.toastService.show(
      'Ops... Estamos com problemas, tente novamente mais tarde',
      { classname: 'bg-danger text-light', delay: 10000 }
    );
  }

  toastSuccess(message: string) {
    this.toastService.show(message, {
      classname: 'bg-success text-light',
      delay: 10000,
    });
  }

  insertUser() {
    this.userService.insertUser(this.user).subscribe({
      next: (res: User) => {
        this.toastSuccess('Perfeito! Usuário inserido com sucesso');
        this.router.navigate(['/']);
      }, // nextHandler
      error: (error: HttpErrorResponse) => {
        this.toastError();
      }, // errorHandler
    });
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe({
      next: (res: User) => {
        this.toastSuccess('Perfeito! Usuário atualizado com sucesso');
        this.router.navigate(['/']);
      }, // nextHandler
      error: (error: HttpErrorResponse) => {
        this.toastError();
      }, // errorHandler
    });
  }
}
