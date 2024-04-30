document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.nav-button');
    const itemForm = document.getElementById('item-form');
    const itemTableBody = document.getElementById('item-table-body');

    // Função para carregar itens do localStorage
    const loadItems = () => {
        const items = JSON.parse(localStorage.getItem('estoque')) || [];
        
        itemTableBody.innerHTML = ''; // Limpa a tabela
        
        items.forEach((item, index) => {
            const row = document.createElement('tr');
            
            const itemNameCell = document.createElement('td');
            itemNameCell.textContent = item.name;

            const itemQuantityCell = document.createElement('td');
            itemQuantityCell.textContent = item.quantity;

            const itemNivelCell = document.createElement('td');
            itemNivelCell.textContent = item.nivel;

            const actionsCell = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.className = 'button-action';
            editButton.onclick = () => editItem(index);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.className = 'button-action';
            deleteButton.onclick = () => deleteItem(index);

            actionsCell.appendChild(editButton);
            actionsCell.appendChild(deleteButton);

            row.appendChild(itemNameCell);
            row.appendChild(itemQuantityCell);
            row.appendChild(itemNivelCell);
            row.appendChild(actionsCell);

            itemTableBody.appendChild(row); // Adiciona a linha à tabela
        });
    };

    // Função para adicionar um item ao estoque
    itemForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const itemName = document.getElementById('item-name').value;
        const itemQuantity = parseInt(document.getElementById('item-quantity').value, 10);
        const itemNivel = document.getElementById('item-nivel').value;

        if (isNaN(itemQuantity) || itemQuantity <= 0) {
            alert('Quantidade inválida. Por favor, insira um valor positivo.');
            return;
        }

        const items = JSON.parse(localStorage.getItem('estoque')) || [];
        items.push({ name: itemName, quantity: itemQuantity, nivel: itemNivel});

        localStorage.setItem('estoque', JSON.stringify(items));

        itemForm.reset(); // Limpa o formulário
        loadItems(); // Carrega os itens do estoque ao iniciar a página
    });

    // Função para editar um item do estoque
    const editItem = (index) => {
        const items = JSON.parse(localStorage.getItem('estoque')) || [];

        const itemName = prompt('Novo nome do item:', items[index].name);
        const itemQuantity = parseInt(prompt('Nova quantidade:', items[index].quantity), 10);
        const itemNivel = prompt('Novo nível crítico:', items[index].nivel);

        if (itemName && !isNaN(itemQuantity, itemNivel)) {
            items[index].name = itemName;
            items[index].quantity = itemQuantity;
            items[index].nivel = itemNivel;

            localStorage.setItem('estoque', JSON.stringify(items));
            loadItems(); // Atualiza a tabela
        }
    };

    // Função para deletar um item do estoque
    const deleteItem = (index) => {
        const items = JSON.parse(localStorage.getItem('estoque')) || [];
        items.splice(index, 1); // Remove o item do array

        localStorage.setItem('estoque', JSON.stringify(items));

        loadItems(); // Atualiza a tabela
    };
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover a classe 'ativo' de todos os botões
            buttons.forEach(b => b.classList.remove('active'));

            // Adicionar a classe 'ativo' ao botão clicado
            button.classList.add('active');

            // Mostrar a seção correspondente ao botão clicado
            const targetId = button.getAttribute('data-target'); 
            const sections = document.querySelectorAll('.content-section');

            sections.forEach(section => {
                section.classList.add('hidden'); // Oculta todas as seções
                section.classList.remove('visible'); // Remove a visibilidade
            });

            const targetSection = document.querySelector(`#${targetId}`);
            if (targetSection) {
                targetSection.classList.add('visible'); // Torna visível a seção
                targetSection.classList.remove('hidden'); // Remove o estado oculto
            }
        });
    });
});