## Bind Mounts

Monta um arquivo/diretório da máquina host dentro do container Docker, onde este arquivo/diretório é referenciado por seu caminho absoluto na máquina host.
Os bind mounts têm muito desempenho, mas dependem do sistema de arquivos da máquina host ter uma estrutura de diretório específica disponível.

<pre>
    docker run -d -it --name devtest --mount type=bind,source="$(pwd)"/target,target=/app nginx:latest
</pre>

## Volumes

Cria-se um novo diretório dentro do container, onde o Docker irá gerenciar o conteúdo do diretório. O arquivo ou diretório não precisa existir no host Docker, sendo criado sob demanda.

<pre>
    docker run -d --name devtest -v "$(pwd)"/target:/app nginx:latest
</pre>