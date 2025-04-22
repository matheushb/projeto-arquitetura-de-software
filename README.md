# Forum Scraper API

API responsável por realizar scraping em diferentes fontes de vazamentos de dados, como fóruns, grupos do Telegram e repositórios públicos de databreach. Os dados encontrados são registrados em logs e enviados por e-mail.

## Tecnologias utilizadas

- Node.js + TypeScript
- Express
- Puppeteer + Puppeteer Extra (Stealth)
- Nodemailer

---

## Executando o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/forum-scraper.git
cd forum-scraper
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Criar o arquivo `.env`

Copie o arquivo `.env.example` para `.env` e preencha com os valores corretos:

```bash
cp .env.example .env
```

Exemplo de `.env`:

```dotenv
SMTP_HOST=smtp.exemplo.com
SMTP_PORT=465
SMTP_USER=usuario@exemplo.com
SMTP_PASS=sua_senha
```

---

### 4. Iniciar em ambiente de desenvolvimento com hotreload

```bash
npm run dev
```

### 5. Buildar e Rodar

```bash
npm start
```

---

## Endpoints disponíveis

### Scraper

**GET /scraper/:source/:input**

Executa o scraping para uma fonte e entrada específicas.

- `:source` pode ser:
  - `FORUM`
  - `TELEGRAM`
  - `DATABREACH`
- `:input`: termo a ser buscado (e-mail, CPF, usuário)

**Exemplo:**

```
GET /scraper/FORUM/user123
```

**Resposta:** JSON com os resultados encontrados.

Se houver resultados, um e-mail será enviado automaticamente para o usuário (mockado por enquanto como `user@mail.com`).

---

### Logs

**GET /logs**

Retorna os logs de scrapes já realizados durante a execução do app.

**Exemplo:**

```
GET /logs
```

## Notificações por Email

Os resultados encontrados são enviados automaticamente por e-mail. Certifique-se de configurar corretamente as variáveis de ambiente SMTP no `.env`.

---

# Infosec

## Definição do Produto

O Infosec é uma plataforma de threat intelligence, focada na identificação e monitoramento constante de incidentes de segurança de uma organização. O objetivo é monitorar diferentes canais de comunicação que possam conter informações sobre os incidentes, de modo a proporcionar segurança passiva para a organização. O foco é atender organizações privadas que buscam uma ferramenta de segurança, sem precisar da alocação de um profissional de segurança para essa atividade.

## Requisitos do Sistema

- **Requisitos funcionais**:
  - [RF001] - Identificar incidentes de segurança relacionados ao cliente em fóruns da internet relacionados à vazamentos de dados.
  - [RF002]- Identificar incidentes de segurança relacionados em canais e grupos relacionados à vazamentos de dados no Telegram.
  - [RF003] - Identificar incidentes de segurança relacionados ao cliente na plataforma X.
  - [RF004] - Identificar incidentes de segurança relacionados ao cliente em fóruns da deep web relacionados à vazamentos de dados.
  - [RF005] - Gerenciar empresas parceiras do cliente, disponibilizando visualmente a rede de parceiros que ele possui.
  - [RF006] - Visualizar as possíveis ameaças/incidentes encontrados da empresa cadastrada e seus indícios.
  - [RF007] - Visualizar relatórios de incidentes de empresas parceiras.
  - [RF008] - Notificar o usuário visualmente dentro da plataforma sobre os incidentes encontrados em tempo real.
  - [RF009] - Implementar APIs que possibilitem a integração da plataforma com demais sistemas que automatizam ações de resposta à incidentes.
  - [RF010] - A plataforma deve possuir diferentes visões e permissões de acesso para os tipos de usuários que irão ter acesso.
  - [RF011] - O sistema deve ser capaz de classificar as ameaças encontradas de acordo com o nível de criticidade.
  - [RF012] - O sistema deve ser capaz de encontrar menções em notícias relacionadas ao cliente cadastrado.
  - [RF013] - Notificar o usuário a partir do canal e-mail sobre os incidentes encontrados em tempo real.
  - [RF014] - O sistema deve possuir uma base de conhecimento dos vazamentos encontrados e seus conteúdos, a fim de realizar análises independente da disponibilidade das informações nos sistemas de origem.

