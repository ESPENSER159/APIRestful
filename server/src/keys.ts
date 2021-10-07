export default {

    database: {
        host: process.env.DATABASE_HOST || '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'PassSecret',
        database: 'persons'
    }

}