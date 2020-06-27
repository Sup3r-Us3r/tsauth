import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwtConfig';

interface ITokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  
  const token = authorization?.replace('Bearer', '').trim();

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const data = jwt.verify(token, jwtConfig.secret);

    if (data) {
      const { id } = data as ITokenPayload;

      req.userId = id;

      return next();
    }
  } catch {
    return res.sendStatus(401);
  }
}
