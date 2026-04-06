# Ir Além 2: Diagnóstico Visual em Cardiologia com Rede Neural (MLP)

Este repositório cumpre a atividade de estruturar um processamento classificador envolvendo Visão Computacional de Sinais e Deep Learning, aplicando as *Multilayer Perceptrons (MLPs)* para auxiliar diagnósticos em cardiologia através da triagem de Eletrocardiogramas (ECGs).

As ferramentas base são a linguagem **Python**, com `Tensorflow/Keras` para o treinamento da inteligência artificial.

## Arquitetura do Repositório
- `classificador_ecg.ipynb`: Notebook Jupyter contendo todas as descrições em markdown, algoritmos de pré-processamento de conversão em vetor de cinza normalizado, processamento dos gráficos comparativos da premissa dos sinais ECGs e todo o bloco final para rodar a MLP.
- `assets/`: Pasta fornecida contendo a base primária do PTB Diagnostic (Normal e Abmormal records) provenientes do kaggle *heartbeat*.
- `exemplo_ecg.png`: Artefato gerado pelo nosso Jupyter Notebook que traduz os vetores de dados frios em uma imagem tradicional simulando o print real de pacientes a serem comparados de forma visual pelo classificador.

## Critérios Analisados no Projeto
1. **Pré-Processamento**: Os dados vetoriais chegam formatados (normalizados entre 0 e 1, que equivale às características "em tons de cinza e dimensionadas" das abordagens comuns em imagens de saúde). Mesclamos as bases normal e anormal garantindo uma classificação simétrica sem vieses isolados com divisões em 80% do dataset local.
2. **Keras e MLP**: Estruturamos camadas profundas sequenciais da classe `Dense`, configuradas especificamente para resolver ambiguidades. Utilizamos três camadas de raciocínio lógico profundo unificadas sob o critério rigoroso do *Dropout* para que o modelo generalizasse os dados, terminando com classificação baseada em um discriminante binário final da função `Sigmoid`. O otimizador parametrizado foi o 'Adam'.
3. **Avaliações Positivas**: Com provisão dinâmica de plot, imprimimos o avanço das curvas de `Accuracy` ao longo de vinte épocas treinadas.

## Como Executar na Própria Máquina

Este projeto assume o suporte nativo as ferramentas vitais de Machine Learning do Python 3+.

1. Realize a cópia/clone deste repositório isolando a pasta `ir_alem_2`.
2. Certifique-se de baixar e instalar globalmente (ou no seu `venv`) as matrizes do nosso ecossistema e ferramentas tensoriais através do seu pip logado:
```bash
pip install pandas numpy matplotlib scikit-learn tensorflow
```
3. Abra e limpe qualquer cache prévio rodando em sequência todas as camadas visíveis do código contido em `classificador_ecg.ipynb`.
4. Os testes gerados ficarão localmente disponíveis.

---
## Vídeo de Apresentação e Avaliação (YouTube)

> INCLUA AQUI O SEU LINK DO YOUTUBE NÃO LISTADO.
> Exemplo: [Assista nosso Modelo Avaliativo em Ação!](https://youtu.be/SEULINKAQUI)

##  Equipe de Integrantes
*(Substitua pelos IDs reais)*
- Integrante Um (RM: XXXXX)
- Integrante Dois (RM: XXXXX)
