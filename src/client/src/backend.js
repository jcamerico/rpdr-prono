
function backendUrl() {
    return process.env.REACT_APP_BACKEND_URL || '';
}

export default backendUrl;