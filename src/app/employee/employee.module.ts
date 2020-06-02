import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { Routes, RouterModule } from '@angular/router';
import { CreateEditEmployeeComponent } from './create-edit-employee/create-edit-employee.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'create', component: CreateEditEmployeeComponent },
  { path: 'create/:id', component: CreateEditEmployeeComponent },
];



@NgModule({
  declarations: [EmployeeListComponent, EmployeeManagementComponent, CreateEditEmployeeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [RouterModule]
})
export class EmployeeModule { }
