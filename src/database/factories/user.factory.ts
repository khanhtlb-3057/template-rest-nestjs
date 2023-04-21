import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

import { User } from '../../entities/user.entity';
import { hash } from '../../shared/utils/bcypt.util';

export default setSeederFactory(User, async (faker: Faker) => {
  const user = new User();
  user.code = faker.random.alphaNumeric(5);
  user.username = faker.internet.userName();
  user.email = faker.internet.email();
  user.password = await hash(faker.internet.password());
  return user;
});
