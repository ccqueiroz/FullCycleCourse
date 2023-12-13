## Criando Banco de Dados MySQL com Docker Compose

Exemplo de docker-compose.yaml com banco de dados MySQL
<pre>
    version: '3.0'

    services:
        db:
            platform: linux/x86_64
            image: mysql:5.7
            command: --innodb-use-native-aio=0
            container_name: db
            restart: always
            tty: true
            volumes:
                - ./mysql:/var/lib/mysql
            environment:
                - MYSQL_DATABASE=nodedb
                - MYSQL_ROOT_PASSWORD=root
                - MYSQL_USER=admin
                - MYSQL_PASSWORD=admin
            networks:
                - node-network
    networks:
        node-network:
            driver: bridge
</pre>