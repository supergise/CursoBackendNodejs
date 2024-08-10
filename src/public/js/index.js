const socket = io();

document.getElementById('add-product-form').addEventListener('submit', async e => {
    e.preventDefault();
    const title = document.getElementById('product-title').value;
    const description = document.getElementById('product-description').value;
    const code = document.getElementById('product-code').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);
    const category = document.getElementById('product-category').value;

    const product = { title, description, code, price, stock, category };

    await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    // Limpiar campos
    document.getElementById('product-title').value = '';
    document.getElementById('product-description').value = '';
    document.getElementById('product-code').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-stock').value = '';
    document.getElementById('product-category').value = '';
});

document.getElementById('remove-product-form').addEventListener('submit', async e => {
    e.preventDefault();
    const code = document.getElementById('remove-product-code').value;

    await fetch(`/api/products/${code}`, {
        method: 'DELETE',
    });

    // Limpiar campo
    document.getElementById('remove-product-code').value = '';
});

socket.on('updateProducts', products => {
    const productList = document.getElementById('products-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.title} - ${product.price} (Stock: ${product.stock}) [${product.category}] id: ${product.id}`;
        productList.appendChild(li);
    });
});
