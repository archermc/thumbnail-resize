'use strict';

module.exports.upload = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Uploaded successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.resize = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Resized successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};
