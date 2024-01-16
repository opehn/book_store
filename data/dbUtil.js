const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: async function hashPassword(password) {
        const saltRounds = 10;
        try {
            let hash = await bcrypt.hash(password, saltRounds)
            return hash;
        } catch (e) {
            throw e;
        }
    },
    comparePassword: async function comparePassword(inputPassword, hashedPassword) {
        try {
            const match = await bcrypt.compare(inputPassword, hashedPassword);
            return match;
        } catch (error) {
            throw error;
        }
    }
}