import tensorflow as tf
from tensorflow.keras.models import load_model
import cv2
import numpy as np
import os

# Caminho onde o modelo treinado será salvo
model_path = 'model_classificador_vogais.h5'

# Diretório das imagens de treino, que deve conter as subpastas para cada letra e qualidade
train_dir = 'caminho_para_imagens_de_treino'

# 1. Treinando e Salvando o Modelo (execute esta parte apenas uma vez)
def treinar_e_salvar_modelo():
    from tensorflow.keras.preprocessing.image import ImageDataGenerator
    from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

    # Configuração do gerador de dados
    train_datagen = ImageDataGenerator(rescale=1./255)
    train_generator = train_datagen.flow_from_directory(
        train_dir,
        target_size=(64, 64),
        batch_size=32,
        class_mode='categorical'
    )

    # Estrutura da CNN
    model = Sequential([
        Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
        MaxPooling2D((2, 2)),
        Conv2D(64, (3, 3), activation='relu'),
        MaxPooling2D((2, 2)),
        Conv2D(128, (3, 3), activation='relu'),
        MaxPooling2D((2, 2)),
        Flatten(),
        Dense(128, activation='relu'),
        Dropout(0.5),
        Dense(train_generator.num_classes, activation='softmax')  # Número de classes
    ])

    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    # Treinando o modelo
    model.fit(train_generator, epochs=10)

    # Salvando o modelo treinado
    model.save(model_path)
    print("Modelo treinado e salvo em:", model_path)

# 2. Função para carregar o modelo e classificar uma imagem
def classificar_imagem(image_path):
    # Carrega o modelo treinado
    model = load_model(model_path)

    # Carrega e pré-processa a imagem
    img = cv2.imread(image_path)
    img = cv2.resize(img, (64, 64))  # Redimensiona para o tamanho de entrada do modelo
    img = np.expand_dims(img, axis=0) / 255.0  # Normaliza e adiciona dimensão extra

    # Realiza a predição
    prediction = model.predict(img)

    # Carregar as classes de rótulos automaticamente
    train_datagen = ImageDataGenerator(rescale=1./255)
    train_generator = train_datagen.flow_from_directory(
        train_dir,
        target_size=(64, 64),
        batch_size=32,
        class_mode='categorical'
    )
    label_map = train_generator.class_indices
    labels = {v: k for k, v in label_map.items()}

    # Converte o índice para a classe e qualidade
    predicted_class = np.argmax(prediction, axis=1)[0]
    letra, qualidade = labels[predicted_class].split('_')

    return letra, qualidade

# Exemplo de uso
# Treine e salve o modelo uma vez
# treinar_e_salvar_modelo()

# Classifique uma nova imagem
image_path = 'caminho_para_imagem_a_classificar'
letra, qualidade = classificar_imagem(image_path)
print(f'Letra: {letra}, Qualidade: {qualidade}')
