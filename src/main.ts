import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

(async () => {
  const PORT = process.env.PORT || 8000;
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Test nest')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/v1/api-docs', app, document);

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
})();