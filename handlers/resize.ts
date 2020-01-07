export const handler = async (event) => {
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