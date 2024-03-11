import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponentComponent } from './FrontOffice/all-template-front-component/all-template-front-component.component';
const routes: Routes = [


  {
    
    path:"",
  component:AllTemplateFrontComponentComponent
},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
