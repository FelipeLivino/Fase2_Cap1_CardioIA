# Projeto CardioIA - Fase 2: Diagnóstico e Triagem com Inteligência Artificial

Este projeto foi desenvolvido como parte da Fase 2 do projeto CardioIA, onde o objetivo central é simular a automatização de diagnósticos médicos e a triagem clínica de pacientes na área da saúde utilizando Inteligência Artificial. Empregamos ferramentas de Processamento de Linguagem Natural (NLP) e algoritmos de Machine Learning para aproximar o comportamento dos nossos códigos aos sistemas reais adotados nos hospitais hoje em dia.

## O Que Foi Feito?

O desenvolvimento foi dividido em dois grandes eixos de simulação computacional:

1. **Sistemas Baseados em Conhecimento (Regras e Ontologia)**: Construímos uma simulação onde uma IA simples cruza descrições soltas de pacientes (em linguagem natural, ou seja, relatando os seus sintomas de forma humana) e identifica doenças usando um mapa pré-padronizado de associação (`sintoma -> doença`).
2. **Machine Learning e NLP para Classificação de Risco**: Abordamos o problema da priorização de atendimento em uma triagem de clínica/hospital criando um modelo algorítmico de aprendizagem por máquina. Esse modelo interpreta a urgência por trás do sintoma escrito no relato utilizando `TF-IDF` para transformar os termos em números e em seguida aplicando a `Regressão Logística` (`Logistic Regression`) para classificar a frase entre "baixo risco" e "alto risco", prevendo os cenários.

---

## Estrutura do Projeto e Descrição dos Arquivos

Abaixo, detalhamos exatamente qual é a função de cada arquivo e o seu propósito nesta entrega:

### Parte 1: Associação e Sugestão de Sintomas

- **`sintomas.txt`**: Um arquivo de texto literal contendo 10 exemplos simulados e diversos de descrições relatadas por pacientes nas clinicas (ex: "Sinto uma dor forte no peito...", "Acordei com enxaqueca e tontura..."). Atua como os dados primários brutos de entrada do sistema.
- **`mapa_conhecimento.csv`**: Uma planilha estruturada em CSV ("Valores Separados por Vírgula") que atua como a base de conhecimento (ou *cérebro*) da nossa simulação. Suas colunas correlacionam características específicas dos sintomas combinados com respectivos diagnósticos (ex: Infarto, Angina, Insuficiência Cardíaca V, AVC).
- **`diagnostico.py`**: O script Python de desenvolvimento que faz as peças trabalharem de forma conjunta.  
  1. Ele lê tanto as frases dos pacientes no `.txt` quanto a planilha de regras `.csv`.
  2. Ele executa uma interpretação (normalização de strings) para comparar se as palavras associadas à regra base daquela doença estão contidas na queixa real do paciente do arquivo `.txt`.
  3. Sugere o diagnóstico de forma legível e automática no terminal.

### Parte 2: Machine Learning e Triagem

- **`base_risco.csv`**: Um Dataset (conjunto de dados) simulado focado apenas na problemática de determinar a complexidade do sintoma. Nele criamos várias frases diferentes de sintomas humanos agrupadas em dois rótulos essenciais: `alto risco` (demandam socorro dinâmico e imediato) ou `baixo risco` (queixas contínuas, simples e normais que podem aguardar na recepção).
- **`classificador_risco.ipynb`**: O Jupyter Notebook de simulação do treinamento do algoritmo de triagem. A execução do arquivo cumpre o ciclo fundamental da IA clássica:
  - Importa as frases geradas em `base_risco.csv`.
  - Processa os textos com Vetorização (`TF-IDF Vectorizer`) para o computador traduzir palavras num contexto e peso vetorial matemático.
  - Particiona nossa base com um `Train Test Split` para avaliar com dados nunca analisados a robustez desse classificador.
  - Treina e realiza o *Fit* do Machine Learning usando o módulo `LogisticRegression` da famosa biblioteca *Scikit-Learn*.
  - Expõe o painel final de métricas (`Accuracy Score` e afins) e faz testes de inferência na prática da triagem.

---

## Instalação e Execução

Para rodar este projeto e conferir as análises na sua máquina:
1. Certifique-se de que o Python 3 e alguma GUI amigável como o Visual Studio Code estejam instalados na máquina física.
2. Instale as bibliotecas extras e essenciais para execução:
   ```bash
   pip install pandas scikit-learn
   ```
3. Execute o código de diagnóstico de sintomas da parte 1 no seu terminal integrado:
   ```bash
   python diagnostico.py
   ```
4. Para a parte 2, abra o script `classificador_risco.ipynb` e vá executando seus blocos/células sequencialmente ("*Run All*").

---

## Vídeo de Demonstração (YouTube)

> COLQUE AQUI O SEU LINK DE DEMONSTRAÇÃO DO YOUTUBE
> Exemplo: [Assista no YouTube](https://youtu.be/SEULINKAQUI)
