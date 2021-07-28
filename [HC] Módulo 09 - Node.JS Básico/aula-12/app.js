const http = require('http');
const url = require('url');
const queryString = require('query-string');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    let resposta;
    const urlparse = url.parse(req.url, true);

    // pegar a pergunta na url
    const params = queryString.parse(urlparse.search);

    if (urlparse.pathname == '/criar-atualizar-usuario') {
        // Criar um usuario/atualizar usuario (resolvido junto pq o txt esta sendo sobrescrito)
        // receber informacoes do usuario

        // salvar as informacoes
        fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
            if (err) throw err;
            resposta = 'Usuario criado/atualizado com sucesso';
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(resposta);
            console.log('saved!');
        });

    }
    else if (urlparse.pathname == '/selecionar-usuario') {
        // Selecionar usuario
        fs.readFile('users/' + params.id + '.txt', function (err, data) {
            // funcao de callback tem seus valors depois q sao executadas, entao nao garantem a ordem de execucao,
            // por isso a resposta do http dentro dela
            resposta = data;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(resposta);
        });
    }
    else if (urlparse.pathname == '/remover-usuario') {
        // Selecionar usuario
        fs.unlink('users/' + params.id + '.txt', function (err) {
            resposta = 'Usuario deletado com sucesso';
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            resposta = err ? 'Usuario nao encontrado' : 'Usuario deletado com sucesso';
            res.end(resposta);
        });
    }

    // Remover usuario


});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
