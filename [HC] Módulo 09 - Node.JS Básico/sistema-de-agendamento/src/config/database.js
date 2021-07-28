module.exports = {
    dialect: 'postgres',
    host: '192.168.177.2',
    username: 'postgres',
    password: 'docker',
    database: 'sistemadeagendamento',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    }
}