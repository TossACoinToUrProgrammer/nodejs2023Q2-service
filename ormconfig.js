module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'putinloh',
  database: 'nodejs-service',
  synchronize: true,
  logging: true,
  entities: ['dist/**/*.entity.js'], // Adjust based on your project structure
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
