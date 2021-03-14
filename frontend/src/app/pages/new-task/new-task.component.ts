import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit
{
  listID: string;
  constructor(private taskser: TaskService, private router: Router, private route: ActivatedRoute)
  {
    this.route.params.subscribe((params: Params) => this.listID = params.listID);
  }

  ngOnInit(): void
  {
  }
  addItem(val: string)
  {
    this.taskser.createTask(this.listID, val).subscribe(() => this.router.navigate(['../'], { relativeTo: this.route }));
  }
}
