import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import List from 'src/app/models/list';
import Task from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit
{
  lists: List[] = [];
  tasks: Task[] = [];
  listID: string;
  constructor(private taskserve: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void
  {
    this.taskserve.getLists()
      .subscribe((lists: List[]) => this.lists = lists);

    this.route.params.subscribe((params: Params) =>
    {
      this.listID = params.listID;
      if (!this.listID) return;
      this.taskserve.getTasks(this.listID).subscribe((tasks: Task[]) => this.tasks = tasks);
    });
  }

  onclick(task: Task)
  {
    this.taskserve.taskCompleted(task).subscribe(() => task.complete = !task.complete);
  }
  delete(task: Task)
  {
    const id = task._id;
    this.taskserve.deleteTask(task.listID, task._id).subscribe((task: Task) => this.tasks = this.tasks.filter(t => t._id != id));
  }
  deleteListss(list: List)
  {
    const id = list._id;
    this.taskserve.deleteList(id).subscribe(() =>
    {
      this.lists = this.lists.filter(l => l._id !== list._id)
    });
  }
  addTask(){
    if(!this.listID){
      alert('Please Select a List first');
      return;
    }
    this.router.navigate(['./new-task'] , {relativeTo: this.route});
  }

}
