import { Controller, Get, Post, Body, UsePipes, Delete, Param, Put, Req, Logger, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDto, createTaskSchema } from './dto/create-task.dto';
import { TaskValidationPipe } from './pipes/tasksValidator.pipe';
import { TaskIdValidationPipe } from './pipes/taskIdValidator.pipe';
import { Task } from './schema/tasks.schema';
import { ObjectId } from 'mongoose';
import { UpdateTaskDto, updateTaskSchema } from './dto/update-task.dto';
import { AuthGuard } from '../auth/auth.guard';

// tasks endpoint
@Controller('tasks')
// enable jwt auth
@UseGuards(AuthGuard)
export class TasksController {
  // init logger utils
  private readonly logger = new Logger(TasksController.name);

  constructor(private readonly tasksService: TasksService) {}

  // get all tasks handler
  @Get()
  async getAllTasks(): Promise<Array<Task>> {
    this.logger.log('GET: all tasks');
    return this.tasksService.getAllTasks();
  }

  // get a task by id handler
  @Get(':id')
  async getTaskById(@Param('id', new TaskIdValidationPipe()) id: ObjectId | string): Promise<Task | null> {
    this.logger.log(`GET: task with ${id}`);
    return this.tasksService.getTaskById(id);
  }

  // create new task handler
  @Post()
  // add validation for input payload
  @UsePipes(new TaskValidationPipe(createTaskSchema))
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    this.logger.log('POST: create new task');
    return this.tasksService.createTask(createTaskDto);
  }

  // update a task handler
  @Put(':id')
  // add validation for input payload to update
  @UsePipes(new TaskValidationPipe(updateTaskSchema))
  async updateTask (@Body() dataToUpdate: UpdateTaskDto, @Req() req: Request) : Promise<Task | null> {
    const { id } = req.params;
    // log
    this.logger.log(`PUT: update task with id ${id}`);
    return this.tasksService.updateTask(id, dataToUpdate);
  }


  // delete a task handler
  @Delete(':id')
  // add validation for mongodb id
  async deleteTask(@Param('id', new TaskIdValidationPipe()) id: ObjectId | string) : Promise<any> {
    this.logger.log(`PUT: delete task with id ${id}`);
    return this.tasksService.deleteTask(id);
  }
}
