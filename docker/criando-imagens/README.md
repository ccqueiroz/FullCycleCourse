## Trabalhando com Imagens Docker

As imagens são hospedadas no Docker Hub - Container Register, onde existe a possibilidade de criar container register próprio.

````docker image````

```
    build: realiza a construção da imagem
    inspect: inspeciona a imagem
    ls: lista as imagens
    prune: remove todas as imagens não utilizadas
    rm: remove um ou mais imagens
    tag: cria uma tag (alias) para referir ao caminho da imagem
    pull: baixa uma imagem do Docker hub para o computador
```
Para pesquisar por imagens que contenham uma determinada palavra no nome da sua imagem, utiliza-se o comando:
```docker images | grep laravel```

Para remover uma imagem
```docker rmi imageName```

Para remover todas as imagens, pode-se usar este comando:
```docker rmi $(docker image ls -a -q)```
