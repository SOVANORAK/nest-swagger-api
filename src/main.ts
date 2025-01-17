import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('NEST API') // Optional: Add tags
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/doc', app, documentFactory); // 'api' is the Swagger UI endpoint

  await app.listen(process.env.PORT ?? 3000, () => {
    Logger.log('Server is running on http://localhost:3000', 'Bootstrap');
    Logger.log('Server is running on http://localhost:3000/doc', 'Bootstrap');
  });
}
bootstrap();
