const Hapi = require('@hapi/hapi');
const { fetchPerson } = require('./external-api');
const { postPerson } = require('./database')

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
            const personPayload = { id: param.id, ...personJson }
            const dbResponse = await postPerson(personPayload)

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

//Teste commit

init();