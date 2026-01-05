import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsService } from './dogs/dogs.services';
import { DogsController } from './dogs/dogs.controller';

@Module({
  imports: [],
  controllers: [AppController, DogsController],
  providers: [AppService, DogsService],
})
export class AppModule {}
