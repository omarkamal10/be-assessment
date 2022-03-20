import { Protocols, updateReport } from "../../helpers";
import Database from "../../../infrastructure/Database";
import { sendMailDownURL, sendMailUpURL } from "../../services/Mail.Service";
import axios from "axios";

export const createURLCheck = async (args, userId) => {
  try {
    const url = await Database.URLs.create({
      userId,
      ...args,
    });
    const urlCheckInstance = await Database.UserURLChecks.create({
      urlId: url.id,
    });
    return Protocols.appResponse({ data: url });
  } catch (err) {
    return Protocols.appResponse({ err });
  }
};

export const modifyURLCheck = async (args, id, userId) => {
  try {
    const updatedRole = await Database.URLs.update(args, {
      where: { id, userId },
      returning: true,
    });

    return Protocols.appResponse({ data: updatedRole[1][0] });
  } catch (err) {
    return Protocols.appResponse({ err });
  }
};

export const getAllURLChecks = async (userId) => {
  try {
    const urlChecks = await Database.URLs.findAll({
      where: { userId },
      include: [
        {
          model: Database.UserURLChecks,
          as: "UserURLChecks",
        },
      ],
    });
    return Protocols.appResponse({ data: urlChecks });
  } catch (err) {
    return Protocols.appResponse({ err });
  }
};

export const getURLChecksByTag = async ({ tag }, userId) => {
  try {
    const urlsByTag = await Database.URLs.findAll({
      where: { userId, tags: tag },
      include: [
        {
          model: Database.UserURLChecks,
          as: "UserURLChecks",
        },
      ],
    });
    return Protocols.appResponse({ data: urlsByTag });
  } catch (err) {
    return Protocols.appResponse({ err });
  }
};

export const urlCheck = async ({ urlToCheckId }, userId) => {
  try {
    //Modify request to include startTime
    axios.interceptors.request.use(
      function (config) {
        config.metadata = { startTime: new Date() };
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    //modify response as to get the response time by calculating endTime of response and startTime of above modification
    axios.interceptors.response.use(
      function (response) {
        response.config.metadata.endTime = new Date();
        response.duration =
          response.config.metadata.endTime - response.config.metadata.startTime;
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    const urlDetails = await Database.URLs.findOne({
      where: { id: urlToCheckId, userId },
    });

    const urlCheckInstance = await Database.UserURLChecks.findOne({
      where: { urlId: urlToCheckId },
    });
    const user = await Database.Users.findByPk(userId);
    const url = urlDetails.protocol.toLowerCase() + "://" + urlDetails.url;

    const urlCheck = axios
      .get(url)
      .then(async function (response) {
        // handle success
        const urlCheck = updateReport(
          response,
          urlCheckInstance,
          urlDetails,
          true,
          null
        );
        sendMailUpURL(user.email, urlDetails.url);
        return urlCheck;
      })
      .catch(async function (error) {
        // handle that url is down or doesn't exist
        console.log(error);
        const urlCheck = updateReport(
          null,
          urlCheckInstance,
          urlDetails,
          null,
          true
        );
        sendMailDownURL(user.email, urlDetails.url, error);
        return urlCheck;
      });
    return Protocols.appResponse({ data: urlCheck });
  } catch (err) {
    console.log(err);
    return Protocols.appResponse({ err });
  }
};
