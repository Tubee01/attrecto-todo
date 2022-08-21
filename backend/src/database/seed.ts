import { CreateUserDTO } from 'src/endpoints/user/dtos/create-user.dto';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import configuration from 'src/config/configuration';
const config = configuration();
const userData: CreateUserDTO[] = [
  {
    name: 'John Doe',
    email: 'john.doe@test.com',
    password: 'secret',
    admin: true,
  },
  {
    name: 'Peregrin Took',
    email: 'peregrin.took@test.com',
    password: 'secret',
    admin: false,
  },
];
process.on('message', async () => {
  await main();
  process.send(0);
});
const main = async () => {
  const dbconfig = config.DATABASE_CONFIG;
  const pgClient = await new Pool(dbconfig).connect();
  //create user
  for (let i = 0; i < userData.length; i++) {
    const { name, email, password, admin } = userData[i];
    //if user with email exists, skip
    const user = await pgClient.query(`SELECT * FROM "User" WHERE email = $1`, [
      email,
    ]);
    if (user.rows.length > 0) {
      continue;
    }
    console.log('Creating user:', name);
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO "User" (name, email, password, admin) VALUES ($1, $2, $3 , $4) RETURNING *`;
    const values = [name, email, hashedPassword, admin];
    try {
      const { rows } = await pgClient.query(query, values);
      console.log(`Created user with id: ${rows[0].id}`);
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('Email already in use');
      }
      throw new Error(error.message);
    }
  }
};
