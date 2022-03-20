import url from "url";
export const updateReport = (
  response = null,
  urlCheckInstance,
  urlToCheck,
  success = null,
  failure = null
) => {
  //Succes or Failure
  urlCheckInstance.success = success
    ? urlCheckInstance.success + 1
    : urlCheckInstance.success;

  urlCheckInstance.failures = failure
    ? urlCheckInstance.failures + 1
    : urlCheckInstance.failures;

  //Availability
  urlCheckInstance.availability = parseInt(
    (100 * urlCheckInstance.success) /
      (urlCheckInstance.success +
        (urlCheckInstance.failures === 0 ? 1 : urlCheckInstance.failures))
  );

  //Uptime
  urlCheckInstance.uptime = success
    ? urlToCheck.interval + urlCheckInstance.uptime
    : urlCheckInstance.uptime;

  //Downtime
  urlCheckInstance.downtime = failure
    ? urlToCheck.interval + urlCheckInstance.downtime
    : urlCheckInstance.downtime;

  //Outages
  urlCheckInstance.outages = failure
    ? urlCheckInstance.outages + 1
    : urlCheckInstance.outages;

  //History
  const newEntry = success
    ? `Visited at ${new Date()} |Method: ${response.request.method.toUpperCase()} |URL: ${
        response.config.url
      }|Status: ${response.status} |Protocol: ${url
        .parse(response.config.url, true)
        .protocol.slice(0, 5)} |Response Time: ${response.duration}`
    : `Response Failed! at ${new Date()} `;

  urlCheckInstance.history = [...urlCheckInstance.history, newEntry];

  //Response Time
  let averageResponseTime = 0;
  for (let i = 0; i < urlCheckInstance.history.length; i++) {
    averageResponseTime += parseInt(urlCheckInstance.history[i].slice(-3));
  }
  urlCheckInstance.responseTime = success
    ? parseInt(
        (response.duration + averageResponseTime) /
          urlCheckInstance.history.length
      )
    : urlCheckInstance.responseTime;

  urlCheckInstance.save();

  return urlCheckInstance;
};
