import { signUpRepository, singInRepository, getUsersDB, getUserByIdDB, getByEmail, getUsersOrderDB } from "../repositories/user.repositories.js"
import authService from "../services/authService.js";
import sessionService from "../services/sessionService.js";

export async function signUp(req, res) {
    try {
        const result = await signUpRepository(req.body)
        if (!result) {
            res.status(400).send("error in sign up request")
        }
        res.status(201).send({ message: "Conta criada com sucesso." })
    } catch (err) {
        console.log("erro", err)
        res.status(500).send(err.mesasge)
    }
}


export async function singIn(req, res) {
    try {
        const result = await singInRepository(req.body)

        if (!result || result === null) {
            return res.status(400).send("email ou senha estão incorretos")
        }

        const token = authService.generateWebToken(result.rows[0].user_id)

        sessionService.insertTokenInDatabase(token, result.rows[0].user_id)
        res.status(200).send({
            user_id: result.rows[0].user_id,
            username: result.rows[0].username,
            user_photo: result.rows[0].user_photo,
            user_token: token
        });


    } catch (err) {
        console.log(err.message)
        res.status(500).send(err.mesasge)
    }

}

export async function getUsers(req, res) {
    const { search } = req.body;
    const user = parseInt(req.query.user);
    try {
        const allUsers = await getUsersDB(search);
        if (user > 0) {
            const allUsersId = allUsers.rows.map((u) => u.user_id);
            const followingUsers = await getUsersOrderDB(allUsersId, user);
            const allUsersFormated = [];

            for (let i = allUsers.rows.length - 1; i >= 0; i--) {
                const currentUser = allUsers.rows[i];
                let isFollowing = false;

                for (let j = 0; j < followingUsers.rows.length; j++) {
                    const followingUser = followingUsers.rows[j];

                    if (currentUser.user_id === followingUser.followed_id) {
                        isFollowing = true;
                        break;
                    }
                }

                if (isFollowing) {
                    allUsersFormated.unshift({ ...currentUser, following: isFollowing });
                } else {
                    allUsersFormated.push({ ...currentUser, following: isFollowing });
                }
            }
            return res.send(allUsersFormated);
        }
        res.send(allUsers.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getProfile(req, res) {
    const { id } = req.params;
    try {
        const userProfile = await getUserByIdDB(id);
        res.send(userProfile);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getUserByEmail(req, res) {
    const { email } = req.params;
    try {
        const result = await getByEmail(email);
        if (result && result.rowCount > 0) {
            res.send(result.rows[0]);
        } else {
            res.status(200).send({ message: "email não encontrado" })
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}