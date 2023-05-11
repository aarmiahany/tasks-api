import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRoot(process.env.DATABASE_URI || 'mongodb://localhost/tasks'), TasksModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
