const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('testketnoi', 'root', 'tqh14122003', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

let connectdb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = connectdb;