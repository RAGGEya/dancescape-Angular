import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterBackComponent } from './footer-back/footer-back.component';
import { NavbarBackComponent } from './navbar-back/navbar-back.component';
import { SidebarBackComponent } from './sidebar-back/sidebar-back.component';
import { AccomodationComponent } from './accomodation/accomodation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AllTemplateFrontComponentComponent } from './FrontOffice/all-template-front-component/all-template-front-component.component';
import { LogisticsComponent } from './logistics/logistics.component';

@NgModule({
  declarations: [
    AppComponent,

    FooterBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    AccomodationComponent,
    AllTemplateFrontComponentComponent,
    LogisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
