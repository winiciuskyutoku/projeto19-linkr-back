import { signUpRepository } from "../repositories/user.repositories.js"

export async function signUp(req, res){
    try {
        await signUpRepository(req.body)

        res.status(201).send({message: "Conta criado com sucesso."})
    } catch (err){
        res.status(500).send(err.mesasge)
    }
}