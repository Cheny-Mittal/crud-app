import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/student';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phone', 'edit', 'delete'];
  dataSource: Student[] = [];
  studentForm: FormGroup;
  isEdit: boolean = false;
  
  constructor(private crudService: CrudService,
    private formBuilder: FormBuilder) {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      id: ['']
    })
  }
  
  
  ngOnInit(): void {
    this.crudService.getStudents().subscribe(data => {
      this.dataSource = data;
    })        
  }

  edit(element: Student): void {
    this.isEdit = true;
    this.studentForm.setValue(element);
  } 

  delete(id: number): void {
    let index = this.dataSource.findIndex((x) => x.id === id);
    this.dataSource.splice(index, 1);
    this.dataSource = this.dataSource.map(item => item);
  }

  update(): void {
    let value = this.studentForm.value;
    let index = this.dataSource.findIndex((x) => x.id === value.id);
    this.dataSource[index] = value;
    this.dataSource = this.dataSource.map(item => item);
    this.studentForm.reset();
    this.studentForm.markAsPristine();
    this.isEdit = false;
  }

  add(): void {
    let value = this.studentForm.value;
    value.id = this.dataSource[this.dataSource.length - 1].id + 1;
    this.dataSource.push(value);
    this.dataSource = this.dataSource.map(item => item);
    this.studentForm.reset();
    this.studentForm.markAsUntouched();
  }
}
