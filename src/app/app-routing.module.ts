import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ManageMaintanceComponent } from './components/manage-maintance/manage-maintance.component';
import { ManageVehicleComponent } from './components/manage-vehicle/manage-vehicle.component';
import { ManageRentServiceComponent } from './components/manage-rent-service/manage-rent-service.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'managemaintenance', component:ManageMaintanceComponent},
  {path: 'managevehicle', component:ManageVehicleComponent},
  {path: 'managerent', component:ManageRentServiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
