const errorResource = (
  errors = [],
  errorCode = 422,
  errorMessage = "Error occured"
) => {
  return {
    errorCode: errorCode,
    errorMessage: errorMessage,
    errors: errors,
  };
};

module.exports = errorResource;
