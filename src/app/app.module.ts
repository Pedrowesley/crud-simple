import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormInformationsComponent } from './pages/form-informations/form-informations.component';
import { HomeComponent } from './pages/home/home.component';
import { ModalConfirmationComponent } from './shared/components/modal-confirmation/modal-confirmation.component';
import { ToastsContainer } from './shared/components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormInformationsComponent,
    ToastsContainer,
    ModalConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [ModalConfirmationComponent],
})
export class AppModule {}
