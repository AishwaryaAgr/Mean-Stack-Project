import { Injectable } from '@angular/core';
import Task from '../models/task';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private web: WebService) { }

  getLists(){
    return this.web.get('lists');
  }

  createList(title:string){
    return this.web.post('lists',{title});
  }
  getTasks(listID:string){
    return this.web.get(`lists/${listID}/task`);
  }
  createTask(listID:string,title:string){
    console.log(listID);
    return this.web.post(`lists/${listID}/task`,{title});
  }
  deleteList(listID:string){
    return this.web.delete(`lists/${listID}`);
  }
  deleteTask(listID:string , taskID:string){
    return this.web.delete(`lists/${listID}/task/${taskID}`);
  }
  taskCompleted(task:Task){
    return this.web.patch(`lists/${task.listID}/task/${task._id}`,{complete :!task.complete})
  }
}
