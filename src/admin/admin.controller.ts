import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Get admin credentials' })
  @ApiOkResponse({ description: 'Admin credentials fetched successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('credentials')
  async getAdminCredentials(req: Request, res) {
    return this.adminService.getAdminCredentials(req, res);
  }
}
