# FIAP - Faculdade de Informática e Administração Paulista

<p align="center">
<a href= "https://www.fiap.com.br/"><img src="https://github.com/FelipeLivino/Fase2_Cap1_CardioIA/blob/main/asset/logo-fiap.png" alt="FIAP - Faculdade de Informática e Admnistração Paulista" border="0" width=40% height=40%></a>
</p>

<br>

# Portal CardioIA - Fase 2 (Frontend React)

## Nome do grupo

Rumo ao NEXT

## 👨‍🎓 Integrantes:

- <a href="#">Felipe Livino dos Santos (RM 563187)</a>
- <a href="#">Daniel Veiga Rodrigues de Faria (RM 561410)</a>
- <a href="#">Tomas Haru Sakugawa Becker (RM 564147)</a>
- <a href="#">Daniel Tavares de Lima Freitas (RM 562625)</a>
- <a href="#">Gabriel Konno Carrozza (RM 564468)</a>

## 👩‍🏫 Professores:

### Tutor(a)

- <a href="#">Caique Nonato da Silva Bezerra</a>

### Coordenador(a)

- <a href="#">ANDRÉ GODOI CHIOVATO</a>

## 📜 Descrição

O **Portal CardioIA** é um aplicativo responsivo desenvolvido para a atividade complementar da Fase 2. A centralidade do projeto foi focar exclusivamente na construção da interface, modelando de modo interativo um moderno painel front-end para rotinas do diagnóstico em cardiologia. Utilizamos para isso o ecossistema robusto do **React + Vite**, priorizando a componentização e dispensando infraestruturas reais de backend por meio de implementações dinâmicas baseadas nativamente no navegador.

Para sanar inteiramente as diretrizes exigidas pelos critérios de avaliação e o desafio de PBL da atividade, a aplicação entrega em sua arquitetura de forma bem-sucedida:

- **Autenticação Simulada & Proteção:** Implantação de bloqueadores de rota (_Protected Routes_) assegurados pela **Context API** (AuthContext) e JWT Fakes armazenados localmente. Só é possível conferir as listagens se provocado o ambiente "logado".
- **Listagem de Pacientes Dinâmica:** Consumo estruturado através de _fetch_ com APIs simuladas (`JSONPlaceholder`) permitindo resgatar mock-ups de clientes, interligados a um estado (_useState/useEffect_).
- **Formulários e Reducers:** Rotas de captura ágil para de fluxo de Agendamento médico orquestrados nativamente via arquitetura complexa do Hook `useReducer`.
- **Dashboard com Métricas Analíticas:** Contadores sintéticos e painéis numéricos gerenciais para visualizar estatísticas de "Pacientes", "Triagens" e "Agendamentos".
- **Estética Customizada UI/UX:** Aplicação e padronização visual completa ancorada nos componentes do **Styled Components** aliando responsividade e modularidade CSS limpa.

### 🎥 Demonstração de Funcionamento Completo (Vídeo)

> O funcionamento final do portal (autenticação mockada, Dashboard, listagens) e o direcionamento visual do projeto em vídeo de até 4min podem ser validados no link não-listado a seguir:
> **[https://youtu.be/mMAQkA9XHW0]**

## 📁 Estrutura de pastas

Sem dados de nuvem externa ou bancos sensíveis incluídos neste escopo, a divisão representa o estado exato de dependências para o Front:

Dentre os arquivos e pastas presentes na raiz do projeto `ir_alem_1`, definem-se:

- <b>node_modules</b>: Pasta gerada automaticamente que contém todas as bibliotecas e dependências de terceiros instaladas pelo NPM (como React, Styled-Components, React-Router-DOM).

- <b>src</b>: Todo o código fonte fundamental criado para o desenvolvimento do projeto. Aqui habitam as sub-pastas estruturais da aplicação:
  - <b>/components</b>: Peças de Interface de Usuário isoladas e reutilizáveis (como a Navbar e Cards).
  - <b>/contexts</b>: Responsável pela lógica de estado global da aplicação. Hospeda o `AuthContext.jsx` que provê os tokens de acesso e regras de proteção de tela.
  - <b>/pages</b>: As páginas que o roteador renderiza independentemente (ex: `Dashboard.jsx`, `Login.jsx`, `Patients.jsx`, `Schedule.jsx`).
  - <b>/services</b>: Consumidores e abstrações de contato externo, como a ponte que faz o fetch simulado com o JSONPlaceholder.
  - <b>/utils</b>: Ferramentas auxiliares desconectadas de layout. Aloca o nosso potente gerador autônomo `storageManager.js`.

- <b>index.html</b>: O ponto de entrada principal no navegador que hospeda a "div root" onde o React SPA é devidamente injetado.

- <b>package.json</b>: O manifesto arquitetural da aplicação, descrevendo as dependências, versionamentos e engatilhando os scripts primários (como vite dev).

- <b>vite.config.js</b>: Arquivo de configuração que otimiza e aponta os plug-ins internos do motor de compilação ágil Vite.

- <b>README.md</b>: arquivo que serve como guia e explicação geral sobre o projeto do portal (o mesmo que você está lendo agora).

## 🔧 Como executar o código

Para rodar essa simulação interativa da clínica perfeitamente em sua máquina, não é necessário habilitar infraestruturas complexas como Docker ou MYSQL, basta utilizar frameworks de empacotamento NodeJS.

**Pré-requisitos básicos**:  
Necessário que a máquina possua suporte Javascript nativo instalando o **Node.js** (recomenda-se a variante `LTS`).

- minimo v24.12.0

**Passo a passo da Implementação e Start**:

1. Clone ou baixe este repositório unificado FIAP no seu ambiente local. Acesse via terminal nativo a pasta do portal (`cd ir_alem_1`).
2. Digite o respectivo comando para que o projeto baixe obrigatoriamente das nuvens os ecossistemas do React/Vite/Styled Components:
   ```bash
   npm install
   ```
3. Com os pacotes listados na `node_modules` corretamente baixados, dispare o módulo empacotador do Vite:
   ```bash
   npm run dev
   ```
4. No terminal aparecerá um link contendo sua porta local (geralmente alojada em `http://localhost:5173/`).
5. A tela de Login aparecerá na aplicação Web. Simule sua entrada inicial de funcionário usando o credenciamento de verificação estático: **admin@cardioia.com** com a senha **123456**.

## 🗃 Histórico de lançamentos

- 1.0.0 - 07/04/2026
  - Transição da base e re-arquitetura total de cache para protocolo de StorageManager, reajustes nos Requisitos Avaliativos.
- 0.3.0 - 06/04/2026
  - Expansão analítica nas métricas isoladas no Dashboard (`Agendado`, `Triagem`, `Alertas`, etc). Formulários em Reducers mapeados.
- 0.2.0 - 03/04/2026
  - Setup unificado do JSX reativo mapeado provindo de requisições mockadas limitadamente usando API Fictícia. AuthContext inserido firmemente.
- 0.1.0 - 02/04/2026
  - Inicialização oficial repositório (React + Vite) + Styled Components.

## 📋 Licença

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/agodoi/template">MODELO GIT FIAP</a> por <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://fiap.com.br">Fiap</a> está licenciado sobre <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>
