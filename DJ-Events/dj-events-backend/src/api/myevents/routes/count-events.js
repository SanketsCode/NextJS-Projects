module.exports = {
    routes: [
        { // Path defined with a URL parameter
            method: 'GET',
            path: '/events/count',
            handler: 'myevents.count',
        },
    ]
}