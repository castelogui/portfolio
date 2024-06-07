class ContactMe extends HTMLElement {
  connectedCallback() {
    fetch("./components/contactme/contactme.html")
      .then((response) => response.text())
      .then((html) => {
        this.innerHTML = html;
      })
      .catch((error) => {
        console.error("Erro ao carregar o conteúdo:", error);
      });
  }
}

customElements.define("contact-me", ContactMe);

class CardProject extends HTMLElement {
  connectedCallback() {
    const imgSrc = this.getAttribute("img-src");
    const imgAlt = this.getAttribute("img-alt");
    const title = this.getAttribute("title");
    const message = this.getAttribute("message");
    const link = this.getAttribute("link");

    fetch("./components/project/index.html")
      .then((response) => response.text())
      .then((html) => {
        this.innerHTML = html;
        this.querySelector(".card-img").src = imgSrc;
        this.querySelector(".card-img").alt = imgAlt;
        this.querySelector(".card-title").textContent = title;
        this.querySelector(".card-message").textContent = message;
        this.querySelector(".card-link").href = link;
      })
      .catch((error) => {
        console.error("Erro ao carregar o conteúdo:", error);
      });
  }
}

customElements.define("card-project", CardProject);



// Função para carregar o JSON e criar os cards
async function loadProjects() {
  try {
      const response = await fetch('./projects.json');
      const projects = await response.json();
      const cardsWrapper = document.querySelector('.cards-wrapper');
      
      projects.forEach(project => {
          const card = document.createElement('card-project');
          card.setAttribute('img-src', project.imgSrc);
          card.setAttribute('img-alt', project.imgAlt);
          card.setAttribute('title', project.title);
          card.setAttribute('message', project.message);
          card.setAttribute('link', project.link);
          cardsWrapper.appendChild(card);
      });
  } catch (error) {
      console.error('Erro ao carregar os projetos:', error);
  }
}

window.onload = loadProjects;