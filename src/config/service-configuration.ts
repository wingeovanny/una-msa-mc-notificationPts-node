export default () => ({
  service: {
    port: process.env.SERVICE_PORT,
    node_env: process.env.NODE_ENV,
  },
  database: {
    typeorm_tokenization_username: process.env.TYPEORM_USERNAME,
    typeorm_autorizer_password: process.env.TYPEORM_PASSWORD,
    typeorm_autorizer_database: process.env.TYPEORM_DATABASE,
    db_rotating_key: process.env.DB_ROTATING_KEY,
  },
});
