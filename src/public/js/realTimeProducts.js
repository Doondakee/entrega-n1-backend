document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const productsList = document.getElementById('productsList');
    const addProductForm = document.getElementById('addProductForm');

    // Escuchar eventos de productos
    socket.on('products', (products) => {
        productsList.innerHTML = products.map(product => `
            <div class="col-md-4 mb-4 product-card" data-id="${product.id}">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Precio: $${product.price}</p>
                        <p class="card-text">Stock: ${product.stock}</p>
                        <button class="btn btn-danger delete-btn" data-id="${product.id}">Eliminar</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Agregar event listeners a los botones de eliminar
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-id');
                socket.emit('deleteProduct', productId);
            });
        });
    });

    // Manejar envío del formulario
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(addProductForm);
        const productData = {
            title: formData.get('title'),
            description: formData.get('description'),
            code: formData.get('code'),
            price: parseFloat(formData.get('price')),
            stock: parseInt(formData.get('stock')),
            category: formData.get('category'),
            status: true
        };

        socket.emit('addProduct', productData);
        addProductForm.reset();
    });

    // Manejar errores
    socket.on('error', (error) => {
        alert(`Error: ${error}`);
    });
});