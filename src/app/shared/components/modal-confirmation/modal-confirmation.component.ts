import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css'],
})
export class ModalConfirmationComponent implements OnInit {
  @ViewChild('contentModal')
  modalContent: TemplateRef<ModalConfirmationComponent>;

  @Output() confirme = new EventEmitter<any>();

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  confirmated() {
    this.confirme.emit(true);
    this.modalService.dismissAll();
  }

  openModal() {
    console.log('teste');
    this.modalService.open(this.modalContent);
  }
}
