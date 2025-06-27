import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  body: {
    userId?: string;
    [key: string]: any;
  };
  headers: {
    token?: string;
    [key: string]: any;
  };
}

const authUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { token } = req.headers;

  if (!token) {
    res.json({ success: false, message: 'Not Authorized. Login Again' });
     return
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log("Token verification failed:", error);
    if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(400)
        .json({ success: false, message: "An unknown error occurred" });
    }
  }
};

export default authUser;
