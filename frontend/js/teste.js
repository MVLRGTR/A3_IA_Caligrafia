document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', redirectToUpload);
})

function redirectToUpload(){
    window.location.href = 'upload.html'
}