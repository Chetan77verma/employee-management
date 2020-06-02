import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  public employees: Array<Employee>;
  public copyofEmp: Array<Employee>;
  public filterString: string;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  /**
  * Fill the Table with data
  */

  getEmployees() {
    this.employees = new Array();
    this.employeeService.get().subscribe(res => {
      if (res.status == "success") {
        this.employees = res.data;
        this.copyofEmp = res.data;
        console.log(this.employees);
      }
    })
  }
  /**
  * Delete a Employee and update table
  */
  deleteEmployee(employee: Employee) {
    this.employeeService.delete(employee).subscribe(res => {
      console.log(res);
      if (res.status === "success") {
        this.getEmployees();
      }
    });
  }

  /**
  * Search element in Table
  */

  applySearch(filterValue: string) {
    console.log(filterValue);
    this.employees = []
    this.copyofEmp.forEach(element => {
      if (element.employee_name.toLowerCase().includes(filterValue.toLowerCase())) {
        this.employees.push(element)
      }
    });
  }

}
