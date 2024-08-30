import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ManageVehicleComponent } from './components/manage-vehicle/manage-vehicle.component';
import { ManageMaintanceComponent } from './components/manage-maintance/manage-maintance.component';
import { ManageRentServiceComponent } from './components/manage-rent-service/manage-rent-service.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { AddRentComponent } from './components/add-rent/add-rent.component';
import { AddMaintanceComponent } from './components/add-maintance/add-maintance.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ManageVehicleComponent,
    ManageMaintanceComponent,
    ManageRentServiceComponent,
    AddVehicleComponent,
    AddRentComponent,
    AddMaintanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, 
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
