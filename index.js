import { getLogo } from "./getLogo.js";

const searchInput = document.querySelector(".js-search-input");
const searchForm = document.querySelector(".js-search-form");
const resultContainer = document.querySelector(".js-result-container");
const exportContainer = document.querySelector(".js-export-button");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;
  showFetchingMessage();
  getLogo(searchTerm).then((data) => {
    console.log(data);
    if (data != undefined) {
      renderLogo(data);
    } else {
      renderError();
    }
  });
});

function renderLogo(data) {
  clearContainer();
  resultContainer.classList.add("border-class");
  const logo = document.createElement("img");
  logo.setAttribute("id", "logo-image");
  if (/^([\w]+\:)?\/\//.test(data) && data.indexOf(location.host) === -1) {
    logo.crossOrigin = "anonymous"; // or "use-credentials"
  }
  
  let c = document.createElement("canvas");
  const ctx = c.getContext('2d');
  logo.onload = () =>{ 
    c.width = logo.width;
    c.height = logo.height;
    ctx.drawImage(logo, 0, 0);
  }
  logo.src = data;
  resultContainer.appendChild(c);
  const btnDownload = document.createElement("button");
  btnDownload.innerHTML = "Export as PNG";
  exportContainer.appendChild(btnDownload);
  btnDownload.addEventListener("click", () => {
    if(window.navigator.msSaveBlob){
      window.navigator.msSaveBlob(c.msToBlob(), "img.png");
    } else {
      const a = document.createElement("a");
      exportContainer.appendChild(a);
      a.href = c.toDataURL();
      a.download = "img.png";
      a.click();
      exportContainer.removeChild(a);
    }
  });
}

function downloadButton(){
  exportContainer.removeChild(button);  
}

function clearContainer() {
  resultContainer.innerHTML = "";
  exportContainer.innerHTML = "";
}
function showFetchingMessage() {
  clearContainer();
  resultContainer.classList.remove("border-class");
  resultContainer.innerHTML = `<div class="loader">
  <svg viewBox="0 0 80 80">
      <circle id="test" cx="40" cy="40" r="32"></circle>
  </svg>
</div>`;
}

function renderError() {
  clearContainer();
  resultContainer.classList.remove("border-class");
  resultContainer.innerHTML = `<p class="msg">Invalid url!</p>`;
}
