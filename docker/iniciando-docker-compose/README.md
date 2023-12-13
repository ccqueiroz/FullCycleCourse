## Iniciando com Docker Compose

O Docker compose é uma ferramenta complementar ao Docker, baseada em um arquivo de manifesto, onde são montados todos os containers especificados no services do arquivo docker-compose.yaml
- Para iniciar a construção dos containers: ```docker compose up```
- Para encerrar os containers: ```docker compose down```
<pre>
    version: '3.0'

    services:
        laravel:
            image: caioqueiroz/laravel:prod
            container_name: laravel
            networks:
            - laranet
        nginx:
            image: caioqueiroz/nginx:prod
            container_name: nginx
            networks:
            - laranet
            ports:
            - "8080:80"
    networks:
        laranet:
            driver: bridge
</pre>
- version: versão do Docker Compose
- services: serviços (containers) que serão montados/instânciados
- networks: as redes que fará(ão) parte da comunicação entre containers.