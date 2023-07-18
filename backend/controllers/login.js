import bcrypt from 'bcrypt'

import { findOneByEmail } from '../models/user.model.js'

export const login = async (req, res) => {
    const { email, password } = req.body

    let user = await findOneByEmail(email)
    console.log('user', user);

    if (user.length < 1) {
        return res.status(403).json({ errorMessage: 'Wrong credentials' })
    }
}

