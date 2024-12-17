const container = document.querySelector("#container");
const searchInput = document.querySelector("#pesquisa");
const searchButton = document.querySelector("#btn-pesquisar");

async function buscarFilmesPopulares() {
    try {
        const resposta = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=77c4e2b070a2e1396500d0b42ebf7cec&language=pt-BR");
        const dados = await resposta.json();
        exibirFilmes(dados.results);
    } catch (erro) {
        console.error("Erro ao buscar filmes populares:", erro);
    }
}

async function buscarFilmesPorNome(nome) {
    try {
        const resposta = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=77c4e2b070a2e1396500d0b42ebf7cec&query=${encodeURIComponent(nome)}&language=pt-BR`);
        const dados = await resposta.json();
        exibirFilmes(dados.results);
    } catch (erro) {
        console.error("Erro ao buscar filmes:", erro);
    }
}

function exibirFilmes(filmes) {
    container.innerHTML = ""; // Limpa o container
    if (filmes.length === 0) {
        container.innerHTML = "<p>Nenhum filme encontrado.</p>";
        return;
    }

    filmes.forEach(filme => {
        const card = document.createElement("div");
        card.className = "card";

        const imagem = document.createElement("img");
        imagem.src = filme.poster_path ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` : "https://via.placeholder.com/200x300";
        imagem.alt = `Poster do filme ${filme.title}`;
        imagem.className = "foto_perfil";

        const titulo = document.createElement("h2");
        titulo.textContent = filme.title;

        const descricao = document.createElement("p");
        descricao.textContent = filme.overview || "Descrição não disponível.";

        const nota = document.createElement("p");
        nota.textContent = `Nota: ${filme.vote_average}`;

        card.append(imagem, titulo, descricao, nota);
        container.appendChild(card);
    });
}

searchButton.addEventListener("click", () => {
    const termo = searchInput.value.trim();
    if (termo) {
        buscarFilmesPorNome(termo);
    } else {
        buscarFilmesPopulares();
    }
});

document.addEventListener("DOMContentLoaded", buscarFilmesPopulares);