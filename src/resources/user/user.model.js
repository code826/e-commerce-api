import { getDatabase } from "../../config/mongodb.js";

let collectionName = "users";
export default class UserModel {
  constructor(_id, _name, _email, _password) {
    this.id = _id;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.role = "customer";
  }
  static async createUser(obj) {
    const user = new UserModel(
      users.length + 1,
      obj.name,
      obj.email,
      obj.password
    );
    //db.users.insertOne({})
    //users.push(user);
    let db = getDatabase();
    console.log("user", user);
    let resp = await db.collection(collectionName).insertOne(user);
    return resp;
  }
  updateRoleToAdmin() {
    this.role = "admin";
    return this;
  }
  getName() {
    return this.name;
  }

  static getAllUsers() {
    return users;
  }

  static getUserFromEmail(email) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email == email) {
        return users[i];
      }
    }
    return null;
  }
  static userSignIn(email, password) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
        return users[i];
      }
    }
    return null;
  }
}

const users = [
  new UserModel(1, "dummy", "dummy@gmail.com", "dummy123", "customer"),
];
