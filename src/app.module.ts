import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { DogsService } from './dogs/dogs.services';
import { DogsController } from './dogs/dogs.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [DogsController],
  providers: [DogsService],
})
export class AppModule {}
