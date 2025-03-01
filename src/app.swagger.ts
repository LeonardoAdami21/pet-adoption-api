import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NODE_ENV, PORT } from './env/envoriment';

export const initSwagger = (app: INestApplication) => {
  const HOST =
    NODE_ENV === 'development'
      ? `http://127.0.0.1:${PORT}/v2`
      : 'https://api.script-recuperacao.com.br/v2';

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Script Recuperação')
    .addServer('https://api.script-recuperacao.com.br', 'Servidor de Produção')
    .addServer(`http://localhost:${PORT}`, 'Servidor Local')
    .addServer(
      `https://api-hml.script-recuperacao.com.br`,
      'Servidor de Homologação',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Insira o Token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .setVersion('3.1.5')
    .setLicense('MIT', 'https://opensource.org/license/mit/')
    .setDescription('API REST ')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/v2/docs', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      filter: true,
      docExpansion: 'none',
      tagsSorter: 'alpha',
      operationsSorter: 'method',
      urls: [{ url: `${HOST}/docs-json` }],
    },
  });
};
