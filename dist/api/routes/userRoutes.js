"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const userHandler_1 = require("../../handlers/userHandler");
const handler = async (event) => {
    switch (event.httpMethod) {
        case 'POST':
            if (event.path === '/register') {
                return (0, userHandler_1.registerHandler)(event);
            }
            if (event.path === '/login') {
                return (0, userHandler_1.loginHandler)(event);
            }
            return { statusCode: 404, body: 'Not Found' };
        default:
            return { statusCode: 405, body: 'Method Not Allowed' };
    }
};
exports.handler = handler;
