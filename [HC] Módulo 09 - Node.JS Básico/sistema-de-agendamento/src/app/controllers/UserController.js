import * as Yup from 'yup';
import User from '../models/User';
import Database from '../../database';
// o importe do index dentro de database nao aparece na aula, mas foi necessario colocar

class UserController {

    async store(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });

        if ( !(await schema.isValid(req.body))){
            return res.status(400).json({
                message: "Falha na validação"
            });
        }

        const userExists = await User.findOne({
            where: { email: req.body.email }
        });

        if (userExists) {
            return res.status(400).json({
                error: 'Usuário já cadastrado'
            });
        }

        // desestruturando para nao retornar a senha ao inves de colocar em uma variavel e retornar toda ela
        const { id, name, email, provider } = await User.create(req.body);

        return res.json({
            id,
            name,
            email,
            provider
        });
    }

    async update(req, res) {

        // arrow function somente com a seta sem as chaves indica que tem um return implicito "return oldPassword ? field.required() : field"
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6).when(
                'oldPassword', (oldPassword, field) => 
                    oldPassword ? field.required() : field
            ),
            confirmPassword: Yup.string().when( 'password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
                )
        });

        if ( !(await schema.isValid(req.body))){
            return res.status(400).json({
                message: "Falha na validação"
            });
        }
        
        const { email, oldPassword, password } = req.body;

        const user = await User.findByPk(req.userId);

        if ( email && email != user.email) {
            const userExists = await User.findOne({
                where: { email }
            });

            if (userExists) {
                return res.status(400).json({
                    error: 'Email já utilizado para outro registro'
                });
            }
        }

        if( oldPassword && password && oldPassword != password && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({
                message: 'Senha não confere'
            });
        }

        const { id, name, provider } = await user.update(req.body);

        return res.json({ 
            id,
            name,
            email,
            provider
         });

    }
}

export default new UserController();