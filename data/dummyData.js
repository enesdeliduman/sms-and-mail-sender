const User = require('../models/User.js')
const { sequelize } = require('./databaseConnect.js')

module.exports.createDummyData = async () => {
  try {
    await sequelize.sync({ force: true })
    console.log('Dummy veriler başarıyla oluşturuldu.')
  } catch (error) {
    console.error('Dummy veriler oluşturulurken bir hata oluştu:', error)
  }
}