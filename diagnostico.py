import csv
import os

def ler_mapa_conhecimento(caminho_csv):
    mapa = []
    # Definir o caminho absoluto baseado na localização deste arquivo
    dir_atual = os.path.dirname(os.path.abspath(__file__))
    caminho_completo = os.path.join(dir_atual, caminho_csv)
    
    with open(caminho_completo, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            mapa.append({
                'sintoma_1': row['Sintoma 1'].strip().lower(),
                'sintoma_2': row['Sintoma 2'].strip().lower(),
                'doenca': row['Doenca Associada'].strip()
            })
    return mapa

def ler_frases(caminho_txt):
    frases = []
    # Definir o caminho absoluto baseado na localização deste arquivo
    dir_atual = os.path.dirname(os.path.abspath(__file__))
    caminho_completo = os.path.join(dir_atual, caminho_txt)
    
    with open(caminho_completo, mode='r', encoding='utf-8') as f:
        for linha in f:
            if linha.strip():
                frases.append(linha.strip())
    return frases

def analisar_frases(frases, mapa_conhecimento):
    resultados = []
    for frase in frases:
        frase_lower = frase.lower()
        diagnosticos = []
        for doenca in mapa_conhecimento:
            # Verifica se algum dos sintomas associados a doenca esta na frase
            if doenca['sintoma_1'] in frase_lower or doenca['sintoma_2'] in frase_lower:
                diagnosticos.append(doenca['doenca'])
        
        resultados.append({
            'frase': frase,
            'diagnosticos': list(set(diagnosticos)) # Remove duplicatas
        })
    return resultados

if __name__ == "__main__":
    arquivo_csv = 'mapa_conhecimento.csv'
    arquivo_txt = 'sintomas.txt'
    
    print("===============================================")
    print("Iniciando análise de sintomas por IA...")
    print("===============================================\n")
    
    try:
        mapa = ler_mapa_conhecimento(arquivo_csv)
        frases = ler_frases(arquivo_txt)
        
        resultados = analisar_frases(frases, mapa)
        
        for i, resultado in enumerate(resultados, 1):
            print(f"Paciente {i}:")
            print(f"Relato: \"{resultado['frase']}\"")
            if resultado['diagnosticos']:
                print(f"Sugestão de Diagnóstico: {', '.join(resultado['diagnosticos'])}")
            else:
                print("Sugestão de Diagnóstico: Nenhum padrão encontrado no mapa de conhecimento.")
            print("-" * 60)
            
    except FileNotFoundError as e:
        print(f"Erro: Arquivo não encontrado - {e}")
    except Exception as e:
        print(f"Erro inesperado: {e}")
