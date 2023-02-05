let sceneBg = document.getElementById('bg-fx');
let parallaxInstanceBg = new Parallax(sceneBg);
let scenePj = document.getElementById('pj');
let parallaxInstance = new Parallax(scenePj);

let itemCentralCat = document.querySelector('#item-central')
let boxItemsFlotantes = document.querySelector('.items-flotantes')
let titleCatalogo = document.querySelector('.catalogo__titulo')
let boxElementos = document.querySelector('.box-items-gral')
let filterBtn = document.querySelectorAll('#filter-btn')

function renderItems(arr) { 
    arr.forEach((el) => { 
        let div = document.createElement('div')

        div.className = `box_item`
        div.innerHTML = `
                        <div class="box__item">
                            <div class="box__pago__items">
                                <button onclick="handlePagos(true);"><i class="fa-solid fa-bag-shopping"></i> COMPRAR AHORA</button>
                            </div>
                            <div class="head__item">
                                <img src="${el.url_img}" id="img-producto" style="min-height: 200px">
                            </div>
                            <div class="info__item">
                                <h4>${el.descripcion}</h4>
                                <p>${el.precio_coins} COINS</p>
                            </div>
                        </div>
                        `
        boxElementos.append(div)
    })
}

function removeElements(nodo) { 
    while (nodo.firstChild){
        nodo.removeChild(nodo.firstChild)
      }
}

function animationCatalogo(elemento) { 
    elemento.style.animation = 'toBottom 1s'
    elemento.style.top = '300px'
    setTimeout(() => { 
        elemento.style.animation = 'toTop 1s'
        elemento.style.top = '0'
    }, 500)
}

let itemsVip; 
async function getData() {
    itemsVip = await fetch('items.json').then(res => res.json()).then(data => data)
}
getData()

setTimeout(() => {
    renderItems(itemsVip)
}, 100)


filterBtn.forEach((btn) => { 
    btn.addEventListener('click', () => { 
        removeElements(boxElementos)
        let itemsFiltrados = itemsVip.filter(item => item.categoria == btn.innerHTML)
        
        itemCentralCat.style.animation = 'toBottom 1s'
        itemCentralCat.style.marginBottom = '-300px'
        setTimeout(() => { 
            itemCentralCat.setAttribute('src', './assets/img/catalogo_header_' + btn.innerHTML + '.png')
            itemCentralCat.style.animation = 'toTop 1s'
            itemCentralCat.style.marginBottom = '0px'
            titleCatalogo.innerHTML = btn.innerHTML
        }, 500)

        animationCatalogo(titleCatalogo)
        animationCatalogo(boxItemsFlotantes)

        renderItems(itemsFiltrados)
    })
})

let ventanaOpen = false
const ventana = document.querySelector('#ventana')
const btnVentana = document.querySelectorAll('#btn-ventana')

btnVentana.forEach(element => {
    element.addEventListener('click', () => { 
        if (ventanaOpen) { 
            removeElements(boxElementos)
            ventana.style.animation = 'close 1s' 
            setTimeout(() => { 
                ventana.style.display = 'none'
            }, 999)
        } else { 
            renderItems(itemsVip)
            ventana.style.animation = 'open 1s' 
            ventana.style.display = 'block'
            ScrollReveal().reveal('.catalogo__header', { delay: 500, duration: 2500 });
            ScrollReveal().reveal('.catalogo__left', { delay: 700, duration: 2500 });
            ScrollReveal().reveal('.catalogo__right', { delay: 850, duration: 2500, reset: true });
        }
        ventanaOpen = !ventanaOpen
    })
});

let membresiaOpen = true
const membresia = document.querySelector('#ventana-membresia')
const btnMembresia = document.querySelectorAll('#btn-ventana-membresia')

btnMembresia.forEach(element => {
    element.addEventListener('click', () => { 
        if (membresiaOpen) { 
            membresia.style.display = 'none'
            
        } else { 
            membresia.style.display = 'flex'
        }
        membresiaOpen = !membresiaOpen
    })
});

let ventanaDePagoOpen = false 
const ventanaPago = document.querySelector('#ventana-pago')

function handlePagos(arg) { 
    removeElements(document.querySelector('.box-data-elementos-terminos'))
    if (ventanaDePagoOpen) { 
        ventanaPago.style.display = 'none'
    } else { 
        let div = document.createElement('div')

        div.className = 'data'

        arg 
        ? div.innerHTML = `
                        <h5 style="margin-bottom: 10px;">Indicaciones para hacer el pago</h5>
                        <p>1. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                        <p>2. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                        <p>3. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                        <div class="terminos">
                            <span style="font-size: 0.9em; text-transform: uppercase; font-weight: bold;">Términos y condiciones<br><br></span>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam cum in sint itaque rem perferendis earum expedita aut omnis molestiae? Repellendus quae nisi, corporis consequatur eum optio ex culpa rem.
                        </div>
        `
        : div.innerHTML = `
                        <h5 style="margin-bottom: 10px;">Indicaciones para hacer el pago</h5>
                        <p>1. Ingresar a tu cuenta de Paypal y configura xd enviar pago</p>
                        <p>2. Ingresar a tu cuenta de Paypal y configura para enviar pago</p>
                        <p>3. Ingresar a tu cuenta de Paypal y configura para enviar pago</p>
                        <p>4. Ingresar a tu cuenta de Paypal y configura para enviar pago</p>
                        <div class="terminos">
                            <span style="font-size: 0.9em; text-transform: uppercase; font-weight: bold;">Términos y condiciones<br><br></span>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam cum in sint itaque rem perferendis earum expedita aut omnis molestiae? Repellendus quae nisi, corporis consequatur eum optio ex culpa rem.
                        </div>
        ` 

        document.querySelector('.box-data-elementos-terminos').appendChild(div)
        ventanaPago.style.display = 'flex'
    }

    ventanaDePagoOpen = !ventanaDePagoOpen
}
