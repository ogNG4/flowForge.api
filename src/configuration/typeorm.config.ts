import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = {
    name: 'tablica-kanban',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'tablica-kanban',
    synchronize: false,
    autoLoadEntities: true,
    entities: ['**/*.entity.js'],
    migrations: ['dist/migrations/**/*{.js,.ts}'],
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
