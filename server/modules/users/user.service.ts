import { compare, hash } from 'bcryptjs'
import { getRepository } from 'typeorm'
import { ISignIn, ISignUp } from 'interfaces/authUser.interface'
import { User } from './user.entity'

export const signUpService = async ({
  name,
  email,
  password
}: ISignUp): Promise<User> => {
  const userRepository = getRepository(User)

  const isAlreadyExistingUser = await userRepository.findOne({
    where: {
      email
    }
  })

  if (isAlreadyExistingUser) {
    throw new Error('User already exists')
  }

  const hashedPassword = await hash(password, 12)

  const createdUser = userRepository.create({
    name,
    email,
    password: hashedPassword
  })

  const user = await userRepository.save(createdUser)

  delete user.password

  return user
}

export const signInService = async ({
  email,
  password
}: ISignIn): Promise<User> => {
  const userRepository = getRepository(User)

  const user = await userRepository.findOne({
    where: {
      email
    }
  })

  if (!user) {
    throw new Error('Invalid credentials')
  }

  const isPasswordValid = await compare(password, user.password)

  if (!isPasswordValid) {
    throw new Error('Invalid credentials')
  }

  delete user.password

  return user
}
