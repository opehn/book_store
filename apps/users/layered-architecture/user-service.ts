import { LoginInfo, UserInfo } from '../types'
import logger from '../../../shared/logger/index.js';
import { UserRepository, getRepoInstance } from './user-db';
import bcrypt = require('bcrypt');
const userTable = 'USERS_TB';

//TODO : DI bcrypt, logger if required

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        try {
            let hash = await bcrypt.hash(password, saltRounds)
            return hash;
        } catch (e) {
            throw e;
        }
    }

    async comparePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            const result: boolean = await bcrypt.compare(inputPassword, hashedPassword);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async isEmailMatch(email: string): Promise<number> {
        try {
            const matchedUser = await this.userRepository.selectUserByEmail(email);
            if (matchedUser.length)
                return matchedUser[0].id;
            else
                return 0;
        }
        catch (e) {
            throw e;
        }
    }

    async isPasswordMatch(loginInfo: LoginInfo): Promise<boolean> {
        try {
            console.log("logininfo :", loginInfo);
            const hashedPassword = await this.userRepository.selectPasswordByEmail(loginInfo.email);
            if (!hashedPassword)
                return false;
            const result: boolean = await bcrypt.compare(loginInfo.password, hashedPassword);
            return result;
        } catch (e: any) {
            logger.reportDbErr(userTable, 'SELECT', e.message);
            throw e;
        }
    }

    async join(userInfo: UserInfo): Promise<any> {
        try {
            const isUserDuplicate = await this.isEmailMatch(userInfo.email);
            if (isUserDuplicate) {
                return {
                    message: '중복된 이메일입니다',
                    err: 'Duplicate'
                };
            } else {
                const hash = await this.hashPassword(userInfo.password);
                userInfo.password = hash;
                await this.userRepository.insertUser(userInfo);
                return { err: 'Success' };
            }
        } catch (e) {
            throw e;
        }
    }

    async login(loginInfo: LoginInfo): Promise<any> {
        try {
            const isValidUser: number = await this.isEmailMatch(loginInfo.email);
            const isValidPassword: boolean = await this.isPasswordMatch(loginInfo);
            if (isValidUser && isValidPassword)
                return { userId: isValidUser };
            else if (isValidUser)
                return { userId: null, message: '패스워드가 일치하지 않습니다', err: 'Password' };
            else
                return { userId: null, message: '이메일이 일치하지 않습니다', err: 'Email' };
        } catch (e) {
            throw e;
        }
    }

    async updatePassword(email: string, newPassword: string) {
        try {
            const userId = await this.isEmailMatch(email);
            const hashedPassword = await this.hashPassword(newPassword);
            const result = await this.userRepository.updatePassword(userId, hashedPassword);
            return result;
        } catch (e: any) {
            logger.reportDbErr(userTable, 'UPDATE', e.message);
            throw e;
        }
    }
}

export function getServiceInstance() {
    return new UserService(getRepoInstance());
}