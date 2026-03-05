'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await queryInterface.bulkDelete("Admins", null, {});

    await queryInterface.bulkInsert('Admins', [{
      username: 'admin',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};
