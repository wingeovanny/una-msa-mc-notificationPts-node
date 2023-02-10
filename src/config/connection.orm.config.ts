import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { setupEnvironment } from '@deuna/node-environments-lib';
setupEnvironment(true);

export type ConnectionOptions = PostgresConnectionOptions &
  TypeOrmModuleOptions & { seeds: string[] };

export const notificationConfig = (): ConnectionOptions => ({
  type: 'postgres',
  name: 'notification-trx-pts-merchant',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  logging: process.env.NODE_ENV === 'development' ? true : false,
  entities: [__dirname + '/../db/**/*.entity.[tj]s'],
  migrations: [__dirname + '/../db/migration/**/*.[tj]s'],
  seeds: [__dirname + '/../db/seeds/**/*.[tj]s'],
  cli: {
    migrationsDir: __dirname + '/../db/migration',
  },
  ssl: process.env.DB_SSL_ENABLED === 'true' ? true : false,
  extra:
    process.env.DB_SSL_ENABLED === 'true'
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : {},
  keepConnectionAlive: true,
});

export const config = notificationConfig();
