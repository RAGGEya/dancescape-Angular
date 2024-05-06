import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateFrontComponentComponent } from './FrontOffice/all-template-front-component/all-template-front-component.component';
import { AllTemplateBackComponentComponent } from './BackOffice/all-template-back-component/all-template-back-component.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { NavBarBackComponent } from './BackOffice/nav-bar-back/nav-bar-back.component';
import { SideBarBackComponent } from './BackOffice/side-bar-back/side-bar-back.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { EventComponent } from './event/event.component';
import { DanceCategoryComponent } from './dance-category/dance-category.component';
import {HttpClientModule} from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EmailSenderComponent } from './email-sender/email-sender.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    AllTemplateFrontComponentComponent,
    AllTemplateBackComponentComponent,
    HeaderFrontComponent,
    FooterFrontComponent,
    NavBarBackComponent,
    SideBarBackComponent,
    FooterBackComponent,
    EventComponent,
    DanceCategoryComponent,
    EmailSenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, 
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
