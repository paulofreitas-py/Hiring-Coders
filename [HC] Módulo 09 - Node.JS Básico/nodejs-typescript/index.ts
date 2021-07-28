import { parse } from 'query-string';
import * as url from 'url'
import { writeFile } from 'fs';
import { createServer, ServerResponse, IncomingMessage } from 'http';

const port = 5000;

const server = createServer((request: IncomingMessage, response: ServerResponse) => {

    const urlparse = url.parse(request.url ? request.url : '', true);
    const params = parse(urlparse.search ? urlparse.search : '');

    let resposta;

    if (urlparse.pathname == '/criar-atualizar-usuario') {
        // Criar um usuario/atualizar usuario (resolvido junto pq o txt esta sendo sobrescrito)
        // receber informacoes do usuario

        // salvar as informacoes
        writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
            if (err) throw err;
            resposta = 'Usuario criado/atualizado com sucesso';
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/plain');
            response.end(resposta);
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
});

// Execucao
server.listen(port, "127.0.0.1", () => {
    console.log(`Server running on port ${port}`);
});
