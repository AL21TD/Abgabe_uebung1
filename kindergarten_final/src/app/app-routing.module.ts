import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KindergartenDetailsComponent } from './kindergarden-details/kindergarden-details.component';
import { KindergartenListDetailsComponent } from './kindergarden-list-details/kindergarden-list-details.component';
import { AddDataComponent } from './dashboard/add-data/add-data.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'kindergarden/:id', component: KindergartenDetailsComponent },
  { path: 'kindergarden-details', component: KindergartenListDetailsComponent },
  { path: 'addnewuser', component: AddDataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
