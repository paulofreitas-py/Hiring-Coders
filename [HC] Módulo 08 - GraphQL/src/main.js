import { creatServer} from 'http';
import { deflate } from 'zlib';

    const server = creatServer((request, response) =>{
        switch(request.url){
            case '/status': {
                response.writeHead(200,{
                    'content-Type': 'application/json'
                });
                response.write(
                    JSON.stringify({status:'Okay'})
                );
                response.end();
            }
        default;
        }
    default:
    })