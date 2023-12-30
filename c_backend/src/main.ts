import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, Module  } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { createConnection } from 'TypeORM';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { JwtStrategy } from './auth/jwt.strategy';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with your JWT secret key
      signOptions: { expiresIn: '1h' },
    }),
  ],
  // providers: [JwtStrategy],
  // exports: [JwtModule, JwtStrategy],
})
export class AuthModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.init();
  // await createConnection();

  //CORS configuration
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3500', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  const config = new DocumentBuilder()
  .setTitle('Communify')
  .setDescription('Discord like Instant Messaging and VoIP Social Platform')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type : "http",
      scheme : "bearer",
      bearerFormat : "JWT",
      name : "JWT",
      description : "Enter JWT Token",
      in : "header"
    }, "JWT-auth")
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
