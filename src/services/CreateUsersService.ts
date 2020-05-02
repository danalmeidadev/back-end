import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../model/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUsersService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExiste = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExiste) {
      throw new Error('Email já cadastrado na base de dados');
    }
    const hashedPassword = await hash(password, 10);
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await usersRepository.save(user);
    return user;
  }
}

export default CreateUsersService;
