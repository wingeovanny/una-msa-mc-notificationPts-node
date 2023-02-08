import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { setupEnvConfig } from '@deuna/node-shared-lib';
setupEnvConfig();

const tsPath = path.resolve(__dirname, `../../../../qrTransactionToken`);
const jsPath = path.resolve(__dirname, `../../../../../qrTransactionToken`);
const dbTokenPath = fs.existsSync(tsPath) ? tsPath : jsPath;

export type ConnectionOptions = PostgresConnectionOptions &
  TypeOrmModuleOptions & { seeds: string[] };

export const notificationConfig = (): ConnectionOptions => ({
  type: 'postgres',
  name: 'merchant-notification',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  username: process.env.TYPEORM_NOTIFICATION_USERNAME,
  password:
    process.env.CLOUD_SERVICE_PROVIDER?.toUpperCase() === 'AWS'
      ? fs.readFileSync(dbTokenPath).toString()
      : process.env.TYPEORM_NOTIFICATION_PASSWORD,
  database: process.env.TYPEORM_NOTIFICATION_DATABASE,
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
