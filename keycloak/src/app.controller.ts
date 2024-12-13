import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard, RoleGuard, Roles } from 'nest-keycloak-connect';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  // @UseGuards(AuthGuard('keycloak'))
  @Roles({ roles: ["admin", "account"] })
  getHello(): string {
    return this.appService.getHello();
  }
}
