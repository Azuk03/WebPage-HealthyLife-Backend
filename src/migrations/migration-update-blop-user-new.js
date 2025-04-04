module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('Users', 'image', {
            type: Sequelize.BLOB('long'),
            allowNull: true,
        }).catch((error) => {
            console.error('Lỗi khi chạy migration up:', error);
            throw error;
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('Users', 'image', {
            type: Sequelize.STRING,
            allowNull: true,
        }).catch((error) => {
            console.error('Lỗi khi chạy migration down:', error);
            throw error;
        });
    }
};
