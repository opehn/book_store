import bcrypt = require('bcrypt');

export default {
    getOneMonthAgo: function getOneMonthAgo() {
        let currentTimeInSeoul = new Date();
        currentTimeInSeoul.setMinutes(currentTimeInSeoul.getMinutes() + currentTimeInSeoul.getTimezoneOffset() + 540);

        let oneMonthBefore = new Date();
        oneMonthBefore.setMonth(currentTimeInSeoul.getMonth() - 1);
        return (oneMonthBefore);
    }
}