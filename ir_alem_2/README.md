# FIAP - Faculdade de Informática e Administração Paulista

<p align="center">
<a href= "https://www.fiap.com.br/"><img src="https://github.com/FelipeLivino/Fase2_Cap1_CardioIA/blob/main/asset/logo-fiap.png" alt="FIAP - Faculdade de Informática e Admnistração Paulista" border="0" width=40% height=40%></a>
</p>

<br>

# Portal CardioIA - Fase 2 (Módulo de Visão Computacional / MLP)

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

Este repositório encapsula o projeto complementar de Diagnóstico Visual em Cardiologia da Fase 2. A iniciativa cumpre exatamente a missão de aplicar modelos de Deep Learning utilizando uma Rede Neural Artificial do modelo Multilayer Perceptron (MLP) que assume a responsabilidade de classificar imagens médicas e cruzar os diagnósticos. Direcionamos essa capacidade na triagem ágil dos sinais das ondas elétricas dos eletrocardiogramas (ECG), servindo como apoio visual crítico imediato à decisão médica e expandindo o universo do CardioIA.

Para satisfazer 100% dos requisitos clínicos exigidos da atividade de "Ir Além", nós desenvolvemos a topologia respeitando seus rigorosos pontos focais:

- **Pré-processamento Exato das Imagens**: Os datasets do repositório Kaggle (_Heartbeat / PTB Diagnostic_) foram devidamente limpos, seus vetores normalizados dinamicamente (escala contida entre 0 e 1 simulando um formato raster compatível com visões convencionais de tons de cinza), e convertidos numa representação imagética limpa antes de ir aos neurônios.
- **Redes Neurais com Keras**: Construímos do zero a simulação utilizando os pacotes `TensorFlow/Keras`. Orquestramos uma rede neural superficial focada (com camadas Dense sequenciais acompanhadas de camadas corretivas de _Dropout_, visando o fim das ambiguidades do over-fitting) para interpretar o eletrocardiograma.
- **Ação Rápida no Ritmo Cardíaco**: Utilizando ativadores avançados (_ReLU_ e o classificador categórico final _Sigmoid_ paramétrico em dados binários), garantimos que o sistema indique com clareza a normalidade vs não conformidade analítica do ritmo cardíaco submetido. A acurácia foi mensurada minuciosamente e mapeada no relatório de evolução do modelo.

### 🎥 Demonstração de Funcionamento Completo (Vídeo)

> O funcionamento final do classificador visual contendo detalhamentos dos outputs do código pelo time nas classificações de ritmo em um pitch de 4min foi disponibilizado a seguir:
> **[https://youtu.be/iRbvam1E0PM]**

## 📁 Estrutura de pastas

Pautados pelas boas métricas de documentação, as subpastas desta documentação de classificador visual MLP (`ir_alem_2`) hospedam:

- <b>classificador_ecg.ipynb</b>: O Jupyter Notebook mestre hospedando por inteiro a arquitetura codificada. Nele você poderá navegar da requisição do dataset hospedado externamente, os códigos comentados funcionais de normalização fotográfica das imagens (pré-processamento cinzento) à efetiva execução da árvore perceptron, Keras e tabelas quantitativas das testagens.
- <b>exemplo_ecg.png</b>: Um demonstrativo de artefato (Snapshot Visual) processado, validando e emulando que os sinais frios do vetor foram corretamente traduzidos para uma imagem gráfica compatível com as ferramentas antes de ingressarem no cérebro da rede neural.
- <b>README.md</b>: arquivo de apresentação que serve como guia do projeto (o mesmo que você está lendo agora).

> **Nota de versionamento limpo (Dados externos PBT/Kaggle):** É importante ressaltar que para não ferir a estrutura de um bom portal Git, **dados médicos massivos ou com milhares de frames volumosos** originários de coletas clínicas hospedadas nos sistemas PTB do Kaggle estão guardados integralmente em suas estantes na nuvem (Drive/Kaggle), separados externamente. O carregamento será provocado via scripts nativos ou importações sob demanda direta dentro do respectivo Jupyter Notebook na seção declarada.

## 🔧 Como executar o código

A recomendação técnica para validação assertiva e avaliação dos pesos da Rede Neural Artificial exigem do usuário as suítes analíticas nativas do dialeto Python (versão `> 3.8`).

1. Considere estar operando em uma IDE que leia Notebooks ou servidor online (Google Colab/Jupyter).
2. Realize o git init / clone da estrutura básica para a sua pasta ou isoladamente dentro desta navegação raiz do `ir_alem_2`.
3. Garanta a requisição imediata de instalação/abastecimento no seu terminal dos _frameworks_ densos que a IA irá exigir para fazer os processamentos das imagens submetidas:
   ```bash
   pip install pandas numpy matplotlib tensorflow scikit-learn
   ```
4. Navegue até o notebook Jupyter (`classificador_ecg.ipynb`) e utilize o comando "Run All" para iniciar gradualmente toda a orquestração desde as planilhas vetorizadas até os logs evolutivos do _Model Summary_ e os _Reports_ de Testes nas conclusões da máquina de estado do Keras.

## 🗃 Histórico de lançamentos

- 1.0.0 - 07/04/2026
  - Refatorações nas curvas de treinamento binárias da MLP contendo camadas Dense para melhor absorção. Padronização Integral dos requisitos avaliativos baseados nas diretrizes do Template FIAP validado, bem como a inserção do pré-processamento normalizado e link das testagens em vídeo.
- 0.1.0 - 05/04/2026
  - Células base contendo lógica e equações brutas de aquisição da biblioteca externa para manipulação matemática das linhas contendo o exame eletrocardiograma.

## 📋 Licença

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/agodoi/template">MODELO GIT FIAP</a> por <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://fiap.com.br">Fiap</a> está licenciado sobre <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>
