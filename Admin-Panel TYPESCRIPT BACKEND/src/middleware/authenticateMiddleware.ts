import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';


const verifyToken = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, 'My@secret@key##', (err: VerifyErrors | null, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: 'Token verification failed', error: err.message });
      }

      // Check if the user has the required role (e.g., 'admin')
      if (decoded && decoded.name === 'admin') {
        (req as any).user = decoded;
        next();
      } else {
        return res.status(403).json({ message: 'Insufficient privileges' });
      }
    });
  };
};

export default verifyToken;
