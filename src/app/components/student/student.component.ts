import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.getStudents().subscribe(data => {
      console.log(data);
    })        
  }

}
