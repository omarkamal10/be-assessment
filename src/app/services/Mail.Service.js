import NodeMailer from "nodemailer";
import { mailTemplate } from "../templates";
import Config from "../../../config";

const { user, password, host, port } = Config.SMTP;

export default async function sendMail(data) {
  try {
    const transporter = NodeMailer.createTransport({
      host,
      port,
      secure: false,
      auth: { user, pass: password },
    });

    await transporter.sendMail(data);
  } catch (error) {
    throw new Error(error.message);
  }
}

export const sendMailVerification = async (
  subject,
  sendTo,
  name,
  message,
  token
) => {
  try {
    await sendMail({
      from: Config.App.mail,
      to: sendTo,
      subject: `${Config.App.name} ${subject}`,
      html: mailTemplate(subject, name, message, token),
    });
    console.log("Email Sent");
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sendMailDownURL = async (sendTo, urlToCheck, error) => {
  try {
    await sendMail({
      from: Config.App.mail,
      to: sendTo,
      subject: `${urlToCheck} is down!`,
      html: `Please check what's wrong with your server \n${error}`,
    });
    console.log("Email Sent");
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sendMailUpURL = async (sendTo, urlToCheck) => {
  try {
    await sendMail({
      from: Config.App.mail,
      to: sendTo,
      subject: `${urlToCheck} is up and running!`,
      html: `Your server is a beast :D`,
    });
    console.log("Email Sent");
  } catch (error) {
    throw new Error(error.message);
  }
};
