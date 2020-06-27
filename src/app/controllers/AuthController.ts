import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

import jwtConfig from '../../config/jwtConfig';

export default new class AuthController {
  async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);

    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not authorized.' });
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Password wrong.' });
    }

    const token = jwt.sign({ id: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    delete user.password;

    return res.json({
      user,
      token,
    });
  }
}
