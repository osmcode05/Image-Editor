let AllFilters: NodeListOf<HTMLInputElement> = document.querySelectorAll('[type="range"]');// All filters
let Box_image = document.querySelector('.Box_image') as HTMLDivElement;
let image: any = document.getElementById('image') as HTMLImageElement;
let Upload: any = document.getElementById('upload') as HTMLInputElement ;
let Download_btn = document.getElementById('Download_btn') as HTMLLinkElement;
let Reset_btn = document.getElementById('Reset_btn') as HTMLButtonElement ;
const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const Context = canvas.getContext('2d') as CanvasRenderingContext2D;
//Hinding Reset and Dowload Buttons and Box image if there are not any image 
window.onload = ()=>{
    Download_btn.style.display = 'none'
    Reset_btn.style.display = 'none'
    Box_image.style.display = 'none'
}
// Upload the image 
Upload.onchange = ()=> {
    Reset()
    Download_btn.style.display = 'block'
    Reset_btn.style.display = 'block'
    Box_image.style.display = 'block'
    let file = new FileReader();
    file.readAsDataURL(Upload.files[0])
    file.onload = ()=>{
        image.src = file.result;
    }
    image.onload = ()=> {
        canvas.width = image.width;
        canvas.height = image.height;
        Context.drawImage(image,0,0,canvas.width,canvas.height);
        image.style.display = 'none'
    }
}
// Add the Filters to the image  
AllFilters.forEach( filter => {
    filter.addEventListener('input',()=>{
        Context.filter = `
        saturate(${AllFilters[0].value}%)
        contrast(${AllFilters[1].value}%)
        brightness(${AllFilters[2].value}%)
        sepia(${AllFilters[3].value}%)
        grayscale(${AllFilters[4].value})
        blur(${AllFilters[5].value}px)
        hue-rotate(${AllFilters[6].value}deg)
        `
        Context.drawImage(image,0,0,canvas.width,canvas.height);
    })
});
// Reset the Filters from the image  
function Reset() {
    let valeurAttribut: any[] = [];
    for (let i = 0; i < AllFilters.length; i++) {
        valeurAttribut.push(AllFilters[i].getAttribute('value'));
        AllFilters[i].value = valeurAttribut[i];
    }
    Context.filter = `none`
    Context.drawImage(image,0,0,canvas.width,canvas.height);
}
// Dowload the image
Download_btn.onclick = ()=> {
    Download_btn.href = canvas.toDataURL();
}