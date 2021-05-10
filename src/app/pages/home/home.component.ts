import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ModalConfirmationComponent } from 'src/app/shared/components/modal-confirmation/modal-confirmation.component';
import { User } from './../../shared/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('modalContent') modalContent: ModalConfirmationComponent;
  users: User[] = [];
  user = {} as User;
  loadingData: boolean;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  registerInformations(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  toastError() {
    this.toastService.show(
      'Ops... Estamos com problemas, tente novamente mais tarde',
      { classname: 'bg-danger text-light', delay: 10000 }
    );
  }

  getUsers() {
    this.loadingData = true;
    this.userService.getUsers().subscribe({
      complete: () => {
        this.loadingData = false;
      },
      next: (res: User[]) => {
        this.users = res;
      }, // nextHandler
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }, // errorHandler
    });
  }

  confirmDeleteUser(user: User) {
    this.user = user;
    this.modalContent.openModal();
  }

  deleteUser() {
    this.userService.deleteUser(this.user.id).subscribe({
      next: (res: User) => {
        this.toastService.show('Usuário inativo com sucesso!', {
          classname: 'bg-success text-light',
          delay: 10000,
        });
        this.users.splice(this.users.indexOf(this.user), 1);
      }, // nextHandler
      error: (error: HttpErrorResponse) => {
        this.toastError();
      }, // errorHandler
    });
  }
}
