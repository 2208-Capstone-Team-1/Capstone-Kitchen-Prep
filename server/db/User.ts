import db from "./db";
import Sequelize from "sequelize";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

interface ResponseError extends Error {
  status?: number;
}

const { STRING, UUID, UUIDV4 } = Sequelize;
const JWT = process.env.JWT;

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: CreationOptional<number>;
  username: string;
  password: string;
  email: CreationOptional<string>;
}

const User = db.define<UserModel>("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
  },
});

User.addHook("beforeSave", async (user: UserModel) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(User as any).findByToken = async function (token: string) {
  try {
    const { id } = jwt.verify(token, process.env.JWT as Secret) as JwtPayload;
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw "user not found";
  } catch (ex) {
    const error = new Error("bad credentials") as ResponseError;
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT as Secret);
};

interface AuthUser {
  username: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(User as any).authenticate = async function ({ username, password }: AuthUser) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT as Secret);
  }
  const error = new Error("bad credentials") as ResponseError;
  error.status = 401;
  throw error;
};

export default User;
