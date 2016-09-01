var __CONFIG__ = {
    url: 'http://localhost:3000/combo?',
    basePath: '/modules',
    combine: true,
    map: {
        'jquery': 'http://code.jquery.com/jquery-2.1.3.min.js',
        'aui': 'html/js'
    }
};
__CONFIG__.modules = {
    "/js/address1.es.js": {
        "dependencies": ["exports", "modal@1.0.0/js/address2.es"],
        "path": "/js/address1.es.js"
    },
    "/js/address2.es.js": {
        "dependencies": ["exports"],
        "path": "/js/address2.es.js"
    }
};