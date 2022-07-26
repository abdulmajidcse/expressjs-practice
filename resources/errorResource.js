const errorResource = (
  errors = [],
  errorCode = 422,
  errorMessage = "Error"
) => {
  return {
    errorCode: errorCode,
    errorMessage: errorMessage,
    errors: errors,
  };
};

module.exports = errorResource;
