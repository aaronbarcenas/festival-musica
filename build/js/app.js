function iniciarApp(){crearGaleria()}function crearGaleria(){const e=document.querySelector(".galeria-imagenes");for(let n=1;n<=12;n++){const t=document.createElement("picture");t.innerHTML=`\n      <source srcset="build/img/thumb/${n}.webp" type="image/webp">\n      <img loading="lazy" width="200" height="300" src="img/thumb/${n}.jpg" alt="imagen-${n}">\n    `,t.onclick=function(){mostrarImagen(n)},e.appendChild(t)}}function mostrarImagen(e){const n=document.createElement("picture");n.innerHTML=`\n    <source srcset="build/img/grande/${e}.webp" type="image/webp">\n    <img loading="lazy" width="200" height="300" src="img/grande/${e}.jpg" alt="imagen-${e}">\n  `;const t=document.createElement("DIV");t.appendChild(n),t.classList.add("overlay"),t.onclick=function(){document.querySelector("body").classList.remove("fijar-body"),t.remove()};const i=document.createElement("P");i.textContent="X",i.classList.add("btn-cerrar"),i.onclick=function(){t.remove(),c.classList.remove("fijar-body")},t.appendChild(i);const c=document.querySelector("body");c.appendChild(t),c.classList.add("fijar-body")}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));
//# sourceMappingURL=app.js.map
