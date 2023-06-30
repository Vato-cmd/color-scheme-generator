const seedColor = document.getElementById('seed-color');
const colorWheel = document.getElementById('color-wheel');
const getColorScheme = document.getElementById('get-color_scheme');
const colorShades = document.getElementById('color-shades');
const countColor = document.getElementById('count-color');

function render(data) {
    let html = '';
    for (let d in data._links.schemes) {
        html += `
            <option>${d}</option>
        `;
    }
    colorShades.innerHTML = html;
}

function asd() {
    let seedColorValue = seedColor.value.slice(1);
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColorValue}&mode=${colorShades.value}&count=${countColor.value}`)
        .then(response => response.json())
        .then(data => {
            render(data);
            let colorHtml = '';
            for (color of data.colors) {
                colorHtml += `
                    <div class="image-div">
                        <div class="image-div_inner">
                            <img src="${color.image.bare}" />
                            <button class="image-div_button">Copy</button>
                            <p class="seed-color-value">${color.hex.value}</p>
                        </div>
                        
                    </div>
                `;
            }
            colorWheel.innerHTML = colorHtml;
            attachCopyEventListeners();
        });
}

function attachCopyEventListeners() {

    const buttons = document.querySelectorAll(".image-div_button")
    buttons.forEach(item => {
        item.addEventListener("click",function(){
            const hexValue = item.closest(".image-div").querySelector(".seed-color-value").textContent
            copyToClipboard(hexValue)
            buttons.forEach(item =>{
                item.textContent = "Copy"
            }) 
            item.textContent ="Copied"
            
        })
    })
}

function copyToClipboard(value) {
    const tempInput = document.createElement('input');
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

seedColor.addEventListener('change', asd);
colorShades.addEventListener('change', asd);
countColor.addEventListener('change', asd);

// Initial rendering
asd();
