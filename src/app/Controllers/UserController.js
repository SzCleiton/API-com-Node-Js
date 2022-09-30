const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const yup = require('yup');

class UserController {
    show(req, res) {
        var users = ["Cleiton", "Larissa", "Danver"]
        return res.status(200).json({
            error: false,
            users
        })
    }

    async store(req, res) {

        /**
         * Validação através do YUP schema
         * Início
        */
        let schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required()
        });

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                message: "Dados inválidos"
            })
        }

        /**
         * Validação através do YUP schema
         * Fim
        */

        /**
         * Validação no banco de dados
         * Verifica se o usuário existe
        */

        let userExist = await User.findOne({ email: req.body.email })
        if(userExist) {
            return res.status(400).json({
                error: true,
                message: "Este usuário já existe!"
            })
        }

        /**
         * Destruturação dos dados da requisição
        */
        
        const { name , email, password} = req.body;

        /**
         * Criação da constante data
        */

        const data = { name, email, password }

        /**
         * Criptografar a senha
        */

        data.password = await bcrypt.hash(data.password, 8);

        /**
         * Inserção no banco de dados
        */

        await User.create(data, (err) => {
            if(err) return res.status(400).json({
                error: true,
                message: "Erro ao tentar inserir usuário no MongoDB"
            })

            return res.status(200).json({
                error: false,
                message: "Usuário cadastrado com sucesso"
            })
        })
    }
}

module.exports = new UserController();