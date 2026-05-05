import dados from './jogos.json' with { type: 'json' };

// dados.forEach(jogo => console.log(jogo.titulo)) MOSTRAR APENAS O TITULO DOS JOGOS

// dados.forEach(jogo => {
//     console.log(jogo.titulo, "-", jogo.genero) // MOSTRAR O TITULO E O GENERO DOS JOGOS
// });

// const qtd = dados.filter(jogo => jogo.desconto > 0).length; // MOSTRAR A QUANTIDADE DE JOGOS COM DESCONTO
// console.log(qtd);

// const titulos = dados.map(jogo => jogo.titulo) // CRIAR UM VETOR APENAS COM OS TITULOS DOS JOGOS
// console.log(titulos);

// const jogosComPreco = dados.map(jogo => {// CRIAR UM VETOR COM O TITULO E O PREÇO FINAL DOS JOGOS (PREÇO FINAL = VALOR DE MERCADO - DESCONTO)
//     const precoFinal = jogo.valor_mercado * (1 - jogo.desconto / 100);
//     return {
//         titulo: jogo.titulo,               
//         preco: precoFinal
//     };
// });
// console.log(jogosComPreco);

// const frases = dados.map(jogo =>//CRIAR UM VETOR DE FRASES COM O TITULO E O DESCONTO DOS JOGOS(EX: "JOGO X ESTÁ COM Y% DE DESCONTO")
//     `${jogo.titulo} está com ${jogo.desconto}% de desconto`
// );
// console.log(frases);

// export const filtraGenero = (genero) => { //CRIAR UMA FUNÇÃO QUE RECEBE UM GÊNERO COMO PARÂMETRO E RETORNA UM VETOR COM OS JOGOS DESSE GÊNERO
//     return dados.filter(e => {
//         if(e.genero === genero)
//             return true;
//     })
// }
// console.log(filtraGenero("RPG"))
// export const filtratitulo = (titulo) => { //CRIAR UMA FUNÇÃO QUE RECEBE UM TÍTULO COMO PARÂMETRO E RETORNA UM VETOR COM O JOGO DESSE TÍTULO
//     return dados.find(e => {
//         if(e.titulo === titulo)
//         return true;
//     })uj
// }
// console.log(filtratitulo("DRAGON BALL Z: KAKAROT"));

// const desconto50 = dados.filter(e => {//CRIAR UM VETOR COM OS JOGOS QUE ESTÃO COM DESCONTO MAIOR QUE 50%
//     if(e.desconto > 50)
//         return true;
// })
// desconto50.forEach(e => {
//     console.log(e.titulo, "-", e.desconto + "%")
// })

// const populares = dados.filter(e => { //CRIAR UM VETOR COM OS JOGOS QUE TIVERAM MAIS DE 10 MILHÕES DE DOWNLOADS
//     if(e.qtd_downloads > 10000000)
//         return true;
// })
// populares.forEach(e => {
//     console.log(e.titulo, "-", e.qtd_downloads)
// })

// const gratis = dados.filter(e => { //CRIAR UM VETOR COM OS JOGOS QUE ESTÃO GRATUITOS (VALOR DE MERCADO = 0)
//     if(e.valor_mercado === 0)
//         return true;
// })
// gratis.forEach(e => {
//     console.log(e.titulo, "- R$", e.valor_mercado)
// })

// const baratos = dados.filter(e => {//CRIAR UM VETOR COM OS JOGOS QUE ESTÃO BARATOS (VALOR DE MERCADO MENOR QUE 20 REAIS)
//     if(e.valor_mercado < 20)
//         return true;
// })
// baratos.forEach(e => {
//     console.log(e.titulo, "- R$", e.valor_mercado)
// })

// const jogo = dados.find(e => { //CRIAR UMA FUNÇÃO QUE RECEBE UM TÍTULO COMO PARÂMETRO E RETORNA O JOGO COM ESSE TÍTULO
//     if(e.titulo === "DRAGON BALL Z: KAKAROT")
//         return true;
// })
// console.log(jogo.titulo, "-", jogo.genero)

// const gratuito = dados.find(e => {// CRIAR UMA FUNÇÃO QUE RETORNA O PRIMEIRO JOGO GRATUITO (VALOR DE MERCADO = 0)
//     if(e.valor_mercado === 0)
//         return true;
// })
// console.log(gratuito.titulo, "- R$", gratuito.valor_mercado)

// const desconto70 = dados.find(e => {//CRIAR UMA FUNÇÃO QUE RETORNA O PRIMEIRO JOGO COM DESCONTO MAIOR QUE 70%
//     if(e.desconto > 70)
//         return true;
// })
// console.log(desconto70.titulo, "-", desconto70.desconto + "%")

// const jogoApp = dados.find(e => {//CRIAR UMA FUNÇÃO QUE RETORNA O JOGO COM O APPID 
//     if(e.appid === 730)
//         return true;
// })
// console.log(jogoApp.titulo)

// const fps = dados.filter(e => { //CRIAR UM VETOR COM OS TÍTULOS DOS JOGOS DO GÊNERO "FPS"
//  if(e.genero === "FPS")
//             return true;
//     })
//     .map(e => {
//         return e.titulo
//     })
// fps.forEach(e => {
//     console.log(e)
// })


