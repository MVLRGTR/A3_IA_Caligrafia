import os
import cv2
import numpy as np
import sys
from sklearn.metrics.pairwise import cosine_similarity
from PIL import Image
import json

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
        if imagens:  
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
            if imagens:  
                similarity_scores = [cosine_similarity([input_image], [img])[0][0] for img in imagens]
                max_score = max(similarity_scores)
                if max_score > best_match_score:
                    best_match_score = max_score
                    best_match_vogal = vogal
                    best_match_category = categoria

    return best_match_vogal, best_match_category, best_match_score

def main(image_path):
    base_path = './base de dados'
    reference_images = load_reference_images(base_path)

    test_image = process_image(image_path)
    best_vogal, best_category, score = identify_vowel(test_image, reference_images)

    if (best_vogal and score > 0.95):
        resultado = {
            "vogal" : best_vogal,
            "categoria":best_category,
            "similaridade":score
        }
        return resultado
    else:
        resultado = {
            "categoria":'Não foi possivél fazer a classificação da imagem como uma vogal !!!'
        }
        return resultado

if len(sys.argv) < 2:
    print("Erro: Caminho da imagem não foi fornecido.")
    sys.exit(1)
# image_path = './classificar/'+os.path.basename(sys.argv[1])
image_path = sys.argv[1]
resultado = main(image_path)
print(json.dumps(resultado))
