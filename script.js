// Mostra uma mensagem no console para verificar se o JavaScript carregou corretamente
console.log("JS carregado");

// Array que armazenará os produtos adicionados ao carrinho
let carrinho = [];

// Variável que guarda o valor total da compra
let total = 0;

// Executa o código somente quando toda a página terminar de carregar
window.onload = function () {

    // Busca os elementos do HTML pelo ID
    const icone = document.getElementById("icone-carrinho");
    const popup = document.getElementById("carrinho-popup");
    const lista = document.getElementById("lista-carrinho");
    const contador = document.getElementById("contador-carrinho");
    const totalSpan = document.getElementById("total");

    // Verifica se todos os elementos existem no HTML
    // Se faltar algum, exibe erro e para o código
    if (!icone || !popup || !lista || !contador || !totalSpan) {
        console.log("ERRO: algum elemento do carrinho não foi encontrado no HTML");
        return;
    }

    // Quando clicar no ícone do carrinho
    icone.addEventListener("click", function () {

        // Se estiver aberto fecha, se estiver fechado abre
        popup.style.display =
            popup.style.display === "block" ? "none" : "block";
    });

    // Seleciona todos os botões com a classe btn-carrinho
    document.querySelectorAll(".btn-carrinho").forEach(function (btn) {

        // Adiciona evento de clique em cada botão
        btn.addEventListener("click", function () {

            // Procura a div mais próxima com a classe produto
            const produto = btn.closest(".produto");

            // Se não encontrar, exibe erro
            if (!produto) {
                console.log("ERRO: botão fora da div produto");
                return;
            }

            // Procura o nome do produto (h3)
            const nomeEl = produto.querySelector("h3");

            // Procura o preço do produto
            const precoEl = produto.querySelector(".preco");

            // Verifica se encontrou nome e preço
            if (!nomeEl || !precoEl) {
                console.log("ERRO: nome ou preço não encontrado");
                return;
            }

            // Obtém o texto do nome do produto
            const nome = nomeEl.innerText;

            // Obtém o valor do atributo data-preco
            const preco = Number(precoEl.dataset.preco);

            // Verifica se o preço é válido
            if (isNaN(preco)) {
                console.log("ERRO: preço inválido");
                return;
            }

            // Adiciona o produto ao array carrinho
            carrinho.push({
                nome,
                preco
            });

            // Soma o preço ao total da compra
            total += preco;

            // Atualiza as informações na tela
            atualizar();
        });
    });

    // Função responsável por atualizar o carrinho
    function atualizar() {

        // Limpa a lista antes de recriá-la
        lista.innerHTML = "";

        // Percorre todos os produtos do carrinho
        carrinho.forEach(item => {

            // Cria um elemento <li>
            const li = document.createElement("li");

            // Define o texto que será exibido
            li.innerText =
                `${item.nome} - R$ ${item.preco.toFixed(2)}`;

            // Adiciona o item na lista do carrinho
            lista.appendChild(li);
        });

        // Atualiza a quantidade de produtos
        contador.innerText = carrinho.length;

        // Atualiza o valor total
        totalSpan.innerText = total.toFixed(2);
    }

};