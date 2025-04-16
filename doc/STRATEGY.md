## Strategy Pattern
Iremos utilizar o padrão de projeto "Strategy" para execução dinamica de diferentes formas de pesquisa de vazamentos de dados. Teremos a possibilidade de buscar dados de diferentes origens de dados vazados, sendo eles: databreach, telegram, forum.

### Databreach
A strategy databreach será responsável por realizar o web scrapling do site "databreach.com", e retornar as informações encontradas do email buscado.

### Telegram
A strategy telegram será responsavel por realizar a busca na api do aplicativo "telegram", em canais publicos e especificos, e então retornar as informações encontrados do email buscado.

### Forum
A strategy forum será responsável por realizar o web scrapling em forums de venda de dados, para então retornar citações do email buscado no site.