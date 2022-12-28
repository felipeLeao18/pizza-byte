import dotenv from 'dotenv';
dotenv.config();

export const config = {
  JWT_SECRET: process.env.JWT_SECRET ?? '5ce5ecba-608a-4561-932a-05e25b86f672',
};
