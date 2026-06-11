let dados = [];

export const setDados = (d) => { dados = d; }

const criaCard = (jogo) => {
    const card = document.createElement("div");
    card.classList.add("game-card");
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
        history.pushState({}, "", `/Jogos/${jogo.appid}`);
        window.dispatchEvent(new PopStateEvent("popstate"));
    });

    const imagem = document.createElement("div");
    imagem.classList.add("game-img");
    const img = document.createElement("img");
    img.setAttribute("src", jogo.url_imagem);
    img.setAttribute("alt", jogo.titulo);
    imagem.appendChild(img);

    const body = document.createElement("div");
    body.classList.add("game-card-body");

    const titulo = document.createElement("h3");
    titulo.textContent = jogo.titulo;

    const genero = document.createElement("p");
    genero.classList.add("game-card-genero");
    genero.textContent = jogo.genero;

    const precoWrap = document.createElement("div");
    precoWrap.classList.add("game-card-preco-wrap");

    if (jogo.desconto > 0) {
        const desconto = document.createElement("span");
        desconto.classList.add("loja-desconto");
        desconto.textContent = `-${jogo.desconto}%`;
        precoWrap.appendChild(desconto);
    }

    const preco = document.createElement("span");
    preco.classList.add("game-card-preco");
    if (jogo.valor_mercado === 0) {
        preco.textContent = "Gratuito";
        preco.classList.add("gratuito");
    } else {
        preco.textContent = `R$${jogo.valor_mercado.toFixed(2)}`;
    }
    precoWrap.appendChild(preco);

    body.appendChild(titulo);
    body.appendChild(genero);
    body.appendChild(precoWrap);

    card.appendChild(imagem);
    card.appendChild(body);

    return card;
}

export const CriaCardAleatorio = (vetorJogos, tamanho) => {
    const vetinseridos = [];
    for (let i = 0; i < tamanho; i++) {
        const aleatorio = Math.floor(Math.random() * vetorJogos.length);
        if(!vetinseridos.includes(aleatorio)) {
            vetinseridos.push(aleatorio);
        } else {
            i--;
        }
    }
    return vetinseridos.map(indice => criaCard(vetorJogos[indice]));
    //return criaCard(vetorJogos[vetinseridos]);
}

export const criaSecaoJogos = () => {
    // Garante que o CSS está carregado mesmo sem passar por criaJogo()
    if (!document.querySelector('link[href="/Componentes/Jogos/jogos.css"]')) {
        const css = document.createElement('link');
        css.setAttribute('rel', 'stylesheet');
        css.setAttribute('href', '/Componentes/Jogos/jogos.css');
        document.head.appendChild(css);
    }

    const secao = document.createElement('section');
    secao.classList.add('games');

    const h2 = document.createElement('h2');
    h2.textContent = "Jogos em Destaque";

    const div = document.createElement('div');
    div.classList.add('game-grid');
    div.setAttribute("id", "cardsGrid");

    secao.appendChild(h2);
    secao.appendChild(div);

   const aleatorios = CriaCardAleatorio(dados, 10);

   for (let i = 0; i < aleatorios.length; i++) {
    div.appendChild(aleatorios[i]);
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
    h1.textContent = jogo.titulo;

    const p = document.createElement('p');
    p.textContent = jogo.descricao;

    const preco = document.createElement('p');
    preco.textContent = jogo.valor_mercado === 0 ? 'Gratuito' : `R$${jogo.valor_mercado.toFixed(2)}`;

    const button = document.createElement('button');
    button.classList.add('cta');
    button.textContent = `Comprar ${jogo.titulo}`;

    const img = document.createElement('img');
    img.setAttribute('src', jogo.url_imagem);
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