// script.js

// Lista de pizzas disponíveis
const pizzas = [
    { sabor: 'Calabresa', categoria: 'salgada', valorMedia: 25.00, valorGrande: 35.00 },
    { sabor: 'Margherita', categoria: 'salgada', valorMedia: 30.00, valorGrande: 40.00 },
    { sabor: 'Frango com Catupiry', categoria: 'salgada', valorMedia: 40.00, valorGrande: 50.00 },
    { sabor: 'Portuguesa', categoria: 'salgada', valorMedia: 42.00, valorGrande: 52.00 },
    { sabor: 'Quatro Queijos', categoria: 'salgada', valorMedia: 35.00, valorGrande: 45.00 },
    { sabor: 'Pepperoni', categoria: 'salgada', valorMedia: 38.00, valorGrande: 48.00 },
    { sabor: 'Atum', categoria: 'salgada', valorMedia: 36.00, valorGrande: 46.00 },
    { sabor: 'Palmito', categoria: 'salgada', valorMedia: 34.00, valorGrande: 44.00 },
    { sabor: 'Rúcula', categoria: 'salgada', valorMedia: 45.00, valorGrande: 55.00 },
    { sabor: 'Escarola', categoria: 'salgada', valorMedia: 40.00, valorGrande: 50.00 },
    { sabor: 'Chocolate', categoria: 'doce', valorMedia: 44.00, valorGrande: 54.00 },
    { sabor: 'Banana com canela', categoria: 'doce', valorMedia: 36.00, valorGrande: 46.00 },
    { sabor: 'Morango com Chocolate', categoria: 'doce', valorMedia: 45.00, valorGrande: 55.00 },
    { sabor: 'Nutella com Morango', categoria: 'doce', valorMedia: 50.00, valorGrande: 60.00 },
    { sabor: 'Doce de Leite', categoria: 'doce', valorMedia: 42.00, valorGrande: 52.00 },
    { sabor: 'Abacaxi com canela', categoria: 'doce', valorMedia: 38.00, valorGrande: 48.00 },
    { sabor: 'Prestígio', categoria: 'doce', valorMedia: 40.00, valorGrande: 50.00 },
    { sabor: 'Banana', categoria: 'doce', valorMedia: 35.00, valorGrande: 45.00 }
];

// Lista de bebidas disponíveis
const bebidas = [
    { nome: 'Refrigerante Lata', preco: 5.00 },
    { nome: 'Refrigerante 2L', preco: 10.00 },
    { nome: 'Suco de Laranja', preco: 6.00 },
    { nome: 'Suco de Limão', preco: 6.00 },
    { nome: 'Suco de Uva', preco: 7.00 },
    { nome: 'Água Mineral', preco: 3.00 },
    { nome: 'Cerveja Lata', preco: 8.00 }
];

// Lista de sobremesas disponíveis
const sobremesas = [
    { nome: 'Brownie', preco: 10.00 },
    { nome: 'Petit Gateau', preco: 12.00 },
    { nome: 'Torta de Limão', preco: 8.00 },
    { nome: 'Torta de Morango', preco: 10.00 },
    { nome: 'Salgada de Fruta', preco: 8.00 },
    { nome: 'Gelato', preco: 10.00 }
];

// Lista de itens do pedido
let pedido = [];

// Atualiza os sabores disponíveis com base na categoria selecionada
function atualizarSabores() {
    const categoria = document.getElementById('categoriaPizza').value;
    const sabor1 = document.getElementById('sabor1');
    const sabor2 = document.getElementById('sabor2');
    const sabor2Label = document.getElementById('sabor2Label');

    // Limpa as opções atuais
    sabor1.innerHTML = '';
    sabor2.innerHTML = '';

    // Filtra os sabores pela categoria
    const saboresFiltrados = pizzas.filter(pizza => pizza.categoria === categoria);

    // Adiciona as opções aos selects
    saboresFiltrados.forEach(pizza => {
        const option1 = document.createElement('option');
        option1.value = pizza.sabor;
        option1.text = pizza.sabor;
        sabor1.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = pizza.sabor;
        option2.text = pizza.sabor;
        sabor2.appendChild(option2);
    });

    // Atualiza a visibilidade do segundo sabor
    atualizarTipoPizza();
}

