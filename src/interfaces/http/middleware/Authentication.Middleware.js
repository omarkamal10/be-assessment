import jwt from "jsonwebtoken";
import config from "../../../../config";
import locales from "../../../app/locales";
import { usersPackage } from "../../../app/packages";
import Errors from "../../errors";

export default () => {
  return (req, _, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return next(Errors.http.unauthorized(locales.NO_TOKEN));

    jwt.verify(token, config.JwtSecret, async (err, decoded) => {
      if (err) return next(Errors.http.unauthorized(locales.UNAUTHORIZED));

      const isVerified = await usersPackage.checkVerification(decoded.userId);
      if (!isVerified) return next(Errors.http.forbidden(locales.FORBIDDEN));

      req.userId = decoded.userId;
      req.email = decoded.email;
      next();
    });
  };
};
