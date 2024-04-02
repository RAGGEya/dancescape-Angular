import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponentComponent } from './FrontOffice/all-template-front-component/all-template-front-component.component';
import { AccomodationComponent } from './accomodation/accomodation.component';
import { LogisticsComponent } from './logistics/logistics.component';
const routes: Routes = [
  {
    path :"",
    component:AllTemplateFrontComponentComponent
  },
  {path:'accomodations', component : AccomodationComponent},
  {path:'Logistics', component : LogisticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
