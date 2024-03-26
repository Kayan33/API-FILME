import { DataSource } from 'typeorm';
import { Serie } from './serie.entity';

export const serieProviders = [
  {
    provide: 'SERIE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Serie),
    inject: ['DATA_SOURCE'],
  },
];