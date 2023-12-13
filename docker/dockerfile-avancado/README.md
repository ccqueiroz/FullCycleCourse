## Comandos Dockerfile

- FROM: Busca a imagem especificada
- WORKDIR: especifica o diretório de funcionamento do container.
- COPY host container: Copiar arquivos do host para o container.
- USER: Troca o nome do usuário do container
- RUN: Comando para executar diretivas
- EXPOSE: Determina em qual porta o container irá expor
- ENTRYPOINT: Modifica o entrypoint da imagem
- CMD: Passa parâmetros de inicialização sobreescrevendo comandos CMD da imagem
- AS: Cria um alias para imagem
- ENV: Permite criar variáveis de ambientes

#### Sempre que for criado um arquivo de entrypoint e adicionar a instrução exec "$@", esta instrução permitirá que um comando (CMD) vindo do usuário possa ser execudado.

<pre>
    #Dockerfile
    
    # 1º estágio
    FROM php:7.4-cli AS builder

    WORKDIR /var/www

    RUN apt-get update && \
        apt-get install libzip-dev -y && \
        docker-php-ext-install zip

    RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
        php -r "if (hash_file('sha384', 'composer-setup.php') === 'e21205b207c3ff031906575712edab6f13eb0b361f2085f1f1237b7126d785e826a450292b6cfd1d64d92e6563bbde02') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" && \
        php composer-setup.php && \
        php -r "unlink('composer-setup.php');"

    RUN php composer.phar create-project --prefer-dist laravel/laravel laravel
    # No estágio de build 1, foram gerados todos os conteúdos necessários e no estágio de build 2, foram copiados
    # os conteúdos gerados pelo estágio de build 1

    # 2º estágio
    FROM php:7.4-fpm-alpine

    WORKDIR /var/www
    RUN rm -rf /var/www/html
    COPY --from=builder /var/www/laravel .
    # dar permissões de maneira recursiva -R para o usuário www-data
    RUN chown -R www-data:www-data /var/www
    RUN ln -s public html
    EXPOSE 9000
    CMD ["php-fpm"]
</pre>