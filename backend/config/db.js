import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv';

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
console.log({ PGHOST, PGDATABASE, PGUSER, PGPASSWORD })
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`
);

// export async function getPgVersion() {
//   try {
//     const result = await sql`SELECT version()`;
//     console.log(result[0]);
//   } catch (error) {
//     console.log('error', error.message)
//   }
// }

