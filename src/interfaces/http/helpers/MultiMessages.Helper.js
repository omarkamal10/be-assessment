import LocaleKeys from "../../../app/locales";

export default (messages, req) =>
  messages.map((msg) => msg).join(` ${LocaleKeys.AND} `);
