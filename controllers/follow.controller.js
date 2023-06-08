import { followDB } from "../repositories/follow.repository.js";

export async function follow(req, res) {
    const { follow } = res.locals;
    const { id } = req.params;
    const { user_id } = res.locals.session;

    try {
        await followDB(follow.rowCount, id, user_id);

        res.send("Sucesso");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function follower(req, res) {
    const { follow } = res.locals;

    if (follow.rowCount) {
        return res.send(true);
    }

    res.send(false);
}