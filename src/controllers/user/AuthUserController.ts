import { Request, Response } from 'express';
import { AuthUSerService } from '../../services/user/AuthUserService';


class AuthUserController {
  async handle(req: Request, res: Response) {

    const { email, password } = req.body;

    const authUserService = new AuthUSerService();

    const auth = await authUserService.execute({ email, password })


    return res.json(auth)

  }
}

export { AuthUserController }