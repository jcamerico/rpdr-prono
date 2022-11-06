function errorHandler(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export default errorHandler;