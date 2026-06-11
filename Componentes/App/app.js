import { criaSecaoJogos, criaJogo, setDados } from '../Jogos/jogos.js';

let dadosLoja = [];

const rotas = {
    "/": () => {
        const root = document.createElement('div');
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
    },
    "/Loja": () => {
        const root = document.createElement('div');
        root.appendChild(criarSubnavLoja());
        root.appendChild(criarMainLoja());
        return root;
    },
    "/Comunidade": () => {
        const root = document.createElement('div');
        const contato = criaContato();
        root.appendChild(contato);

        return root;
    },

    "/Jogos": (id) => {
        const root = document.createElement('div');

        if (id) {
            root.appendChild(criaJogo(id));
        } else {
            root.appendChild(criaSecaoJogos());
            root.appendChild(criaFooter());
        }

        return root;
    },

    "/Sobre": () => {
        const root = document.createElement('div');
        root.style.padding = '60px 10%';
        root.innerHTML = `
        <h1>Sobre Nós</h1>
        <p>
            Somos uma empresa dedicada a fornecer os melhores produtos e serviços para nossos clientes.
            Com anos de experiência no mercado, estamos comprometidos em oferecer qualidade e satisfação.
            Nossa equipe está sempre pronta para ajudar e garantir que sua experiência conosco seja excepcional.
        </p>
    `;
        return root;
    },
    "/Steam": () => {
        const root = document.createElement('div');
        root.style.padding = '60px 10%';

        const h1 = document.createElement('h1');
        h1.textContent = 'Instalar Steam';

        const p = document.createElement('p');
        p.textContent = 'Para instalar o Steam, siga os passos abaixo:';

        const a = document.createElement('a');
        a.textContent = 'Bem-vindo(a) ao Steam';
        a.setAttribute('href', 'https://store.steampowered.com/about/');
        a.setAttribute('target', '_blank');

        root.appendChild(h1);
        root.appendChild(p);
        root.appendChild(a);

        return root;
    },
    "/Categoria": (genero) => {
        const root = document.createElement('div');
        root.style.padding = '60px 10%';

        const btnVoltar = document.createElement('button');
        btnVoltar.textContent = '← Voltar às Categorias';
        btnVoltar.classList.add('loja-subnav-btn');
        btnVoltar.style.marginBottom = '20px';
        btnVoltar.addEventListener('click', () => navegarPara('/Loja'));
        root.appendChild(btnVoltar);

        const h2 = document.createElement('h2');
        h2.textContent = decodeURIComponent(genero);
        h2.classList.add('loja-titulo');
        root.appendChild(h2);

        const grid = document.createElement('div');
        grid.classList.add('loja-game-grid');

        dadosLoja
            .filter(j => j.genero === decodeURIComponent(genero))
            .forEach(jogo => grid.appendChild(criaCardLoja(jogo)));

        root.appendChild(grid);
        return root;
    },
    "/recomendados": () => {
        const root = document.createElement('div');
        root.style.padding = '60px 10%';
        const h2 = document.createElement('h2');
        h2.textContent = 'Recomendados para você';
        h2.classList.add('loja-titulo');
        root.appendChild(h2);
        const grid = document.createElement('div');
        grid.classList.add('loja-game-grid');
        IDS_RECOMENDADOS.forEach(id => {
            const jogo = dadosLoja.find(j => j.appid === id);
            if (jogo) grid.appendChild(criaCardLoja(jogo));
        });
        root.appendChild(grid);
        return root;
    },
};
// FUNÇÕES PARA CRIAR PAGINA LOJA

