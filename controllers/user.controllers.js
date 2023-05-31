 import { signUpRepository, singInRepository } from "../repositories/user.repositories.js"


export async function signUp(req, res){
    try {
        await signUpRepository(req.body)

        res.status(201).send({message: "Conta criado com sucesso."})
    } catch (err){
       
        res.status(500).send(err.mesasge)
    }
}

export async function singIn (req, res) {
    try{
        const result = await singInRepository(req.body)
        
        if(!result || result === null) {
            return res.status(400).send("email ou senha estão incorretos")
        }
        
        res.status(200).send({
          user_id: result.rows[0].user_id,
          username: result.rows[0].username,
          user_photo: result.rows[0].user_photo,
        });

    }catch(err){
        console.log ("erro no controller", err)
         res.status(500).send(err.mesasge)
    }

}