import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entity/user.entity';

export const userEntityList: UserEntity[] = [
  {
    id: 1,
    birthAt: new Date('2000-01-02'),
    email: 'joao@email.com',
    name: 'João Jorge',
    password: '$2b$10$09wWoXNUKHPFjJzm1VIjY.ae9J1ecD8ie0y27VbBZHLaHBDpK7fVC',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    birthAt: new Date('2000-01-02'),
    email: 'pedro@email.com',
    name: 'Pedro Pedrinho',
    password: '$2b$10$09wWoXNUKHPFjJzm1VIjY.ae9J1ecD8ie0y27VbBZHLaHBDpK7fVC',
    role: Role.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    birthAt: new Date('2000-01-02'),
    email: 'privara@email.com',
    name: 'Priscila Vara',
    password: '$2b$10$09wWoXNUKHPFjJzm1VIjY.ae9J1ecD8ie0y27VbBZHLaHBDpK7fVC',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