* **Requisitos não funcionais**:
  - [RNF001] - O sistema deve possuir alta disponibilidade.
  * [RNF002] - O sistema deve possuir autenticação para os usuários que irão acessar a aplicação, e os sistemas que utilizam as APIs.
  * [RNF003] - O design da aplicação precisa ser intuitivo, para possibilitar que usuários não técnicos consigam compreender as informações.
  * [RNF004] - O sistema deve realizar o monitoramento dos vazamentos com a maior

## Restrições e Condições

- **Restrições Técnicas:** Escolha de plataformas, linguagens de programação e frameworks disponíveis.
- **Restrições não Técnicas:** - O sistema deve ser entregue até o final de 2025. O sistema precisa entrar em produção com os custos apenas de infraestrutura excedente ao free tier do provedor de cloud. Precisa ser condizente com a LGPD e a legislação brasileira como um todo.

## Necessidades dos Stakeholders

- O gerenciamento do projeto deverá ser feito utilizando a plataforma RedMine, a fim de estruturar as atividades e alocação dos membros da equipe.
- O sistema precisa ser provido em ambientes cloud, que pode ser acessado pelo usuários através do interface definida, na data de entrega.
- A metodologia de gerenciamento do projeto deverá ser a Scrum, sendo necessário que as sprints tenham duração de duas semanas.

## Tendências Tecnológicas

- Arquitetura de microserviços.
- Hospedagem em cloud.
- Aplicação de inteligência artificial.

## Riscos do Projeto

- Dificuldade na identificação correta de incidentes referentes ao cliente, gerando falsos negativos que impactam na confiabilidade do sistema.
- Grande quantidade de informações envolvida para o funcionamento do sistema, dificultando a arquitetura e o processamento dos dados.
- Dificuldade na obtenção dos clientes iniciais, devido o público alvo ser empresas de médio a grande porte.
- Pouco tempo de desenvolvimento do produto mínimo viável.

## Tomada de Decisões

Vocês devem **documentar** todas as decisões tomadas na definição do projeto. Essas decisões devem abranger:

- **Seleção de tecnologias e frameworks**
  - .Net - Para o desenvolvimento do backend, será utilizado o ecossistema .Net, a fim de garantir a estrutura necessária para o processamento dos dados geradas pelo sistema. Além da experiência dos membros com a utilização da tecnologia.
  - RabbitMq - Para garantir que o sistema não perca dados relevantes às funcionalidade, será utilizado a tecnologia de mensageria RabbitMq. Para que, assim, o sistema seja maior resistente à falhas, e garanta maior confiabilidade no monitoramento.
  - Puppeter - Será utilizado essa biblioteca para auxiliar na coleta dos dados a partir dos fóruns hospedados na internet, o que torna-se complexo para uma aplicação backend. Pois é necessário a manipulação de elementos html para identificar os indícios corretamente.
  - Angular - Para direcionar a implementação do frontend, será utilizado o framework Angular, que auxiliar na configuração das rotas, autenticação e autorização necessária para o cumprimento dos requisitos não funcionais.
- **Definição de componentes do sistema**
  - **Serviços** - Aplicações focadas na coleta de informações dos canais (telegram, fóruns etc), e transformação em formato processável. As informações formatadas serão salvas em um banco de dados capaz de suportar uma grande quantidade de informações, e após isso gerar um evento para comunicar, por mensageria a aplicação principal.
    - Cada serviço possui seus detalhes de implementação, flexibilizando as tecnologias a serem usadas. Porém, inicialmente, serão pensados utilizando Node.js devido a quantidade de bibliotecas que podem auxiliar.
  * **Mensageria** - O serviços se comunicarão a partir de mensageria, informando a coleta de uma nova informação por um serviço, para possibilitar a resiliência do sistema.
    - Devido a complexidade de configurações do Kafka, será utilizado o RabbitMq como broker de mensageria.
  * **Core** - Aplicação responsável por processar as informações coletadas, identificando indícios, possíveis ameaças, e configurações relacionadas às empresas clientes.
  * A aplicação principal será desenvolvida utilizando as tecnologias do .NET.
  * **Front-end** - É responsável pela exibição dos dados processados pelo Core, possuindo integração a partir de API Rest. A tecnologia a ser utilizada está em discussão entre Angular e Next.
- **Modelos de decisão utilizados**
  - Análise comparativa de alternativas.
  - Prototipagem e experimentação.
