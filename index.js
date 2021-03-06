const Hapi = require('@hapi/hapi');
const { fetchPerson } = require('./external-api');

const init = async() => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/person/{id}',
        handler: async(request, h) => {
            const param = request.params;
            const personJson = await fetchPerson(param.id)
            console.log(personJson)

            return h
                .response(personJson);
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();