const criaCard = (nome, desconto, url, genero, preco, downloads ) => {
    // cria a div principal
    const card = document.createElement("div");
    card.classList.add("game-card");
    // cria a imagem
    const imagem = document.createElement("div");
    imagem.classList.add("game-img");
    const img = document.createElement("img")
    img.setAttribute("src", url)
    img.setAttribute("width", "200px")
    imagem.appendChild(img);
    // cria o título
    const titulo = document.createElement("h3");
    titulo.textContent = nome;
    // cria o desconto
    const descontoJogo = document.createElement("p");
    descontoJogo.textContent = desconto;
    const generoJogos = document.createElement("p");
    generoJogos.textContent = genero;
    const valorJogo = document.createElement("p");
    valorJogo.textContent = `R$${preco.toFixed(2)}`;
    const downloadsJogo = document.createElement("p");
    downloadsJogo.textContent = `Downloads: ${downloads}`;

    
    // montar estrutura
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
    return criaCard(jogo.titulo, jogo.descricao, jogo.url_imagem, jogo.genero, jogo.valor_mercado, jogo.qtd_downloads);
}

export const criaSecaoJogos = () => {
    const secao = document.createElement('section')
    secao.classList.add('games');
    const h2 = document.createElement('h2')
    h2.textContent = "Jogos em Destaque"
    const div = document.createElement('div')
    const genero = document.createElement('p');
    const preco = document.createElement('p');
    const desconto = document.createElement('p');
    const qtd_downloads = document.createElement('p');
    div.classList.add('game-grid');
    div.setAttribute("id", "cardsGrid")
    genero.classList.add('game-grid');
    genero.setAttribute("id", "cardsGrid");
    preco.classList.add('game-grid');
    preco.setAttribute("id", "cardsGrid");
    desconto.classList.add('game-grid');
    desconto.setAttribute("id", "cardsGrid");
    qtd_downloads.classList.add('game-grid');
    qtd_downloads.setAttribute("id", "cardsGrid");

    secao.appendChild(h2)
    secao.appendChild(div)
    secao.appendChild(genero)
    secao.appendChild(preco)
    secao.appendChild(desconto)
    secao.appendChild(qtd_downloads)
    

    
    for (let i = 0; i < 9; i++) {
        div.appendChild(CriaCardAleatorio(dados))
    }

    return secao;
}

export const criaJogo = () => {
    const css = document.createElement('link');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('href', './Componentes/Jogos/jogos.css');
    document.head.appendChild(css);
    const jogo = document.createElement('section');
    const jogoContent = document.createElement('div');
    const jogoInfo = document.createElement('div');
    const jogoImagem = document.createElement('div');
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    const button = document.createElement('button');
    const img = document.createElement('img');
    jogoContent.classList.add('jogo-content');
    jogo.classList.add('jogo');
    jogoInfo.classList.add('jogo-info');
    jogoImagem.classList.add('jogo-imagem');
    button.classList.add('cta');
    h1.textContent = "NOME DO JOGO";
    p.innerHTML = `Grand Theft Auto V é um jogo eletrônico de ação e aventura desenvolvido pela Rockstar North e publicado pela Rockstar Games.
É o sétimo título principal da série Grand Theft Auto e foi lançado originalmente em 17 de setembro de 2013 para PlayStation 3 e Xbox 360, com remasterizações lançadas em 2014 para PlayStation 4 e Xbox One, em 2015 para Microsoft Windows e em 2022 para PlayStation 5 e Xbox Series X/S.
O jogo se passa no estado ficcional de San Andreas, com a história da campanha um jogador seguindo três criminosos e seus esforços para realizarem assaltos sob a pressão de uma agência governamental.
O mundo aberto permite que os jogadores naveguem livremente pelas áreas rurais e urbanas de San Andreas.`;

    button.textContent = "Comprar NOME DO JOGO";
    img.setAttribute('src', 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg');
    img.setAttribute('alt', 'NOME DO JOGO');
    jogoImagem.appendChild(img);
    jogoInfo.appendChild(h1);
    jogoInfo.appendChild(p);
    jogoInfo.appendChild(button);
    jogoContent.appendChild(jogoInfo);
    jogoContent.appendChild(jogoImagem);
    jogo.appendChild(jogoContent);

    return jogo;
}

// const criaDetalhesJogoHTML = (titulo, descricao, url_imagem) => {
//     const section = document.createElement('section');
//     section.classList.add('jogo');
//     const content = document.createElement('div');
//     content.classList.add('jogo-content');
//     const info = document.createElement('div');
//     info.classList.add('jogo-info');
//     const h1 = document.createElement('h1');
//     h1.textContent = titulo;
//     const p = document.createElement('p');
//     p.textContent = descricao;
//     const button = document.createElement('button');
//     button.classList.add('cta');
//     button.textContent = `Comprar ${titulo}`;
//     const imagemDiv = document.createElement('div');
//     imagemDiv.classList.add('jogo-imagem');
//     const img = document.createElement('img');
//     img.setAttribute('src', url_imagem);
//     img.setAttribute('alt', titulo);
//     imagemDiv.appendChild(img);
//     info.appendChild(h1);
//     info.appendChild(p);
//     info.appendChild(button);
//     content.appendChild(info);
//     content.appendChild(imagemDiv);
//     section.appendChild(content);

//     return section;
// }

// export const jogoTela = dados.find(e => e.titulo === "Moving Out")

// document.body.appendChild(
//     criaDetalhesJogoHTML(
//         jogoTela.titulo,
//         jogoTela.descricao,
//         jogoTela.url_imagem
//     )
// )