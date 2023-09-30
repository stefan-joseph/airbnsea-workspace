import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { User } from "../../../entity/User";

export const UserFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.email = faker.internet.email().toLowerCase();
  user.password = "secret";
  user.confirmed = true;
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.avatar = faker.internet.avatar();

  return user;
});
