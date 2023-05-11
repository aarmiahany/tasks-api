import * as Joi from 'joi';

export const createTaskSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  creatorId: Joi.string().required()

  // id will be set by mongodb or v1 pkg
  // completed in creation should be false
})

// Endpoint payload in the POST Request
export class CreateTaskDto {
  id: string; // task id
  name: string; // task name
  description: string; // task description
  completed: boolean; // whether the task is completed or not
  creatorId: string; // user id who created the task
}