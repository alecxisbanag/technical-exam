import { ConfirmationGuard } from './_guard/confirmation.guard';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'form', component: FormComponent},
  {path: 'confirmation', component: ConfirmationComponent, canActivate: [ConfirmationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
