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
