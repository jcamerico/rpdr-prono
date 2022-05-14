
function backendUrl() {
    return process.env.BACKEND_URL || 'http://localhost:3002';
}

export default backendUrl;