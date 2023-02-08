export default () => ({
  service: {
    port: process.env.NOTIFICATION_SERVICE_PORT,
    node_env: process.env.NODE_ENV,
  },
  database: {
    typeorm_tokenization_username: process.env.TYPEORM_NOTIFICATION_USERNAME,
    typeorm_autorizer_password: process.env.TYPEORM_NOTIFICATION_PASSWORD,
    typeorm_autorizer_database: process.env.TYPEORM_NOTIFICATION_DATABASE,
    db_rotating_key: process.env.DB_ROTATING_KEY,
  },
});
