const { sequelize } = require('../models');
const { queryInterface } = sequelize;

it('clear data', async () => {
    await queryInterface
            .bulkDelete('Users', {})

    await queryInterface
            .bulkDelete('Books', {})

    await new Promise(resolve => setTimeout(() => resolve(), 500)); 
})