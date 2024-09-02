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
