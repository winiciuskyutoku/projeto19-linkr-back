 import { signUpRepository, singInRepository } from "../repositories/user.repositories.js"


export async function signUp(req, res){
    try {
        await signUpRepository(req.body)

        res.status(201).send({message: "Conta criado com sucesso."})
    } catch (err){
       
        res.status(500).send(err.mesasge)
    }
}

export async function singIn(req, res) {
  try {
    const result = await singInRepository(req.body);

    if (!result) {
      res.status(400).send("email ou senha estão incorretos");
    }
    if (result.rowCount > 0) {
      console.log("RESULT", result);
      res.status(200).send(result.rows[0]);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
}
