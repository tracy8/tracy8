const bcrypt = require('bcrypt')

async function hashPassword (password){
    const salt = await bcrypt.genSalt(15)
    const hashed = await bcrypt.hash(password,salt)

    console.log(`The salt is   ${salt}`)
    console.log(`The hashed password is   :    ${hashed}`)
    return  hashed
}

module.exports = hashPassword