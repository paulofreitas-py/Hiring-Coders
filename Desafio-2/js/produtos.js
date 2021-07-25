'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active');

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
}

const getLocalStorage = () => JSON.parse(localStorage.getItem("db_product")) ?? [];
const setLocalStorage = (dbProduct) => localStorage.setItem("db_product", JSON.stringify(dbProduct));

// CRUD - Create read update delete
const deleteProduct = (index) => {
    const dbProduct = readProduct();
    dbProduct.splice(index, 1);
    setLocalStorage(dbProduct);
}

const updateProduct = (index, product) => {
    const dbProduct = readProduct();
    dbProduct[index] = product;
    setLocalStorage(dbProduct);
}

const readProduct = () => getLocalStorage();

const createProduct = (product) => {
    const dbProduct = getLocalStorage();
    dbProduct.push(product);
    setLocalStorage(dbProduct);    
};

const isValidFields = () => {
    return document.getElementById('form').reportValidity();
}

const CancelProduct = () => {
    closeModal();
}

// Interação com o layout
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = "");
}

const saveProduct = () => {
    if (isValidFields()) {
        const product = {
            codigo: document.getElementById('codigo').value,
            produto: document.getElementById('produto').value,
            quantidade: document.getElementById('quantidade').value,
            loja: document.getElementById('loja').value
        }
        const index = document.getElementById('codigo').dataset.index;
        if(index == 'new') {
            createProduct(product);
            updateTable();
            closeModal();
        } else {
            updateProduct(index, product);
            updateTable();
            closeModal();
        }
        
    }
}

const createRow = (product, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${product.codigo}</td>
        <td>${product.produto}</td>
        <td>${product.quantidade}</td>
        <td>${product.loja}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `
    document.querySelector('#tableProduct>tbody').appendChild(newRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableProduct>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const updateTable = () => {
    const dbProduct = readProduct();
    clearTable();
    dbProduct.forEach(createRow);
}

const fillFields = (product) => {
    document.getElementById('codigo').value = product.codigo;
    document.getElementById('produto').value = product.produto;
    document.getElementById('quantidade').value = product.quantidade;
    document.getElementById('loja').value = product.loja;
    document.getElementById('codigo').dataset.index = product.index;
}

const editProduct = (index) => {
    const product = readProduct()[index];
    product.index = index;
    fillFields(product);
    openModal();
}

const editDelete = (event) => {
    if(event.target.type == 'button') {
        const [action, index] = event.target.id.split('-');

        if(action == 'edit') {
            editProduct(index);
        }else {
            const product = readProduct()[index];
            const response = confirm(`Deseja realmente excluir o produto ${product.codigo}`);
            if(response) {
                deleteProduct(index);
                updateTable();
            }
        }
    }
}


updateTable();


// Eventos
document.getElementById('cadastrarProduto')
    .addEventListener('click', openModal);

document.getElementById('modalClose')
    .addEventListener('click', closeModal);

document.getElementById('salvar')
    .addEventListener('click', saveProduct);

document.getElementById('cancelar')
    .addEventListener('click', closeModal);    

document.querySelector('#tableProduct>tbody')
    .addEventListener('click', editDelete);

    //Hiring Coders :)