"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserRepository = void 0;
const User_1 = require("../../core/entities/User");
class UserRepository {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (yield Promise.resolve().then(() => __importStar(require('../../infrastructure/db/database')))).getClient();
            yield client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [user.username, user.password]);
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (yield Promise.resolve().then(() => __importStar(require('../../infrastructure/db/database')))).getClient();
            const res = yield client.query('SELECT * FROM users WHERE username = $1', [username]);
            if (res.rows.length === 0) {
                return null;
            }
            const row = res.rows[0];
            return new User_1.User(row.id, row.username, row.password);
        });
    }
}
exports.UserRepository = UserRepository;
