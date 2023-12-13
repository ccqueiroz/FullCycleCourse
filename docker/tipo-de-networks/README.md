## Tipo de Networks

```docker network```
```
    - ls: lista as redes criadas no Docker
    - prune: encerra e exclui todas as redes que não estão sendo utilizadas
    - inspect: inspeciona as redes Docker
```

Conectar um container a uma rede
<pre>docker network connect netWorkName containerName</pre>

<pre>docker run --network=my-net -itd --name=container3 busybox</pre>

Sabendo que os containers são ambientes isolados, as networks são redes de comunicações entre os containers/host, possuindo 4 tipos de redes mais utilizadas:
    - bridge: Driver bridge gera uma ponte de comunicação entre containers.
    - host: Driver host mescla a comunicação do Docker com o Host, onde o Host pode acessar portas de um ou mais containers sem que haja uma exposição de porta do container.
    - overlay: Driver overlay permite uma comunicação entre vários Dockers em máquinas diferentes.
    - maclan: Driver maclan permite setar um mac address em um container.
    - none: Não existe rede de comunicação entre containers, permanecendo assim os containers atuando de forma isolada.

Para um container acessar dados do Host, usa-se: ```host.docker.internal```
<pre>http>//host.docker.internal:8000</pre>