"use strict";
let Saturate = document.getElementById('Saturate');
let Contrast = document.getElementById('Contrast');
let Brightness = document.getElementById('Brightness');
let Sepia = document.getElementById('Sepia');
let Grayscale = document.getElementById('Grayscale');
let Blur = document.getElementById('Blur');
let Hue_rotate = document.getElementById('Hue_rotate');
let Box_image = document.querySelector('.Box_image');
let image = document.getElementById('image');
let AllFilters = document.querySelectorAll('[type="range"]'); // All filters
let Upload_btn = document.getElementById('upload');
let Download_btn = document.getElementById('Download_btn');
let Reset_btn = document.getElementById('Reset_btn');
const canvas = document.getElementById('canvas');
const Context = canvas.getContext('2d');
//Hinding Reset and Dowload Buttons and Box image if there are not any image 
window.onload = () => {
    Download_btn.style.display = 'none';
    Reset_btn.style.display = 'none';
    Box_image.style.display = 'none';
};
// Upload the image 
Upload_btn.onchange = () => {
    Reset();
    Download_btn.style.display = 'block';
    Reset_btn.style.display = 'block';
    Box_image.style.display = 'block';
    let file = new FileReader();
    file.readAsDataURL(Upload_btn.files[0]);
    file.onload = () => {
        image.src = file.result;
    };
    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        Context.drawImage(image, 0, 0, canvas.width, canvas.height);
        image.style.display = 'none';
    };
};
// Add the Filters to the image  
AllFilters.forEach(filter => {
    filter.addEventListener('input', () => {
        Context.filter = `
        saturate(${Saturate.value}%)
        contrast(${Contrast.value}%)
        brightness(${Brightness.value}%)
        sepia(${Sepia.value}%)
        grayscale(${Grayscale.value})
        blur(${Blur.value}px)
        hue-rotate(${Hue_rotate.value}deg)
        `;
        Context.drawImage(image, 0, 0, canvas.width, canvas.height);
    });
});
// Reset the Filters from the image  
function Reset() {
    let valeurAttribut = [];
    for (let i = 0; i < AllFilters.length; i++) {
        valeurAttribut.push(AllFilters[i].getAttribute('value'));
        AllFilters[i].value = valeurAttribut[i];
    }
    Context.filter = `none`;
    Context.drawImage(image, 0, 0, canvas.width, canvas.height);
}
// Dowload the image
Download_btn.onclick = () => {
    Download_btn.href = canvas.toDataURL();
};
