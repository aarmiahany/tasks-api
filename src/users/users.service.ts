import { Injectable } from '@nestjs/common';

// user model
export type User = {
    userId: number,
    username: string,
    password: string
};

@Injectable()
export class UsersService {
  // create fake list of users for jwt auth
  private readonly users : User[] = [
    {
      userId: 1,
      username: 'user1',
      password: 'pass1',
    },
    {
      userId: 2,
      username: 'user2',
      password: 'pass2',
    },
  ];

  // find user method
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}