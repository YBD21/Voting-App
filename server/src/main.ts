import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    
    // Get configuration with defaults
    const port = configService.get<number>('PORT', 3000);
    const clientPort = configService.get<number>('CLIENT_PORT', 3000);
    
    // Configure CORS
    configureCors(app, clientPort);
    
    // Start the server
    await app.listen(port);
    logger.log(`Server running on port ${port}`);
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
}

function configureCors(app: INestApplication<any>, clientPort: number) {
  app.enableCors({
    origin: [
      `http://localhost:${clientPort}`,
      new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${clientPort}$/`),
    ],
  });
}

bootstrap();
