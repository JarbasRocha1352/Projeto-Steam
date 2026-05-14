import dados from './jogos.json' with { type: 'json' };

const criaCard = (nome, descricao, url, genero, preco, downloads, appid) => {
    const card = document.createElement("div");
    card.classList.add("game-card");
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
        history.pushState({}, "", `/Jogos/${appid}`);
        window.dispatchEvent(new PopStateEvent("popstate"));
    });

    const imagem = document.createElement("div");
    imagem.classList.add("game-img");
    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.setAttribute("width", "200px");
    imagem.appendChild(img);

    const titulo = document.createElement("h3");
    titulo.textContent = nome;

    const descontoJogo = document.createElement("p");
    descontoJogo.textContent = descricao;

    const generoJogos = document.createElement("p");
    generoJogos.textContent = genero;

    const valorJogo = document.createElement("p");
    valorJogo.textContent = `R$${preco.toFixed(2)}`;

    const downloadsJogo = document.createElement("p");
    downloadsJogo.textContent = `Downloads: ${downloads}`;

    card.appendChild(imagem);
    card.appendChild(titulo);
    card.appendChild(descontoJogo);
    card.appendChild(generoJogos);
    card.appendChild(valorJogo);
    card.appendChild(downloadsJogo);

    return card;
}

export const CriaCardAleatorio = (vetorJogos) => {
    const aleatorio = Math.floor(Math.random() * vetorJogos.length);
    const jogo = vetorJogos[aleatorio];
    return criaCard(
        jogo.titulo, jogo.descricao, jogo.url_imagem,
        jogo.genero, jogo.valor_mercado, jogo.qtd_downloads,
        jogo.appid  // ← sem isso o clique não funciona
    );
}

export const criaSecaoJogos = () => {
    const secao = document.createElement('section');
    secao.classList.add('games');
    const h2 = document.createElement('h2');
    h2.textContent = "Jogos em Destaque";
    const div = document.createElement('div');
    div.classList.add('game-grid');
    div.setAttribute("id", "cardsGrid");

    secao.appendChild(h2);
    secao.appendChild(div);

    for (let i = 0; i < 10; i++) {
        div.appendChild(CriaCardAleatorio(dados));
    }

    return secao;
}

export const criaJogo = (appid) => {
    const css = document.createElement('link');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('href', '/Componentes/Jogos/jogos.css');
    document.head.appendChild(css);

    const id = Number(appid);
    const jogo = dados.find(e => e.appid === id);

    if (!jogo) {
        const erro = document.createElement('p');
        erro.textContent = "Jogo não encontrado.";
        return erro;
    }
    const section = document.createElement('section');
    section.classList.add('jogo');

    const jogoContent = document.createElement('div');
    jogoContent.classList.add('jogo-content');

    const jogoInfo = document.createElement('div');
    jogoInfo.classList.add('jogo-info');

    const jogoImagem = document.createElement('div');
    jogoImagem.classList.add('jogo-imagem');

    const h1 = document.createElement('h1');
    h1.textContent = jogo.titulo;  // ← nome real do jogo

    const p = document.createElement('p');
    p.textContent = jogo.descricao;  // ← descrição real

    const preco = document.createElement('p');
    preco.textContent = `R$${jogo.valor_mercado.toFixed(2)}`;

    const button = document.createElement('button');
    button.classList.add('cta');
    button.textContent = `Comprar ${jogo.titulo}`;  // ← nome real

    const img = document.createElement('img');
    img.setAttribute('src', jogo.url_imagem);  // ← imagem real
    img.setAttribute('alt', jogo.titulo);

    jogoImagem.appendChild(img);
    jogoInfo.appendChild(h1);
    jogoInfo.appendChild(p);
    jogoInfo.appendChild(preco);
    jogoInfo.appendChild(button);
    jogoContent.appendChild(jogoInfo);
    jogoContent.appendChild(jogoImagem);
    section.appendChild(jogoContent);

    return section;
}