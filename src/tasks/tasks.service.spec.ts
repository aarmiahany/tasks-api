import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { Task, TaskDocument } from './schema/tasks.schema';
import { Model } from 'mongoose';

describe('TasksService', () => {

  let mockTaskModel: Model<TaskDocument>;
  let service: TasksService;

  const mockTaskRepo = {
    'find': jest.fn().mockImplementation(() => {
      return {
        'exec': () => []
      }
    }),
    'findOne': jest.fn().mockImplementation((id) => {
      return {
        ...id,
        'name': 'Task 1',
        'description': 'Task description',
        'completed': false,
        'creatorId': '123'
      }
    }),
    'findByIdAndUpdate': jest.fn().mockImplementation((id, dataToUpdate) => {
        return {
            '_id': id,
            'description': 'Task description',
            'creatorId': '123',
            ...dataToUpdate
        };
    }),
    'deleteOne': jest.fn().mockImplementation(id => ({
      'deleteCount': 1
    })),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, 
      // provide mongoose service
      {
        provide: getModelToken(Task.name),
        useValue: mockTaskRepo
      }],
    })
    .compile();

    mockTaskModel = module.get<Model<TaskDocument>>(getModelToken(Task.name));
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all tasks', async () => {
    expect(await service.getAllTasks()).toEqual([]);
  });

  it('should find a task by Id', async () => {
    const id = '123';
    expect(await service.getTaskById(id)).toEqual({
        '_id': '123',
        'name': 'Task 1',
        'description': 'Task description',
        'completed': false,
        'creatorId': '123'
    });
  });

it('should update a task by Id', async () => {
    const id = '123';
    const dataToUpdate : any = {
        'name': 'Task 1 updated',
        'completed': true,
    };
    expect(await service.updateTask(id, dataToUpdate)).toEqual({
        '_id': '123',
        'name': 'Task 1 updated',
        'description': 'Task description',
        'completed': true,
        'creatorId': '123'
    });
});

it('should delete a task by Id', async () => {
    const id = '123';
    const result = {
      'deleteCount': 1
    };
    expect(await service.deleteTask(id)).toEqual(result);
});

});
