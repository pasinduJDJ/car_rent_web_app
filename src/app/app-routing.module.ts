import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ManageMaintanceComponent } from './components/manage-maintance/manage-maintance.component';
import { ManageVehicleComponent } from './components/manage-vehicle/manage-vehicle.component';
import { ManageRentServiceComponent } from './components/manage-rent-service/manage-rent-service.component';
import { AddMaintanceComponent } from './components/add-maintance/add-maintance.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { AddRentComponent } from './components/add-rent/add-rent.component';
import { SingelVehiclePageComponent } from './components/singel-vehicle-page/singel-vehicle-page.component';
import { AddCarRentComponent } from './components/add-car-rent/add-car-rent.component';
import { ManageCarRentComponent } from './components/manage-car-rent/manage-car-rent.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'home', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'manage/managemaintenance', component:ManageMaintanceComponent},
  {path: 'manage/managevehicle', component:ManageVehicleComponent},
  {path: 'manage/managerent', component:ManageRentServiceComponent},
  {path: 'manage/managecarpayment', component:ManageCarRentComponent},
  {path: 'add/addmaintenance', component:AddMaintanceComponent},
  {path: 'add/addvehicle', component:AddVehicleComponent},
  {path: 'add/addrent', component:AddRentComponent},
  {path: 'add/addrentcar', component:AddCarRentComponent},
  {path: 'single', component:SingelVehiclePageComponent},
  {path: 'home/:id/singleVehicle', component: SingelVehiclePageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
