import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "om singh",
    email: "omsingh@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Renu Singh",
    email: "renu@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
