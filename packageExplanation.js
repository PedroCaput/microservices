{
    "name": "pedro_codando_microservice",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT",
    "dependencies": {
      "@hapi/hapi": "^21.3.2",
      "@types/amqplib": "^0.10.1",
      "@types/cors": "^2.8.13",
      "@types/express": "^4.17.17",
      "@types/sinon": "^10.0.14", // Tipagens TypeScript para o sinon, que é uma biblioteca de mocks/spies/stubs pra testes.
      "amqplib": "^0.10.3", // Lib que permite comunicação com RabbitMQ (mensageria entre microsserviços).
      "axios": "^1.8.4",
      "cors": "^2.8.5", // Lib pra liberar ou restringir acesso entre domínios diferentes (CORS = Cross-Origin Resource Sharing). Muito usado quando seu frontend e backend estão em domínios diferentes.
      "express": "^4.18.2", // Framework web minimalista para Node.js. Super usado pra APIs REST.
      "nodemon": "^2.0.22", // Monitora mudanças nos arquivos e reinicia o app automaticamente. Usado em dev.
     //"pg-promise": "^11.4.3", // Biblioteca para usar PostgreSQL com Promises, de forma fluente e moderna. Alternativa ao Sequelize ou TypeORM pra SQL puro com código organizado.
      "sinon": "^15.0.4", // Biblioteca para testes: permite criar mocks, spies e stubs (testar comportamentos isolados).
      "ts-node": "^10.9.1", // Permite rodar arquivos .ts diretamente com Node.js sem compilar antes.
      "typescript": "^5.0.4" // O compilador TypeScript oficial. Necessário pra qualquer projeto .ts.
    },
    "devDependencies": {
      "@types/jest": "^29.5.14",
      "jest": "^29.7.0", // Framework de testes do próprio time do Node/Facebook. Muito usado pra testar funções e APIs.
      "ts-jest": "^29.3.2"
    }
  }