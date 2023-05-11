import * as Joi from 'joi';

export const updateTaskSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  completed: Joi.boolean().optional()
}).optional()

// Endpoint payload in the PUT Request
export class UpdateTaskDto {
  name?: string;
  description?: string;
  completed?: boolean;
}