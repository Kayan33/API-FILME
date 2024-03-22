import { Module } from '@nestjs/common';
import { filmeProviders } from 'src/filme/filme.providers';
import { FilmeService } from 'src/filme/filme.service';
import { DatabaseModule } from '../database/database.module';
import { GeneroController } from './genero.controller';
import { generoProviders } from './genero.providers';
import { GeneroService } from './genero.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GeneroController],
  providers: [
    ...generoProviders,
    GeneroService,
  ],
})
export class GeneroModule {}