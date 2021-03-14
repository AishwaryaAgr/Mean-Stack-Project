import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import List from 'src/app/models/list';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskser:TaskService, private router:Router ) { }

  ngOnInit(): void {
  }
  addItem(val: string){
    this.taskser.createList(val).subscribe((list: List)=>{
      this.router.navigate(['/lists',list._id]);
    });
  }

}
