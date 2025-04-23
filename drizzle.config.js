
export default {
    schema: './config/schema.js',
    driver: 'durable-sqlite',  
    dialect: 'sqlite',         
    dbCredentials: {
      url: './database/data.db',  
    },
  };
  
