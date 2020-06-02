import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router'
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-create-edit-employee',
  templateUrl: './create-edit-employee.component.html',
  styleUrls: ['./create-edit-employee.component.scss']
})
export class CreateEditEmployeeComponent implements OnInit {

  public employee: Employee = <Employee>{};
  public title = 'Create an Employee!';
  public employeeId = null;

  constructor(private employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRouteParameters();
  }

  /**
  * Get all Route parameters
  */
  getRouteParameters() {
    this.activatedRoute.params.subscribe(parameter => {
      if (!!parameter.id) {
        this.employeeId = parameter.id;
        this.title = 'Edit an Employee!';
        this.employeeService.getById(parameter.id).subscribe((res: any) => {

          console.log(res);
          if (res.status == "success") {
            this.employee = res.data
          } else {
            //records not exists
            this.router.navigate(['employee']);
          }
        });
      }

    });
  }
  submit(employeeForm: NgForm) {
    if (employeeForm.invalid) {
      return null;
    } else
      if (this.employeeId) {
        //to update
        this.employeeService.put(this.employee).subscribe(res => {
          this.router.navigate(['employee']);
        });
      } else {
        //to create
        let employee = { name: this.employee.employee_name, salary: this.employee.employee_salary, age: this.employee.employee_age }
        this.employeeService.create(employee).subscribe(response => {
          console.log(response);
          if (response.status === "success") {
            this.router.navigate(['employee']);
          }
        });
      }


  }

}
