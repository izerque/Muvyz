module.exports = {
    development: {
        database: 'muvy_db',
        username: 'postgres',
        password: 'your-password',
        host: 'localhost',
        dialect: 'postgres'
    },
    test: {
        database: 'muvy_db_test',
        username: 'postgres',
        password: 'your-password',
        host: 'localhost',
        dialect: 'postgres'
    },
    production: {
        database: 'muvy_db_production',
        username: 'postgres',
        password: 'your-password',
        host: 'localhost',
        dialect: 'postgres'
    }
};
