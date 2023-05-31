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
        const result = singInRepository(req.body)
        if(!result || result === null) {
            return res.status(400).send("email ou senha estão incorretos")
        }
        console.log(result.rows[0])
        res.status(200).send(result.rows[0])

    }catch(err){
         res.status(500).send(err.mesasge)
    }



}