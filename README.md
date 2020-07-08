# InscriBot


Bot feito para pegar as inscrições e enviar resultados do campeonato no chat da twitch e postar em um canal do discord.

Para utilizar é necessario ter o node instalado.

Use o <code>npm init</code> e <code>npm install</code> para instalar as dependências.

Configuração do canal (por id), assim como outras configurações de conexão estão no arquivo <code>config.json</code>

Código meia boca, mas funciona. rsrs.

Fique a vontade para modificar.



Comandos: 

<code>!ajudacamp</code>, com informações genéricas;  

<code>!iniciar</code> para iniciar as inscrições; 

<code>!encerrar</code> para fechá-la;

<code>!resultado</code> para os jogadores reportarem os resultados.


=======================

conteúdo config.json
        
        "Prefix": "!"
        "DiscordToken": "token da conta do discord",
        "Resultado": "id da sala que serão escritos os resultados. ex: 51235325353234",
        "Inscricao": "id da sala do discord onde serão escritos os dados de inscrição. ex: 51235325353234"

        "Token": "oauth:token da twitch",
        "Username": "nome da conta da twitch",
        "Channel": "nome do canal que o bot estará"
