## Publicando Imagem no Docker Hub

Para publicação da imagem criada no Docker Hub, ficando assim, disponível para ser baixada e utilizada por outros usuários, deve-se

 - Realizar Login no Docker Hub via CLI
 - Realizar o build da imagem
    ```docker build -t nomeUsuario/imageName diretórioDockerFile```
 - Realizar push para o Docker Hub
    ```docker push nomeUsuario/imageName```

* Caso deseja baixar uma imagem do Docker Hub, executa-se o comando: ```docker pull imageName```