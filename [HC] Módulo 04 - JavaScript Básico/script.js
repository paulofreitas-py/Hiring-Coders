const listContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');

let lists = [];

newListForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const listName = newListInput.value;
    if (listName === null || listName === '') return;

    const list = createList(listName);
    newListInput.value = null;

    lists.push(list);

    render();

});

function createList(name) {
    return { id: Date.now().toString(), name: name };
}

function render() {
    clearElement(listContainer)
    lists.forEach(function(list){
        const item = document.createElement('li')
        item.classList.add('item');
        item.innerText = list.name;
        listContainer.appendChild(item);
    })
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}





let result = fizBuzz(15);

console.log(result);

function fizBuzz(entrada) {
    let retorno = "";
    if (typeof entrada !== "number") {
        retorno = "Não é um número";
    } else {
        if (entrada % 3 === 0) {
            retorno += "Fizz";
        }

        if (entrada % 5 === 0) {
            retorno += "Buzz";
        }
    }

    if (retorno != "") {
        return retorno;
    } else {
        return entrada;
    }

}

let resultado = reverseAString("Hello Gama Academy");
console.log(resultado);


function reverseAString(str) {
    let retorno = "";
    for (i=str.length-1;i>=0;i--) {
        retorno += str[i];
    }
    return retorno;
}

let conv = convertToFahrenheit(40);
console.log(`o valor em Fahrenheit é ${conv}`);


function convertToFahrenheit(value) {
    return value * 1.8 + 32;
}