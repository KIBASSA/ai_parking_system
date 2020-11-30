import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PredictComponent } from './predict/predict.component';

const routes: Routes =
[
  { path: '', redirectTo: '/predict', pathMatch: 'full' },
  { path: 'predict', component: PredictComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
