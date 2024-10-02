function requestValidator(obj) {
    const methods = ["GET", "POST", "CONNECT", "DELETE"];
    const uriRegex = /^[a-zA-Z.0-9]+$/;
    const versions = ["HTTP/0.9", "HTTP/1.0", "HTTP/1.1", "HTTP/2.0"];
    const messageRegex = /[<>&'"\\]/g;
    
    if (!obj.hasOwnProperty('method')|| !methods.includes(obj.method)) {
        throw new Error(`Invalid request header: Invalid Method`);
    }
    else if (!obj.hasOwnProperty('uri') || !uriRegex.test(obj.uri) || obj.uri == "") {
        throw new Error(`Invalid request header: Invalid URI`);
    }
    else if (!obj.hasOwnProperty('version') || !versions.includes(obj.version)) {
        throw new Error(`Invalid request header: Invalid Version`);
    }
    else if ((!obj.hasOwnProperty('message') || messageRegex.test(obj.message))) {
        throw new Error(`Invalid request header: Invalid Message`);
    }

    // Should be returned, but I like to keep the console.log() instead.
    // console.log(obj);
    return obj;
}

requestValidator({ method: 'GET', uri: 'svn.public.catalog', version: 'HTTP/1.1', message: '9gf' });