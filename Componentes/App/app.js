import { criaSecaoJogos, criaJogo } from '../Jogos/jogos.js';

const rotas = {
    "/": {
        renderizar: function () {
            const root = document.createElement('root');
            root.style.padding = '60px 10%';

            const h1 = document.createElement('h1');
            h1.textContent = 'Bem-vindo à Steam';

            const p = document.createElement('p');
            p.textContent = "A Steam é a plataforma de jogos mais popular do mundo, oferecendo uma vasta biblioteca de jogos para PC, Mac e Linux.";

            const hero = criaHero();
            
            root.appendChild(h1);
            root.appendChild(p);
            root.appendChild(hero);

            return root;
        }
    },
    "/Loja": {
        renderizar: function () {
            const root = document.createElement('root');
            root.style.padding = '60px 10%';

            const h1 = document.createElement('h1');
            h1.textContent = 'Loja';

            const p = document.createElement('p');
            p.textContent = 'Bem-vindo à nossa loja! Aqui você encontrará uma variedade de produtos incríveis para atender às suas necessidades. Explore nossas categorias e descubra ofertas exclusivas. Aproveite suas compras!';

            root.appendChild(h1);
            root.appendChild(p);

            return root;
        }
    },
    "/Comunidade": {
        renderizar: function () {
            const root = document.createElement('root');
            const contato = criaContato();
            root.appendChild(contato);

            return root;
        }
    },
    "/Jogos": {
        renderizar: function () {
            const root = document.createElement('root');

            const secaojogos = criaSecaoJogos();
            const jogos = criaJogo();
            const footer = criaFooter();

            root.appendChild(secaojogos);
            root.appendChild(jogos);
            root.appendChild(footer);

            return root;
        }
    },
    "/Sobre": {
        renderizar: function () {
            const root = document.createElement('root');
            root.style.padding = '60px 10%';

            const h1 = document.createElement('h1');
            h1.textContent = 'Sobre Nós';

            const p = document.createElement('p');
            p.textContent = 'Somos uma empresa dedicada a fornecer os melhores produtos e serviços para nossos clientes. Com anos de experiência no mercado, estamos comprometidos em oferecer qualidade e satisfação. Nossa equipe está sempre pronta para ajudar e garantir que sua experiência conosco seja excepcional.';

            root.appendChild(h1);
            root.appendChild(p);

            return root;
        }
    },
    "/Steam": {
        renderizar: function () {
            const root = document.createElement('root');
            root.style.padding = '60px 10%';

            const h1 = document.createElement('h1');
            h1.textContent = 'Instalar Steam';

            const p = document.createElement('p');
            p.textContent = 'Para instalar o Steam, siga os passos abaixo:';

            const b = document.createElement('p');
            b.textContent = 'COLOQUEI MESMO FDS KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK';

            const a = document.createElement('a');
            a.textContent = 'Bem-vindo(a) ao Steam';
            a.setAttribute('href', 'https://store.steampowered.com/about/');
            a.setAttribute('target', '_blank');

            root.appendChild(h1);
            root.appendChild(p);
            root.appendChild(a);
            root.appendChild(b);

            return root;
        }
    }
}

const criaHeader = () => {
    const header = document.createElement('header');
    const div = document.createElement('div');
    div.classList.add('logo');
    div.textContent = 'STEAM';
    const nav = document.createElement('nav');
    nav.setAttribute('id', 'subnav');
    const a1 = criarLink('Início', '/');
    const a2 = criarLink('Loja', '/Loja');
    const a3 = criarLink('Comunidade', '/Comunidade');
    const a4 = criarLink('Jogos', '/Jogos');
    const a5 = criarLink('Sobre', '/Sobre');
    const a6 = criarLink('Instalar Steam', '/Steam');
    a6.classList.add('btn-nav');

    header.appendChild(div);
    header.appendChild(nav);
    nav.appendChild(a1);
    nav.appendChild(a2);
    nav.appendChild(a3);
    nav.appendChild(a4);
    nav.appendChild(a5);
    nav.appendChild(a6);

    return header;
}

const criarLink = (texto, link) => {
    const a = document.createElement('a');
    a.textContent = texto;
    a.setAttribute('href', link);
    a.setAttribute('data-link', '');
    return a;
}

const criaHero = () => {
    const hero = document.createElement('section');
    hero.classList.add('hero');
    const heroContent = document.createElement('div');
    heroContent.classList.add('hero-content');
    const h1 = document.createElement('h1');
    h1.textContent = "Promoção de Verão Steam";
    const p = document.createElement('p');
    p.textContent = "Milhares de jogos com até 90% de desconto.";
    const button = document.createElement('button');
    button.classList.add('cta');
    button.textContent = "Explorar Ofertas";
    heroContent.appendChild(h1);
    heroContent.appendChild(p);
    heroContent.appendChild(button);
    hero.appendChild(heroContent);
    return hero;
}

const criaContato = () => {
    const contact = document.createElement('section');
    contact.classList.add('contact');
    const h2 = document.createElement('h2');
    h2.textContent = "Entre em Contato caso tenha dúvidas, sugestões ou reportes de bugs.";
    const form = document.createElement('form');
    const inputText = document.createElement('input');
    inputText.setAttribute("type", "text");
    inputText.setAttribute("placeholder", "Fale Conosco");
    inputText.required = true;
    const inputEmail = document.createElement('input');
    inputEmail.setAttribute("type", "email");
    inputEmail.setAttribute("placeholder", "Seu Email");
    inputEmail.required = true;
    const button = document.createElement('button');
    button.setAttribute("type", "submit");
    button.textContent = "Enviar";
    form.appendChild(inputText);
    form.appendChild(inputEmail);
    form.appendChild(button);
    contact.appendChild(h2);
    contact.appendChild(form);
    return contact;
}

const criaFooter = () => {
    const footer = document.createElement('footer');
    const p = document.createElement('p');
    p.textContent = "milton vulgo bonilton";
    footer.appendChild(p);
    return footer;
}

const main = () => {
    const linkcss = document.createElement('link');
    linkcss.setAttribute('rel', 'stylesheet');
    linkcss.setAttribute('href', './Componentes/App/app.css');
    document.head.appendChild(linkcss);

    renderizandoRotas(window.location.pathname);
}

main();

function renderizandoRotas(path) {
    const root = document.getElementById('root');

    // se o caminho não existir nas rotas (ex: /index.html do Live Server), vai para "/"
    if (!rotas[path]) {
        navegarPara('/');
        return;
    }

    root.innerHTML = '';

    const header = criaHeader();
    root.appendChild(header);

    const conteudo = rotas[path].renderizar();
    root.appendChild(conteudo);
}

document.addEventListener("click", function (event) {
    if (event.target.matches("[data-link]")) {
        event.preventDefault();
        const novocaminho = event.target.getAttribute("href");
        navegarPara(novocaminho);
    }
});

function navegarPara(path) {
    history.pushState({}, "", path);
    renderizandoRotas(path);
}

window.addEventListener("popstate", function () {
    renderizandoRotas(window.location.pathname);
});
