const fetch = require('node-fetch')

const baseUrl = 'http://swapi.dev/api/people';

const fetchPerson = async id => {
    if (!id) return

    return fetch(`${baseUrl}/${id}`)
        .then(response => response.json())
        .then(responseJson => responseJson)
        .catch(err => console.log(err))
}

module.exports = {
    fetchPerson
};