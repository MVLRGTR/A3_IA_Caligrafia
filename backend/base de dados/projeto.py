#projeto.py
import os
import cv2
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from PIL import Image

# Função para processar as imagens
def process_image(image_path):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    image_resized = cv2.resize(image, (100, 100))
    image_flattened = image_resized.flatten()
    return image_flattened

# Função para carregar todas as imagens de referência
def load_reference_images(base_path):
    reference_images = {}
    vogais = ['a', 'e', 'i', 'o', 'u']
    categorias = ['bom', 'razoavel', 'ruim']

    for vogal in vogais:
        reference_images[vogal] = {}
        for categoria in categorias:
            categoria_path = os.path.join(base_path, vogal, categoria)
            
            # Verificar se o caminho da pasta existe
            if not os.path.exists(categoria_path):
                print(f"Erro: O caminho {categoria_path} não existe.")
                continue
            
            images = []
            for file in os.listdir(categoria_path):
                if file.endswith('.jpg') or file.endswith('.png'):
                    image_path = os.path.join(categoria_path, file)
                    image = process_image(image_path)
                    images.append(image)
            
            reference_images[vogal][categoria] = images
    
    return reference_images


# Função para comparar as imagens
def compare_images(input_image, reference_images):
    similarities = {}
    for categoria, imagens in reference_images.items():
        similarity_scores = [cosine_similarity([input_image], [img])[0][0] for img in imagens]
        similarities[categoria] = max(similarity_scores)  # Pega a maior similaridade
    best_fit = max(similarities, key=similarities.get)
    return best_fit

# Função principal para testar com uma imagem específica
def main(vogal, image_path):
    # Carregar todas as imagens de referência
    base_path = 'C:/Users/gip-1/Desktop/projeto'  # Caminho absoluto para evitar problemas
    reference_images = load_reference_images(base_path)
    
    # Verificar se o dicionário de referência foi carregado corretamente
    '''print(reference_images)'''  # Adicione esta linha para ver o conteúdo de reference_images
    
    if vogal not in reference_images:
        print("Vogal inválida.")
        return

    # Processar a imagem de teste
    test_image = process_image(image_path)

    # Comparar com as imagens base da vogal específica
    categoria = compare_images(test_image, reference_images[vogal])

    # Exibir o resultado
    print(f"A imagem foi classificada como: {categoria}")

# Testar com uma imagem de vogal 'a' por exemplo
if __name__ == '__main__':
    vogal = 'a'  # vogal a testar
    image_path = 'C:/Users/gip-1/Desktop/train_61_00545.png'  # Caminho da imagem a testar
    main(vogal, image_path)
