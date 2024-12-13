import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:9090',
      realm: 'gebrain',
      clientId: 'gebrain_tenent',
      secret: 'JtGBzP2yIt69BFsT67f6ETNKFlr5wMKN',
      // Secret key of the client taken from keycloak server
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ResourceGuard, // Protect resources by default
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard, // Enable role-based access control
    },
    AppService
  ],
  
})
export class AppModule {
  
}
