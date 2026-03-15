import bcrypt from "bcryptjs";
import { db } from ".";
import { users } from "./schema";

function createSeedPasswordHash(password: string) {
  return bcrypt.hashSync(password, 12);
}

const userSeeds = [
  "adam",
  "bob",
  "charlie",
  "dave",
] 

for (const name of userSeeds) {

db.insert(users)
  .values({
    passwordHash: createSeedPasswordHash(`${name}Supert`),
    email: `${name}@example.com`,
  }).run();
}