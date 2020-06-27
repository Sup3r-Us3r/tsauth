import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

export default new class UserController {
  async index(req: Request, res: Response) {
    const repository = getRepository(User);
    
    const users = await repository.find();

    if (!users) {
      return res.status(400).json({ error: 'Error on listing users.' });
    }

    return res.json({
      user: req.userId,
      users,
    });
  }

  async store(req: Request, res: Response) {
    const repository = getRepository(User);

    const { email, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return res.status(409).json({ error: 'Email already exists.' });
    }

    const user = repository.create(req.body);
    await repository.save(user);

    return res.json(user);
  }
}
