document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const items = document.querySelectorAll('.menu .item');
    const orderModal = document.getElementById('orderModal');
    const closeModal = document.querySelector('.modal .close');
    const orderForm = document.getElementById('orderForm');
    const orderSummary = document.getElementById('orderSummary');
    const addMoreButton = document.getElementById('addMore');
    const cancelOrderButton = document.getElementById('cancelOrder');
    const cartCountElement = document.getElementById('cart-count');
    const finalizeOrderButton = document.getElementById('finalizeOrder');
    const totalAmountElement = document.getElementById('totalAmount');

    const cart = [];

    // Limpa o carrinho e fecha o modal
    cancelOrderButton.addEventListener('click', () => {
        cart.length = 0;
        updateCart();
        orderModal.style.display = 'none';
    });

    // Esvazia o carrinho e fecha o modal ao finalizar o pedido
 finalizeOrderButton.addEventListener('click', () => {
    // Submete o pedido (aqui você pode adicionar lógica para enviar o pedido ao servidor)
    alert('Pedido enviado!');

    // Esvazia o carrinho
    cart.length = 0;
    updateCart();

    // Fecha o modal
    orderModal.style.display = 'none';
});


    // Exibe o modal do carrinho
    cartIcon.addEventListener('click', () => {
        showOrderSummary();
        orderModal.style.display = 'block';
    });

    // Fecha o modal do carrinho
    closeModal.addEventListener('click', () => {
        orderModal.style.display = 'none';
    });

    // Fecha o modal se clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target == orderModal) {
            orderModal.style.display = 'none';
        }
    });

    // Adiciona itens ao carrinho
    items.forEach(item => {
        const addButton = item.querySelector('.add-to-cart');
        const quantityInput = item.querySelector('input[name="quantity"]');

        addButton.addEventListener('click', () => {
            const name = item.dataset.name;
            const price = parseFloat(item.dataset.price);
            const quantity = parseInt(quantityInput.value, 10);

            const existingItem = cart.find(cartItem => cartItem.name === name);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ name, price, quantity });
            }

            updateCart();
            updateCartCount();
        });
    });

    // Submete o pedido
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Pedido enviado!');
        orderModal.style.display = 'none';
    });

    // Fecha o modal para adicionar mais itens
    addMoreButton.addEventListener('click', () => {
        orderModal.style.display = 'none';
    });

    // Atualiza o resumo do pedido e o total
    function updateCart() {
        const cartContent = cart.map((item, index) => `
            <p>
                ${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}
                <button class="increase-quantity" data-index="${index}">+</button>
                <button class="decrease-quantity" data-index="${index}">-</button>
                <button class="remove-item" data-index="${index}">Remover</button>
            </p>
        `).join('');

        const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        orderSummary.innerHTML = cartContent || '<p>Seu carrinho está vazio.</p>';
        totalAmountElement.textContent = `Total: R$ ${totalAmount.toFixed(2)}`;

        updateCartCount();
    }

    // Atualiza a quantidade total de itens no carrinho
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }

    // Exibe o resumo do pedido
    function showOrderSummary() {
        updateCart();
    }

    // Lida com eventos de clique para aumentar, diminuir ou remover itens
    orderSummary.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        if (event.target.classList.contains('increase-quantity')) {
            cart[index].quantity++;
        } else if (event.target.classList.contains('decrease-quantity')) {
            cart[index].quantity--;
            if (cart[index].quantity === 0) {
                cart.splice(index, 1);
            }
        } else if (event.target.classList.contains('remove-item')) {
            cart.splice(index, 1);
        }
        updateCart();
    });

    // Adiciona eventos para os controles de quantidade
    document.querySelectorAll('.quantity-decrement').forEach((button, index) => {
        button.addEventListener('click', () => {
            const quantityInput = document.querySelectorAll('.quantity-input')[index];
            let quantity = parseInt(quantityInput.value, 10);
            if (quantity > 1) {
                quantityInput.value = quantity - 1;
            }
        });
    });

    document.querySelectorAll('.quantity-increment').forEach((button, index) => {
        button.addEventListener('click', () => {
            const quantityInput = document.querySelectorAll('.quantity-input')[index];
            let quantity = parseInt(quantityInput.value, 10);
            quantityInput.value = quantity + 1;
        });
    });
});

 