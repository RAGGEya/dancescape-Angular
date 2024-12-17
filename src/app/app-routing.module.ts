import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponentComponent } from './FrontOffice/all-template-front-component/all-template-front-component.component';
import { EventComponent } from './event/event.component';
import { DanceCategoryComponent } from './dance-category/dance-category.component';
import { AllTemplateBackComponentComponent } from './BackOffice/all-template-back-component/all-template-back-component.component';
import { BackEventComponent } from './back-event/back-event.component';
import { BackDanceCatComponent } from './back-dance-cat/back-dance-cat.component';
import { FrontComponent } from './front/front.component';
import { SignupComponent } from './signup/signup.component';
import { ProfilComponent } from './profile/profil.component';



const routes: Routes = [

{path:"", component:AllTemplateFrontComponentComponent},
{path:'back', component:AllTemplateBackComponentComponent},
{ path: 'login', component: FrontComponent },
{ path: 'register', component: SignupComponent },


  { path: 'backEvents', component: BackEventComponent },
  { path: 'backDance', component: BackDanceCatComponent },
  { path: 'profile', component: ProfilComponent },


{ path: 'events', component: EventComponent },
{ path: 'DanceCat', component: DanceCategoryComponent }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
