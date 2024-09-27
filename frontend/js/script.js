document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', redirectToUpload);
});

document.addEventListener('DOMContentLoaded', () => {
    const redoButton = document.getElementById('redoButton');
    const homeButton = document.getElementById('homeButton');

    redoButton.addEventListener('click', redirectToUpload);
    homeButton.addEventListener('click', redirectToHome);
});

document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const resultButtons = document.getElementById('resultButtons');

    // Verifica se os elementos existem
    if (imageInput && imagePreview && resultButtons) {
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
                    img.style.borderRadius = '8px'; 
                    img.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    imagePreview.innerHTML = ''; 
                    imagePreview.appendChild(img); 
                    resultButtons.classList.remove('hidden'); 
                };
                reader.readAsDataURL(file);
            } else {
                alert('Por favor, selecione um arquivo de imagem válido.');
            }
        });

        // Comportamento do botão "Analisar imagem"
        const analyzeButton = document.getElementById('analyzeButton');
        if (analyzeButton) {
            analyzeButton.addEventListener('click', () => {
                addPreloader(); // Mostra o preloader

                setTimeout(() => {
                    removePreloader(); // Remove o preloader
                    window.location.href = 'result.html'; // Redireciona para a página de resultado
                }, 5000);
            });
        }

        const reuploadButton = document.getElementById('reuploadButton');
        if (reuploadButton) {
            reuploadButton.addEventListener('click', () => {
                imageInput.value = ''; 
                imagePreview.innerHTML = ''; 
                resultButtons.classList.add('hidden'); 
            });
        }
    }
});

function addPreloader() {
    $("body").append('<div class="loader-wrapper"><div class="loader"></div><div class="loader-section section-bg"></div></div>');
}

function removePreloader() {
    $("body>.loader-wrapper").fadeOut(500, function () {
        $("body>.loader-wrapper").remove();
    });
}

function addPreloaderModal() {
    $(".modal-body").append('<div class="loader-wrapper" style="z-index:5000"><div class="loader"></div><div class="loader-section section-bg"></div></div>');
}

function removePreloaderModal() {
    $(".modal-body>.loader-wrapper").fadeOut(500, function () {
        $(".modal-body>.loader-wrapper").remove();
    });
}

function redirectToUpload() {
    window.location.href = 'upload.html';
}

function redirectToHome() {
    window.location.href = 'index.html';
}

function redirectToResult() {
    window.location.href = 'result.html';
}