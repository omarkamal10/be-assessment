import BaseController from "./Base.Controller";
import { usersPackage } from "../../../app/packages";

class UserController extends BaseController {
  createUser = async (req, res, next) => {
    const data = await this.exec(next, usersPackage.createUser, req.body);
    if (data) await this.okRes(req, res, data);
  };

  verifyUser = async (req, res, next) => {
    const data = await this.exec(next, usersPackage.verifyUser, req.params);
    if (data) await this.okRes(req, res, data);
  };

  login = async (req, res, next) => {
    const data = await this.exec(next, usersPackage.login, req.body);
    if (data) await this.okRes(req, res, data);
  };
}

export default new UserController();
