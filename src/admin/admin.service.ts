import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
    constructor() {}

    async getAdminCredentials(req, res) {
        const credentials = {
            username: 'admin',
            password: 'admin',
        }
        return credentials;
    }
}
