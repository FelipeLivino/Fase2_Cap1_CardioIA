# FIAP - Faculdade de Informática e Administração Paulista

<p align="center">
<a href= "https://www.fiap.com.br/"><img src="assets/logo-fiap.png" alt="FIAP - Faculdade de Informática e Admnistração Paulista" border="0" width=40% height=40%></a>
</p>

<br>

# Portal CardioIA - Fase 2

## Nome do grupo

## 👨‍🎓 Integrantes:

- <a href="https://www.linkedin.com/company/inova-fusca">Nome do integrante 1</a>
- <a href="https://www.linkedin.com/company/inova-fusca">Nome do integrante 2</a>
- <a href="https://www.linkedin.com/company/inova-fusca">Nome do integrante 3</a>
- <a href="https://www.linkedin.com/company/inova-fusca">Nome do integrante 4</a>
- <a href="https://www.linkedin.com/company/inova-fusca">Nome do integrante 5</a>

## 👩‍🏫 Professores:

### Tutor(a)

- <a href="https://www.linkedin.com/company/inova-fusca">Nome do Tutor</a>

### Coordenador(a)

- <a href="https://www.linkedin.com/company/inova-fusca">Nome do Coordenador</a>

## 📜 Descrição

O **Portal CardioIA** é uma aplicação interativa de front-end desenvolvida como parte da atividade _Ir Além 1_ da Fase 2. A proposta principal deste portal é criar uma interface moderna, responsiva e esteticamente avançada, focada na visualização e gerenciamento simulado de pacientes e triagens na rotina de uma clínica de cardiologia inovadora. O projeto foi construído do zero utilizando as melhores práticas do ecossistema React com Vite, eliminando qualquer dependência de backend real por meio de interceptadores e abstrações nativas baseadas no navegador.

**Destaques Tecnológicos Incorporados:**

- Logística de Autenticação Segura via **ContextAPI** avaliando mocks temporários em `@CardioIA:token`.
- Criação de um utilitário exclusivo de modelagem de cache (`storageManager`) com ofuscação nativa via Base64, protegendo PII (Identidade do Paciente) direto no LocalStorage.
- Fluxo de Agendamento dinâmico otimizado através de arquitetura `useReducer`.
- UI/UX super contemporânea guiada através da suíte **Styled Components**, gerando CSS modular responsivo, com sistema de cores dark-theme em contraste com glassmorphism.

## 📁 Estrutura de pastas

Dentre os arquivos e pastas presentes na raiz do projeto `ir_alem_1`, definem-se:

- <b>node_modules</b>: Pasta gerada automaticamente que contém todas as bibliotecas e dependências de terceiros instaladas pelo NPM (como React, Styled-Components, React-Router-DOM).

- <b>src</b>: Todo o código fonte fundamental criado para o desenvolvimento do projeto. Aqui habitam as sub-pastas estruturais da aplicação:
  - <b>/components</b>: Peças de Interface de Usuário isoladas e reutilizáveis (como a `Navbar`).
  - <b>/contexts</b>: Responsável pela lógica de estado global da aplicação. Hospeda o `AuthContext.jsx` que provê os tokens de acesso e regras de Login falso.
  - <b>/pages</b>: As páginas que o roteador renderiza (ex: `Dashboard.jsx`, `Login.jsx`, `Patients.jsx`, `Schedule.jsx`).
  - <b>/services</b>: Consumidores e abstrações de contato externo, como a `api.js` que faz _fetch_ mockado usando o JSONPlaceholder.
  - <b>/utils</b>: Ferramentas auxiliares desconectadas de layout. Aloca o nosso potente gerador autônomo `storageManager.js`.

- <b>index.html</b>: O ponto de entrada principal no navegador que hospeda o ID Root onde o React é montado em Single Page Application (SPA).

- <b>package.json</b>: O manifesto arquitetural da aplicação, descrevendo todas as dependências, versionamentos e scripts primários (como `dev` e `build`).

- <b>vite.config.js</b>: Arquivo de configuração que otimiza e aponta os plug-ins internos do motor de compilação ágil Vite.

- <b>README.md</b>: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

## 🔧 Como executar o código

Para rodar essa simulação interativa da clínica perfeitamente em sua máquina, não é necessário rodar complexidades como Docker ou Bancos MYSQL, basta utilizar frameworks de empacotamento Node.

**Pré-requisitos básicos**:  
Necessário que a máquina possua o instalador Javascript **Node.js** (recomenda-se a variante `LTS`).

**Passo a passo a partir da sua IDE**:

1. Clone e realize a extração deste repositório FIAP no seu ambiente local.
2. Abra um terminal apontando para a raiz do repositório clonado e instale toda a malha de dependências requeridas utilizando NPM:
   ```bash
   npm install
   ```
3. Com os pacotes firmemente consolidados, dispare o módulo empacotador do Vite que subirá o portal simultaneamente de forma otimizada para desenvolvedor:
   ```bash
   npm run dev
   ```
4. No console abrirá uma demarcação contendo o end-point com sua porta gerada. Segure CTRL e clique nela (`http://localhost:5173/`).
5. A tela de Login aparecerá. Simule sua entrada executiva através do credenciamento estático validado: **admin@cardioia.com** com a senha **123456**.

## 🗃 Histórico de lançamentos

- 1.0.0 - 07/04/2026
  - Transição da base e re-arquitetura total de cache para protocolo de StorageManager Blindado.
  - Implementação completa de Modal CRUD na listagem de pacientes.
- 0.3.0 - 06/04/2026
  - Expansão analítica nas métricas isoladas no Dashboard (`Agendado`, `Triagem`, `Alertas`, etc).
- 0.2.0 - 03/04/2026
  - Setup unificado do JSX reativo mapeado provindo de requisições mockadas limitadamente usando `fetch()`. AuthContext inserido.
- 0.1.0 - 02/04/2026
  - Inicialização oficial repositório.

## 📋 Licença

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/agodoi/template">MODELO GIT FIAP</a> por <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://fiap.com.br">Fiap</a> está licenciado sobre <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>
