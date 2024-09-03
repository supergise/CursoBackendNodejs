const socket = io();

if (document.getElementById('remove-product-form')) {
    document.getElementById('remove-product-form').addEventListener('submit', async e => {
        e.preventDefault();
        const code = document.getElementById('remove-product-code').value;

        await fetch(`/api/products/${code}`, {
            method: 'DELETE',
        });

        window.location.href = "/products";
    });
}

socket.on('updateProducts', products => {
    const productList = document.getElementById('products-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.title} - ${product.price} (Stock: ${product.stock}) [${product.category}] id: ${product._id}`;
        productList.appendChild(li);
    });
});

function addToCart(productId) {
    let cartId = localStorage.getItem('cartId');
   
    if (cartId) {
        updateCart(cartId, productId);
    } else {
        createCart().then(newCartId => {
            localStorage.setItem('cartId', newCartId);
            updateCart(newCartId, productId);
        }).catch(error => {
            console.error('Error creating cart:', error);
            alert('Hubo un problema al crear el carrito.');
        });
    }
}

function createCart() {
    return fetch('/api/carts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => data._id) 
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}

function updateCart(cartId, productId) {
    fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: 1 }) 
    })
    .then(response => response.json())
    .then(data => {
        alert('Producto añadido al carrito!');
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al añadir el producto al carrito.');
    });
}

function viewCart() {
    const cartId = localStorage.getItem('cartId');
   
    if (cartId) {
        window.open(`/carts/${cartId}`, '_blank');
    } else {
        alert('No hay carrito disponible. Primero añade un producto al carrito.');
    }
}
