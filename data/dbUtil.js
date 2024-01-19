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
    },
    getOneMonthAgo: function getOneMonthAgo() {

        let currentTimeInSeoul = new Date();
        currentTimeInSeoul.setMinutes(currentTimeInSeoul.getMinutes() + currentTimeInSeoul.getTimezoneOffset() + 540);
        let oneMonthBefore = new Date();
        oneMonthBefore.setMonth(currentTimeInSeoul.getMonth() - 1);
        return (oneMonthBefore);
    }
}