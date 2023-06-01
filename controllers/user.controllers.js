 import { signUpRepository, singInRepository } from "../repositories/user.repositories.js"
 import authService from "../services/authService.js";

export async function signUp(req, res){
    try {
        await signUpRepository(req.body)

        res.status(201).send({ message: "Conta criado com sucesso." })
    } catch (err) {

        res.status(500).send(err.mesasge)
    }
}


export async function singIn(req, res) {
    try {
        const result = azwait singInRepository(req.body)

        if (!result || result === null) {
            return res.status(400).send("email ou senha estão incorretos")
        }
<<<<<<< HEAD


        res.status(200).send({
            user_id: result.rows[0].user_id,
            username: result.rows[0].username,
            user_photo: result.rows[0].user_photo,
        });


    } catch (err) {

        res.status(500).send(err.message)
=======
        
          const token = authService.generateWebToken(result.rows[0].user_id)
          res.status(200).send({
            user_id: result.rows[0].user_id,
            username: result.rows[0].username,
            user_photo: result.rows[0].user_photo,
            user_token: token
          });
         

    }catch(err){
         console.log(err.message)
         res.status(500).send(err.mesasge)
>>>>>>> 017c2fc (feat: login token)
    }

}

export async function getUsers(req, res) {
    const { search } = req.body;
    try {
        const allUsers = await getUsersDB(search);
        res.send(allUsers.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

