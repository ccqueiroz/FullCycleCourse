## Volumes

```docker volume```
`````
    - create: criar volume;
    - ls: listar volumes;
    - inspect: inspecionar volumes;
    - prune: remover todos os volumes não utilizados;
    - rm: remover um ou mais volumes;
``````
<pre>docker volume create myVolume</pre>
<pre>docker volume inspect myVolume</pre>
`````
    [
        {
            "CreatedAt": "2023-10-17T03:32:15Z",
            "Driver": "local",
            "Labels": {},
            "Mountpoint": "/var/lib/docker/volumes/myVolume/_data",
            "Name": "myVolume",
            "Options": {},
            "Scope": "local"
        }
    ]

    Obs: Mountpoint: Local físico onde está armazenado o volume.
``````

<pre>
docker run --rm --name nginx -d --mount type=volume,source=myVolume,target=/app nginx
</pre>
<pre>
docker run --rm --name nginx2 -d -v myVolume:/app nginx
</pre>
