const successResource = (
  data = [],
  statusCode = 200,
  statusMessage = "Success"
) => {
  return {
    statusCode: statusCode,
    statusMessage: statusMessage,
    data: data,
  };
};

module.exports = successResource;
