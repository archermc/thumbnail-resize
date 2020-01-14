const createResponse = (statusCode: number, body?: any) => { 
  return {
    statusCode: statusCode,
    body: JSON.stringify(body)
  }
}

export default createResponse;