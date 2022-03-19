import BaseController from "./Base.Controller";
import { urlCheckPackage } from "../../../app/packages";

class AuthController extends BaseController {
  createURLCheck = async (req, res, next) => {
    const data = await this.exec(
      next,
      urlCheckPackage.createURLCheck,
      req.body,
      req.userId
    );
    if (data) await this.okRes(req, res, data);
  };

  modifyURLCheck = async (req, res, next) => {
    const data = await this.exec(
      next,
      urlCheckPackage.modifyURLCheck,
      req.body,
      req.params.id,
      req.userId
    );
    if (data) return this.okRes(req, res, data);
  };

  getAllURLChecks = async (req, res, next) => {
    const data = await this.exec(
      next,
      urlCheckPackage.getAllURLChecks,
      req.userId
    );
    if (data) return this.okRes(req, res, data);
  };

  urlCheck = async (req, res, next) => {
    console.log(req.body);
    const data = await this.exec(
      next,
      urlCheckPackage.urlCheck,
      req.body,
      req.userId
    );
    if (data) await this.okRes(req, res, data);
  };

  getURLChecksByTag = async (req, res, next) => {
    console.log(req.body);
    const data = await this.exec(
      next,
      urlCheckPackage.getURLChecksByTag,
      req.params,
      req.userId
    );
    if (data) await this.okRes(req, res, data);
  };
}

export default new AuthController();
