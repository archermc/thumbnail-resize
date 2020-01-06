'use strict';

export const upload = async (event) => {
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
}

export const resize = async (event) => {
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
}
