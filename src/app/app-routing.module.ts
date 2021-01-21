import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlvComponent } from './components/flv/flv.component';


const routes: Routes = [
  { path: '', component: FlvComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
