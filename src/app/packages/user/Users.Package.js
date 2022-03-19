import { Protocols } from "../../helpers";
import bcrypt from "bcryptjs";
import Database from "../../../infrastructure/Database";
import { sendMailVerification } from "../../services/Mail.Service";
import jwt from "jsonwebtoken";
import Config from "../../../../config";
import crypto from "crypto";
import locales from "../../locales";
import { Op } from "sequelize";

// *==========================================================================
// *                                Auth
// *==========================================================================
export const login = async ({ email = null, userName = null, password }) => {
  try {
    const user = await Database.Users.findOne({
      where: {
        [Op.or]: [{ email }, { userName }],
      },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return Protocols.appResponse({ err: locales.WRONG_CREDENTIALS });
    } else {
      delete user.dataValues.password;
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        Config.JwtSecret,
        {
          expiresIn: Config.JwtLifeTime,
        }
      );

      return Protocols.appResponse({ data: { user, token } });
    }
  } catch (err) {
    return Protocols.appResponse({ err });
  }
};

// *==========================================================================
// *                                Users
// *==========================================================================

export const checkVerification = async (userId) => {
  try {
    const user = await Database.Users.findOne({
      where: {
        id: userId,
      },
    });
    if (!user.verified) {
      return false;
    }
    return true;
  } catch (err) {
    return Protocols.appResponse({ err: locales.USER_404 });
  }
};

export const createUser = async (args) => {
  args.password = bcrypt.hashSync(args.password, 10);

  try {
    const user = await Database.Users.create({
      ...args,
    });

    delete user.dataValues.password;

    const token = await Database.Tokens.create({
      userId: user.id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    const message = `${process.env.BASE_URL}/users/verify/${user.id}/${token.token}`;
    sendMailVerification(
      "Account Creation",
      user.email,
      `${user.firstName} ${user.middleName ? user.middleName : ""} ${
        user.lastName
      }`,
      `Please verify your account using the following link: ${message}`,
      token
    );

    return Protocols.appResponse({ data: { user, token } });
  } catch (err) {
    return Protocols.appResponse({ err });
  }
};

export const verifyUser = async ({ id: userId, token: verificationToken }) => {
  try {
    const user = await Database.Users.findByPk(userId);
    const token = await Database.Tokens.findOne({
      where: {
        userId: user.id,
        token: verificationToken,
      },
    });
    if (!token) return Protocols.appResponse({ err: locales.TOKEN_ERROR });

    user.verified = true;
    user.save();

    return Protocols.appResponse({ data: locales.EMAIL_VERIFIED });
  } catch (err) {
    return Protocols.appResponse({ err });
  }
};
