# Projeto Desafio Kanastra

## Descrição do Projeto

Este projeto foi desenvolvido como parte de um desafio proposto pela Kanastra. O objetivo era criar uma aplicação que incorporasse diversas tecnologias e solucionasse problemas específicos apresentados no desafio. A arquitetura foi construída utilizando Angular para o frontend e Python (Django) no backend. Além disso, foram integrados os bancos de dados Postgresql e MongoDB.
Para otimizar o processamento de dados, implementei o uso do RabbitMQ, que possibilitou a criação de filas para a execução assíncrona de tarefas, utilizando um worker em Python. Essa abordagem visa melhorar a eficiência operacional, especialmente em cenários que demandam processamento paralelo e assíncrono de dados.

## Tecnologias Utilizadas

- **Angular (Frontend):** O frontend da aplicação foi desenvolvido utilizando o framework Angular, proporcionando uma experiência de usuário dinâmica e responsiva. Utilizei Bootstrap na construção de alguns componentes, mas há espaço para melhorias no design. Embora a estética da aplicação seja importante para mim, a implementação atual reflete uma abordagem prática dentro das restrições temporais impostas pelo projeto, resultando em uma aparência mais alinhada ao "Bootstrap Vanilla".

- **Django (Backend):** O backend da aplicação foi construído com o framework Django, que oferece uma estrutura robusta para o desenvolvimento de aplicações web em Python.

- **Python:** A linguagem de programação Python foi a principal escolha para o desenvolvimento tanto no backend quanto para a criação do worker responsável pelo processamento de dados.

- **Postgresql:** Para armazenamento de dados relacionais, utilizei o Postgresql, garantindo consistência e eficiência nas operações de banco de dados.

- **MongoDB:** Para dados não relacionais, optei pelo MongoDB, permitindo flexibilidade e escalabilidade na manipulação de dados.

- **RabbitMQ:** A implementação do RabbitMQ permitiu a criação de filas de mensagens para otimizar o processamento assíncrono de tarefas, contribuindo para a eficiência do sistema.

## Como Executar o Projeto

### Utilizando Docker Compose

1. **Pré-requisitos:**

   - Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina.
   - Verifique se as seguintes portas estão disponíveis:
     - Frontend: 80
     - Backend: 8000
     - Postgresql: 5432
     - RabbitMQ: 5672 e 15672
     - MongoDB: 27017

2. **Execução:**

   - Navegue até o diretório do projeto onde o arquivo `docker-compose.yml` está localizado.
   - Execute o comando:
     ```bash
     docker-compose up
     ```

3. **Acesso à Aplicação:**

   - Acesse o frontend através do navegador utilizando o endereço fornecido após a execução bem-sucedida.

4. **Encerrando a Execução:**
   - Para interromper a execução, utilize o comando:
     ```bash
     docker-compose down
     ```

## Melhorias Futuras

Como melhorias futuras, planejo:

- Aprimorar a estética do frontend, considerando que utilizei Bootstrap na construção de alguns componentes, mas reconheço que há espaço para melhorias no design.
- Expandir a cobertura de testes unitários. Devido às restrições de tempo, alguns componentes principais possuem testes, mas reconheço a importância de uma cobertura mais abrangente.
- Implementar o uso de variáveis de ambiente para configurar informações sensíveis, como chaves de API e configurações específicas do ambiente. Devido ao tempo disponível, essas informações estão atualmente diretamente no código-fonte.
- Aperfeiçoar os feedbacks de erros para uma melhor experiência do usuário, fornecendo mensagens claras e informativas em caso de falhas ou exceções.
- Introduzir a verificação de duplicatas ao importar dados de arquivos CSV para o banco MongoDB. Esta implementação visa garantir que linhas ou conteúdos já existentes no banco sejam identificados e tratados durante o processo de importação, assegurando a integridade e a consistência dos dados.

## Observações Gerais

- Optei por desenvolver o frontend em Angular, mesmo tendo conhecimento em React. Essa escolha foi feita devido à minha maior experiência e fluência com Angular, o que me permitiu desenvolver o frontend de forma mais rápida e eficiente dadas as restrições de tempo disponível para o projeto.

## Contato

Para mais informações ou dúvidas, entre em contato:

- [Hugo Ferreira](mailto:hugof508@gmail.com)

Agradeço por explorar meu projeto do desafio!
Todo o código foi feito com muito ❤️
