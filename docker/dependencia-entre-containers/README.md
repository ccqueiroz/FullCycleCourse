## Dependência Entre Containers

Caso de uso:
<p>
    Possuindo 2 containers, onde 1 container é um aplicativo NodeJs, possuindo dependência do banco de dados para comunicação e outro aplicativo é um container MySQL. Caso o container com NodeJs execute antes do container MySQL, o mesmo irá encerrar a sua atividade por erro de comunicação com o banco de dados.
</p>

Abordagens:
- flag depends_on:

<p>Na versão 2.0 do compose, atribuía a instrução para que o container esperasse a execução de outro container, porém na versão 3.0, pode haver falhas neste processo, pois o container que está sendo apontado como dependência executará processos internos e na faz parte da atribuição do container que possui a flag depends_on ter responsabilidades da execução interna de outro container.</p>

- dockerize:
<p>
Repositório: https://github.com/jwilder/dockerize
</p>

- wait-for-it:
<p>
Repositório: https://github.com/codeedu/docker-wait-for-it
</p>

- Health Check:
<p>
Opção nativa do Docker
</p>
<pre>
    # container MySQL

    healthcheck:
        test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p$$MYSQL_ROOT_PASSWORD"]
        interval: 5s
        timeout: 10s
        retries: 3
</pre>
<pre>
    # container Node.js

    depends_on:
        database:
        condition: service_healthy
</pre>

Exemplo Completo
<pre>
    version: "3"

    services:
    
    app:
        build: 
            context: ./app
        container_name: app
        volumes:
            - ./app:/usr/src/app
        entrypoint: sh -c "npm install && npm run dev"
        ports:
            - 3000:3000
        depends_on:
            database:
                condition: service_healthy

    database:
        build: 
            context: ./database
        container_name: database
        volumes:
            - mysql:/var/lib/mysql
            - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
        environment:
            - MYSQL_DATABASE=nodedb
            - MYSQL_ROOT_PASSWORD=root
        healthcheck:
            test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p$$MYSQL_ROOT_PASSWORD"]
            interval: 5s
            timeout: 10s
            retries: 3
        
    volumes:
        mysql:
            driver: local
</pre>