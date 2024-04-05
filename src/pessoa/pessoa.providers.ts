import { DataSource } from 'typeorm';
import { pessoa } from './pessoa.entity';

export const pessoaProviders = [
  {
    provide: 'PESSOA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(pessoa),
    inject: ['DATA_SOURCE'],
  },
];