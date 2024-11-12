# #projeto.py
# import os
# import cv2
# import numpy as np
# from sklearn.metrics.pairwise import cosine_similarity
# from PIL import Image


# def process_image(image_path):
#     image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
#     image_resized = cv2.resize(image, (100, 100))
#     image_flattened = image_resized.flatten()
#     return image_flattened


# def load_reference_images(base_path):
#     reference_images = {}
#     vogais = ['a', 'e', 'i', 'o', 'u']
#     categorias = ['bom', 'razoavel', 'ruim']

#     for vogal in vogais:
#         reference_images[vogal] = {}
#         for categoria in categorias:
#             categoria_path = os.path.join(base_path, vogal, categoria)

#             if not os.path.exists(categoria_path):
#                 print(f"Erro: O caminho {categoria_path} não existe.")
#                 continue
            
#             images = []
#             for file in os.listdir(categoria_path):
#                 if file.endswith('.jpg') or file.endswith('.png'):
#                     image_path = os.path.join(categoria_path, file)
#                     image = process_image(image_path)
#                     images.append(image)
            
#             reference_images[vogal][categoria] = images
    
#     return reference_images



# def compare_images(input_image, reference_images):
#     similarities = {}
#     for categoria, imagens in reference_images.items():
#         similarity_scores = [cosine_similarity([input_image], [img])[0][0] for img in imagens]
#         similarities[categoria] = max(similarity_scores)  
#     best_fit = max(similarities, key=similarities.get)
#     return best_fit


# def main(vogal, image_path):

#     base_path = './base_de_Dados' 
#     reference_images = load_reference_images(base_path)
    

#     '''print(reference_images)'''

    
#     if vogal not in reference_images:
#         print("Vogal inválida.")
#         return


#     test_image = process_image(image_path)

#     categoria = compare_images(test_image, reference_images[vogal])

#     print(f"A imagem foi classificada como: {categoria}")

# if __name__ == '__main__':
#     vogal = 'a'  
#     image_path = './classificar/abom.png'  
#     main(vogal, image_path)

import os
import cv2
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from PIL import Image

def process_image(image_path):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    image_resized = cv2.resize(image, (100, 100))
    image_flattened = image_resized.flatten()
    return image_flattened

def load_reference_images(base_path):
    reference_images = {}
    vogais = ['a', 'e', 'i', 'o', 'u']
    categorias = ['bom', 'razoavel', 'ruim']

    for vogal in vogais:
        reference_images[vogal] = {}
        for categoria in categorias:
            categoria_path = os.path.join(base_path, vogal, categoria)

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

def compare_images(input_image, reference_images):
    similarities = {}
    for categoria, imagens in reference_images.items():
        if imagens:  # Certifique-se de que há imagens para comparar
            similarity_scores = [cosine_similarity([input_image], [img])[0][0] for img in imagens]
            similarities[categoria] = max(similarity_scores)  
    best_fit = max(similarities, key=similarities.get)
    return best_fit, similarities[best_fit]

def identify_vowel(input_image, reference_images):
    best_match_vogal = None
    best_match_score = -1
    best_match_category = None

    for vogal, categorias in reference_images.items():
        for categoria, imagens in categorias.items():
            if imagens:  # Certifique-se de que há imagens para comparar
                similarity_scores = [cosine_similarity([input_image], [img])[0][0] for img in imagens]
                max_score = max(similarity_scores)
                if max_score > best_match_score:
                    best_match_score = max_score
                    best_match_vogal = vogal
                    best_match_category = categoria

    return best_match_vogal, best_match_category, best_match_score

def main(image_path):
    base_path = './base_de_Dados'
    reference_images = load_reference_images(base_path)

    test_image = process_image(image_path)
    best_vogal, best_category, score = identify_vowel(test_image, reference_images)

    if (best_vogal and score > 0.95):
        print(f"A imagem foi identificada como pertencente à vogal '{best_vogal}' e classificada como '{best_category}'.")
        print(f"Score de similaridade: {score:.2f}")
    else:
        print("Não foi possível identificar uma correspondência para a imagem.")

if __name__ == '__main__':
    image_path = './teste/abom.png'  # Exemplo de caminho de imagem
    main(image_path)

