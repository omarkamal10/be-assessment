import cronTime from "cron-time-generator";

exports.timeToMilliseconds = (time) => {
  let splitTime = time.split(":");
  return (
    parseInt(splitTime[0]) * 24 * 60 * 60 * 1000 +
    parseInt(splitTime[1]) * 60 * 60 * 1000 +
    parseInt(splitTime[2]) * 60 * 1000 +
    parseInt(splitTime[3]) * 1000
  );
};

exports.getUpdatesEveryMinute = () => {
  let currentDate;
  let dailyDate;
  let response = [];
  currentDate = new Date();
  dailyDate = new Date();
  response.push(cronTime.everyMinute());
  return response;
};
