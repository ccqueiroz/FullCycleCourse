## Otimização de imagens utilizando multistage building

A estratégia de utilização de multistage building para gerar otimizações de imagens, dar-se por separar a construção de uma imagem final por etapas, onde:
    - 1º etapa: gera imagem, executam-se todos os processamentos devidos;
    - 2º etapa: gera-se um container com uma imagem mais limpa possível, sem muitas dependências, como por exemplo, imagens alpine ou mesmo imagens scratch, sendo esta, uma imagem mínima do Docker, sendo a base para construção de outras imagens. Após este processo, copia apenas os arquivos necessários da etapa 1 do processo. 

<pre>
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