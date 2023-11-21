import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { config } from 'dotenv';

import UserEntity from './modules/users/entities/user.entity';

config();

const configService = new ConfigService();

console.log(__dirname);

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [UserEntity],
  migrations: [join(__dirname, 'migrations', '*.{js,ts}')],
  migrationsTableName: 'migrations',
});
