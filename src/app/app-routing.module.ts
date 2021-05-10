import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormInformationsComponent } from './pages/form-informations/form-informations.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user', component: FormInformationsComponent },
  { path: 'user/:id', component: FormInformationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
