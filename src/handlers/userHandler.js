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
exports.loginHandler = exports.registerHandler = void 0;
const registerUser_1 = require("../core/usecases/registerUser");
const loginUser_1 = require("../core/usecases/loginUser");
const userRepository_1 = require("../data/repositories/userRepository");
const userRepository = new userRepository_1.UserRepository();
const registerHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = JSON.parse(event.body || '{}');
        const registerUser = new registerUser_1.RegisterUser(userRepository);
        yield registerUser.execute(username, password);
        return { statusCode: 201, body: JSON.stringify({ message: 'User registered successfully' }) };
    }
    catch (err) {
        if (err instanceof Error) {
            return { statusCode: 500, body: JSON.stringify({ message: 'Error registering user', error: err.message }) };
        }
        return { statusCode: 500, body: JSON.stringify({ message: 'Error registering user', error: 'Unknown error' }) };
    }
});
exports.registerHandler = registerHandler;
const loginHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = JSON.parse(event.body || '{}');
        const loginUser = new loginUser_1.LoginUser(userRepository);
        const token = yield loginUser.execute(username, password);
        return { statusCode: 200, body: JSON.stringify({ message: 'Login successful', token }) };
    }
    catch (err) {
        if (err instanceof Error) {
            return { statusCode: 401, body: JSON.stringify({ message: 'Invalid username or password', error: err.message }) };
        }
        return { statusCode: 401, body: JSON.stringify({ message: 'Invalid username or password', error: 'Unknown error' }) };
    }
});
exports.loginHandler = loginHandler;
