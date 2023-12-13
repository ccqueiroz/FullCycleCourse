## Buildando Imagens com o Docker Compose

Para buildar imagens com o docker compose, deve-se:
- Criar um arquivo docker-compose.yaml

    - version: Especifica a versão do docker compose
    - services: Especifica os containers que serão construídos
    - build:
        - context: Determina o contexto que está o Dockerfile para a contrução da imagem e do container
        - dockerfile: Espeficica qual arquivo de Dockerfile será utilizado
        - plataform: Determina qual tipo de plataforma a imagem está ambientada
        - command: Especifica quais serão os comandos utilizados para instanciar o containers (CMD)
        - entrypoint: Especifica qual será o entrypoint (ENTRYPOINT)
        - container_name: Determina qual será o nome do container
        - restart: Determina como serão as tratativas de restart do container, principalmente em caso de erros
        - tty: Conecta o terminal de um usuário ao fluxo de stdin e stdout de um container
        - environment: Determina quais serão as variáveis de ambiente utilizadas no container
        - networks: Determina quais serão as redes que aquele container fará parte
        - volumes: Determina como serão atribuídas o compartilhamento de arquivos/diretórios entre host:container a partir do bind mount ou da montagem de um volume Docker
        - depends_on: Especifica quais containers/serviços o container de referência dependerá.
            - A partir da versão 3.0 do Docker Compose a dependência entre containers é a partir da montagem. Não sendo atruição do docker compose verificar se o container está montado integralmente
        - ports: Especifica o bind de exposição de portas externa:container
        - profiles: Especifica o tipo de profile que será atribuído, ou seja, quando utilizar o comando ```docker compose up``` sem passar um profile específico, o serviço que possuir esta flag não será instânciado. 
    - networks: Cria as redes de comunicação entre os containers
        - myNetWord:
            - driver: Estabelece qual tipo de driver de network será utilizado (bridge, host, etc.)