// Header exclusivo da página Loja: subnav com busca, recomendações e categorias
const criarSubnavLoja = () => {
    const subnav = document.createElement('div');
    subnav.classList.add('loja-subnav');

    const btnRecomendacoes = document.createElement('button');
    btnRecomendacoes.textContent = 'Recomendações';
    btnRecomendacoes.classList.add('loja-subnav-btn');
    btnRecomendacoes.addEventListener('click', () => navegarPara('/recomendados'));

    // Botão Categorias com dropdown
    const btnCategorias = document.createElement('button');
    btnCategorias.textContent = 'Categorias ▾';
    btnCategorias.classList.add('loja-subnav-btn');

    const dropdown = document.createElement('div');
    dropdown.classList.add('categorias-dropdown');
    dropdown.style.display = 'none';

    btnCategorias.addEventListener('click', (e) => {
        e.stopPropagation();
        const aberto = dropdown.style.display === 'block';
        dropdown.style.display = aberto ? 'none' : 'block';

        if (!aberto) {
            dropdown.innerHTML = '';
            const generos = [...new Set(dadosLoja.map(j => j.genero))].sort();
            generos.forEach(genero => {
                const item = document.createElement('div');
                item.classList.add('categoria-dropdown-item');
                item.textContent = genero;
                item.addEventListener('click', () => {
                    dropdown.style.display = 'none';
                    navegarPara(`/Categoria/${encodeURIComponent(genero)}`);
                });
                dropdown.appendChild(item);
            });
        }
    });

    document.addEventListener('click', () => {
        dropdown.style.display = 'none';
    });

    const btnWrapper = document.createElement('div');
    btnWrapper.style.position = 'relative';
    btnWrapper.appendChild(btnCategorias);
    btnWrapper.appendChild(dropdown);

    // Busca — referencia o conteúdo pelo ID para não depender de escopo compartilhado
    const searchWrap = document.createElement('div');
    searchWrap.classList.add('loja-search');

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Buscar na loja');

    input.addEventListener('input', () => {
        const conteudoLoja = document.querySelector('.loja-conteudo');
        if (conteudoLoja) filtrarPorBusca(input.value, conteudoLoja);
    });

    searchWrap.appendChild(input);
    subnav.appendChild(btnRecomendacoes);
    subnav.appendChild(btnWrapper);
    subnav.appendChild(searchWrap);

    return subnav;
}

// Conteúdo principal da página Loja: destaque do dia + grid de jogos
const criarMainLoja = () => {
    const main = document.createElement('div');

    const jogodoDia = dadosLoja[Math.floor(Math.random() * dadosLoja.length)];
    const destaque = document.createElement('div');
    destaque.classList.add('loja-destaque');
    destaque.innerHTML = `
        <div class="destaque-img">
            <img src="${jogodoDia.url_imagem}" alt="${jogodoDia.titulo}">
        </div>
        <div class="destaque-info">
            <h3>${jogodoDia.titulo}</h3>
            <p>${jogodoDia.descricao}</p>
        </div>
    `;

    const conteudoLoja = document.createElement('div');
    conteudoLoja.classList.add('loja-conteudo');
    mostrarTodosJogos(conteudoLoja);

    main.appendChild(destaque);
    main.appendChild(conteudoLoja);

    return main;
}


const IDS_RECOMENDADOS = [730, 570, 620, 1145360, 413150];

const mostrarRecomendacoes = (container) => {
    container.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.textContent = 'Recomendados para você';
    h2.classList.add('loja-titulo');
    container.appendChild(h2);

    const grid = document.createElement('div');
    grid.classList.add('loja-game-grid');

    IDS_RECOMENDADOS.forEach(id => {
        const jogo = dadosLoja.find(j => j.appid === id);
        if (jogo) grid.appendChild(criaCardLoja(jogo));
    });

    container.appendChild(grid);
}

const mostrarCategorias = (container) => {
    container.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.textContent = 'Categorias';
    h2.classList.add('loja-titulo');
    container.appendChild(h2);

    const generos = [...new Set(dadosLoja.map(j => j.genero))].sort();

    const gridCategorias = document.createElement('div');
    gridCategorias.classList.add('categorias-grid');

    generos.forEach(genero => {
        const quantidade = dadosLoja.filter(j => j.genero === genero).length;

        const btn = document.createElement('div');
        btn.classList.add('categoria-card');
        btn.innerHTML = `
            <span class="categoria-nome">${genero}</span>
            <span class="categoria-qtd">${quantidade} jogos</span>
        `;
        btn.addEventListener('click', () => navegarPara(`/Categoria/${encodeURIComponent(genero)}`));
        gridCategorias.appendChild(btn);
    });

    container.appendChild(gridCategorias);
}

const mostrarJogosDaCategoria = (container, genero) => {
    container.innerHTML = '';

    // Botão voltar
    const btnVoltar = document.createElement('button');
    btnVoltar.textContent = '← Voltar às Categorias';
    btnVoltar.classList.add('loja-subnav-btn');
    btnVoltar.style.marginBottom = '20px';
    btnVoltar.addEventListener('click', () => mostrarCategorias(container));
    container.appendChild(btnVoltar);

    const h2 = document.createElement('h2');
    h2.textContent = genero;
    h2.classList.add('loja-titulo');
    container.appendChild(h2);

    const grid = document.createElement('div');
    grid.classList.add('loja-game-grid');

    dadosLoja
        .filter(j => j.genero === genero)
        .forEach(jogo => grid.appendChild(criaCardLoja(jogo)));

    container.appendChild(grid);
}

