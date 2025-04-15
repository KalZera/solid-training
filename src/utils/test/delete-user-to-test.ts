import { prisma } from 'lib/prisma'

export async function deleteUsers () {
  await prisma.user.deleteMany({
    where: {
      email: 'Johndoe@example.com',
    }
  })
}
