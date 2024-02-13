import bcrypt from 'bcrypt';

export default {
    hashPassword: async function hashPassword(password: string) {
        const saltRounds = 10;
        try {
            let hash = await bcrypt.hash(password, saltRounds)
            return hash;
        } catch (e) {
            throw e;
        }
    },
    comparePassword: async function comparePassword(inputPassword: string, hashedPassword: string) {
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