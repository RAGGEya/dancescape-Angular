import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponentComponent } from './FrontOffice/all-template-front-component/all-template-front-component.component';
import { EventComponent } from './event/event.component';
import { DanceCategoryComponent } from './dance-category/dance-category.component';



const routes: Routes = [

{path:"", component:AllTemplateFrontComponentComponent},
{ path: 'events', component: EventComponent },
{ path: 'DanceCat', component: DanceCategoryComponent }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
