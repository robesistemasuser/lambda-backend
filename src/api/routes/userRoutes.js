"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const userHandler_1 = require("../../handlers/userHandler");
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.handler = handler;
