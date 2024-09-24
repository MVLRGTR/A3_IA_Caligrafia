document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const resultButtons = document.getElementById('resultButtons'); // Referência aos botões

    // Ao selecionar o arquivo, exibe a imagem e os botões
    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        // Verifica se o arquivo existe e é uma imagem
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Imagem Anexada';
                img.style.maxWidth = '100%';
                img.style.borderRadius = '8px'; // Adiciona um estilo opcional
                img.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; // Adiciona sombra opcional
                imagePreview.innerHTML = ''; // Limpa o preview anterior
                imagePreview.appendChild(img); // Exibe a nova imagem
                resultButtons.classList.remove('hidden'); // Mostra os botões
            };
            reader.readAsDataURL(file);
        } else {
            alert('Por favor, selecione um arquivo de imagem válido.');
        }
    });

    // Comportamento do botão "Analisar imagem"
    document.getElementById('analyzeButton').addEventListener('click', () => {
        window.location.href = 'result.html'; // Redireciona para a página de resultado
    });

    document.getElementById('reuploadButton').addEventListener('click', () => {
        imageInput.value = ''; // Limpa a seleção de arquivo
        imagePreview.innerHTML = ''; // Limpa o preview da imagem
        resultButtons.classList.add('hidden'); // Oculta os botões
    });
});

/*TELA RESULTADO */
document.addEventListener('DOMContentLoaded', () => {
    const redoButton = document.getElementById('redoButton');
    const homeButton = document.getElementById('homeButton');

    // Lógica para "Analisar Novamente"
    redoButton.addEventListener('click', () => {
        window.location.href = 'upload.html'; // Redireciona para a página de upload
    });

    // Lógica para "Página Inicial"
    homeButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Redireciona para a página inicial
    });
});
