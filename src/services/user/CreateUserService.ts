import prismaClient from '../../prisma';
import { hash } from 'bcryptjs'


interface UserRequest {
  name: string
  email: string
  password: string
}

class CreateUsersService {
  async execute({ email, name, password }: UserRequest) {

    if (!email) {
      throw new Error("Email incorrect")
    }

    const userAlredyExists = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if (userAlredyExists) {
      throw new Error('User already exists')
    }

    const passwordHash = await hash(password, 8);



    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,

      },
      select: {
        id: true,
        email: true,
        name: true,
      }
    })


    return user;
  }
};

export { CreateUsersService };