const successResource = (
  data = [],
  statusCode = 200,
  statusMessage = "Data retrieved successfully"
) => {
  return {
    statusCode: statusCode,
    statusMessage: statusMessage,
    data: data,
  };
};

module.exports = successResource;
