## ENTRYPOINT x CMD

 - ENTRYPOINT: Sempre será um comando fixo, não podendo ser substituído por outra instrução do terminal.
 - CMD: É um comando variável, ou seja, caso o usuário não passe nenhuma instrução via cli, será executado o CMD default. O CMD entra como parâmetro para o ENTRYPOINT