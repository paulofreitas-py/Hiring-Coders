import File from '../models/File';

class FileController {
    async store( req, res ) {

        // desestruturando e mudando o nome dos campos (para corresponder as colunas da tabela files)
        const { originalname: name, filename: path } = req.file;

        const file = await File.create({
            name,
            path
        });

        return res.json(file);
    }

}

export default new FileController();