const mostrarTodosJogos = (container) => {
    container.innerHTML = '';

    const grid = document.createElement('div');
    grid.classList.add('loja-game-grid');

    dadosLoja.forEach(jogo => grid.appendChild(criaCardLoja(jogo)));

    container.appendChild(grid);
}

const filtrarPorBusca = (query, container) => {
    const q = query.toLowerCase().trim();

    if (!q) {
        mostrarTodosJogos(container);
        return;
    }

    container.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.textContent = `Resultados para "${query}"`;
    h2.classList.add('loja-titulo');
    container.appendChild(h2);

    const grid = document.createElement('div');
    grid.classList.add('loja-game-grid');

    const resultados = dadosLoja.filter(j =>
        j.titulo.toLowerCase().includes(q) || j.genero.toLowerCase().includes(q)
    );

    if (resultados.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'Nenhum jogo encontrado.';
        p.style.color = '#c7d5e0';
        container.appendChild(p);
        return;
    }

    resultados.forEach(jogo => grid.appendChild(criaCardLoja(jogo)));
    container.appendChild(grid);
}

const criaCardLoja = (jogo) => {
    const card = document.createElement('div');
    card.classList.add('loja-card');

    card.addEventListener('click', () => {
        history.pushState({}, '', `/Jogos/${jogo.appid}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
    });

    // Imagem
    const imgWrap = document.createElement('div');
    imgWrap.classList.add('loja-card-img');
    const img = document.createElement('img');
    img.setAttribute('src', jogo.url_imagem);
    img.setAttribute('alt', jogo.titulo);
    imgWrap.appendChild(img);

    // Info central
    const info = document.createElement('div');
    info.classList.add('loja-card-info');

    const titulo = document.createElement('div');
    titulo.classList.add('loja-card-titulo');
    titulo.textContent = jogo.titulo;

    const genero = document.createElement('div');
    genero.classList.add('loja-card-genero');
    genero.textContent = jogo.genero;

    info.appendChild(titulo);
    info.appendChild(genero);

    // Área de preço (direita)
    const precoArea = document.createElement('div');
    precoArea.classList.add('loja-card-preco-area');

    if (jogo.desconto > 0) {
        const desconto = document.createElement('span');
        desconto.classList.add('loja-card-desconto');
        desconto.textContent = `-${jogo.desconto}%`;
        precoArea.appendChild(desconto);
    }

    const preco = document.createElement('span');
    preco.classList.add('loja-card-preco');
    if (jogo.valor_mercado === 0) {
        preco.textContent = 'Gratuito';
        preco.classList.add('gratuito');
    } else {
        preco.textContent = `R$${jogo.valor_mercado.toFixed(2)}`;
    }
    precoArea.appendChild(preco);

    card.appendChild(imgWrap);
    card.appendChild(info);
    card.appendChild(precoArea);

    return card;
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
    p.textContent = "@2026 Steam. Todos os direitos reservados.";
    footer.appendChild(p);
    return footer;
}

const main = async () => {
    const resposta = await fetch('./Componentes/Jogos/jogos.json');
    dadosLoja = await resposta.json();
    setDados(dadosLoja);

    const linkcss = document.createElement('link');
    linkcss.setAttribute('rel', 'stylesheet');
    linkcss.setAttribute('href', './Componentes/App/app.css');
    document.head.appendChild(linkcss);

    const headerEl = document.getElementById('header');
    headerEl.appendChild(criaHeader());
    renderizandoRotas(window.location.pathname);
}
main();

function renderizandoRotas(path) {
    let partes = path.split("/");
    let novoPath = "/" + partes[1];
    const id = partes[2] || null;
    if (novoPath === "/index.html") {
        novoPath = "/";
    }
    const pagina = rotas[novoPath];
    const root = document.getElementById('root');
    if (pagina) {
        root.innerHTML = '';
        root.appendChild(pagina(id));
    } else {
        root.innerHTML = `<h1>404</h1><p>Página não encontrada.</p>`;
    }
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