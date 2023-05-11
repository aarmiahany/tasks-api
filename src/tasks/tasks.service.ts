import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schema/tasks.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { ObjectId } from 'mongoose';
import { UpdateTaskDto } from './dto/update-task.dto';

// tasks services
@Injectable()
export class TasksService {
  // inject Mongoose model
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  // get all tasks service
  async getAllTasks (): Promise<Array<Task>> {
    return this.taskModel.find().exec()
  }

  // get a task by id service
  async getTaskById (id: ObjectId | string) : Promise<Task | null> {
    return this.taskModel.findOne({ '_id': id });
  }

  // create a task service
  async createTask(createTaskDto: CreateTaskDto) : Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  // update a task service
  async updateTask (id : ObjectId | string,  dataToUpdate: UpdateTaskDto) : Promise<Task | null> {
    return this.taskModel.findByIdAndUpdate(id, dataToUpdate, { returnDocument: 'after'});
  }

  // delete a task service
  async deleteTask (id: ObjectId | string) {
    return this.taskModel.deleteOne({ '_id' : id});
  }
}