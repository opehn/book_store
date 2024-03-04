"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getOneMonthAgo: function getOneMonthAgo() {
        var currentTimeInSeoul = new Date();
        currentTimeInSeoul.setMinutes(currentTimeInSeoul.getMinutes() + currentTimeInSeoul.getTimezoneOffset() + 540);
        var oneMonthBefore = new Date();
        oneMonthBefore.setMonth(currentTimeInSeoul.getMonth() - 1);
        return (oneMonthBefore);
    }
};
