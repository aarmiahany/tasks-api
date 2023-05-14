import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';

describe('TasksController', () => {
  let controller: TasksController;
  const mockTasksService = {
    getAllTasks: jest.fn(() => []),
    getTaskById: jest.fn((id) => ({
        'id': id
    })),
    createTask: jest.fn((dto) => ({
        'id': '123',
        ...dto
    })),
    deleteTask: jest.fn(id => ({
        'id': id
    })),
    updateTask: jest.fn((id, dataToUpdate) => ({
        'id': id,
        'description': '',
        'creatorId': '123',
        'completed': false,
        ...dataToUpdate
    }))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
      controllers: [TasksController],
    })
    // override service
    .overrideProvider(TasksService)
    .useValue(mockTasksService)
    // override guard
    .overrideGuard(AuthGuard)
    .useValue({})
    .compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should GET:/ all tasks', async () => {
    expect(await controller.getAllTasks()).toEqual([]);
  }); 

  it ('should GET:/:id get task by Id', async () => {
    const id = '123';
    expect(await controller.getTaskById(id)).toEqual({
        'id': '123'
    });
  });

  it ('should POST:/ create a new task', async () => {
    const dto : any = {
       'name': 'task 1',
       'description': '',
       'creatorId': '123',
       'completed': false
    };
    expect(await controller.createTask(dto)).toEqual({
        'id': '123',
        'name': 'task 1',
        'description': '',
        'creatorId': '123',
        'completed': false
    });
  });

  it ('should PUT:/ update a task', async () => {
    const id = '123';
    const req : any = {
        'params': {
            id
        }
    };
    const dataToUpdate : any = {
       'name': 'task 1 updated',
    };
    expect(await controller.updateTask(dataToUpdate, req)).toEqual({
        'id': '123',
        'name': 'task 1 updated',
        'description': '',
        'creatorId': '123',
        'completed': false
    });
  });

  it ('should DELETE:/:id delete task by Id', async () => {
    const id = '123';
    expect(await controller.deleteTask(id)).toEqual({
        'id': '123'
    });
  });
});