// Atualiza a visibilidade do segundo sabor com base no tipo de pizza
function atualizarTipoPizza() {
    const tipo = document.getElementById('tipoPizza').value;
    const sabor2 = document.getElementById('sabor2');
    const sabor2Label = document.getElementById('sabor2Label');

    if (tipo === 'meio') {
        sabor2.style.display = 'inline';
        sabor2Label.style.display = 'inline';
    } else {
        sabor2.style.display = 'none';
        sabor2Label.style.display = 'none';
    }
}

// Adiciona uma pizza personalizada ao pedido
function adicionarItem() {
    const categoria = document.getElementById('categoriaPizza').value;
    const tipo = document.getElementById('tipoPizza').value;
    const sabor1 = document.getElementById('sabor1').value;
    const sabor2 = document.getElementById('sabor2').value;
    const tamanho = document.getElementById('tamanhoPizza').value;

    let preco = 0;
    let descricao = '';

    if (tipo === 'inteira') {
        const pizza = pizzas.find(p => p.sabor === sabor1 && p.categoria === categoria);
        preco = tamanho === 'Média' ? pizza.valorMedia : pizza.valorGrande;
        descricao = `Pizza ${sabor1} (${tamanho})`;
    } else {
        const pizza1 = pizzas.find(p => p.sabor === sabor1 && p.categoria === categoria);
        const pizza2 = pizzas.find(p => p.sabor === sabor2 && p.categoria === categoria);
        const preco1 = tamanho === 'Média' ? pizza1.valorMedia : pizza1.valorGrande;
        const preco2 = tamanho === 'Média' ? pizza2.valorMedia : pizza2.valorGrande;
        preco = (preco1 + preco2) / 2;
        descricao = `Pizza Meio a Meio: ${sabor1} e ${sabor2} (${tamanho})`;
    }

    pedido.push({ descricao, preco });
    atualizarListaPedido();
}

// Adiciona uma bebida ou sobremesa ao pedido
function adicionarItemPedido(nome, preco) {
    pedido.push({ descricao: nome, preco });
    atualizarListaPedido();
}

// Atualiza a lista de itens do pedido na interface
function atualizarListaPedido() {
    const lista = document.getElementById('listaPedido');
    lista.innerHTML = '';

    let total = 0;

    pedido.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.descricao} - R$ ${item.preco.toFixed(2)} `;

        const btnRemover = document.createElement('button');
        btnRemover.textContent = '❌';
        btnRemover.style.marginLeft = '10px';
        btnRemover.onclick = () => removerItem(index);

        li.appendChild(btnRemover);
        lista.appendChild(li);

        total += item.preco;
    });

    // Atualiza o total no HTML
    const totalPedido = document.getElementById('totalPedido');
    totalPedido.innerHTML = `<strong>Total:</strong> R$ ${total.toFixed(2)}`;
}
function removerItem(index) {
    pedido.splice(index, 1);
    atualizarListaPedido();
}


// Finaliza o pedido e exibe o resumo
function finalizarPedido() {
  if (pedido.length === 0) {
    alert("Seu pedido está vazio!");
    return;
  }

  alert("Pedido finalizado com sucesso!");

  // Limpa o pedido
  pedido = [];

  // Limpa a interface
  const listaPedido = document.getElementById("itens-pedido");
  listaPedido.innerHTML = "";

  // Atualiza o total
  atualizarTotalPedido();
}

// Limpa o pedido atual
function limparPedido() {
    pedido = [];
    atualizarListaPedido();
}

// Inicializa os selects ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarSabores();
});
document.getElementById('finalizarPedido').addEventListener('click', () => {
    if (pedido.length === 0) {
        alert('Seu pedido está vazio!');
        return;
    }

    atualizarListaPedido();

    // Simula finalização
    alert('Pedido finalizado! Obrigado pela preferência.');

    // Limpa o pedido
    pedido.length = 0;

    // Atualiza interface
    atualizarListaPedido();
});





// Modo escuro está no botão inline no HTML (já funcional)















