const mysql2 = require('mysql2/promise')
const { findPersonQuery, registerPersonQuery } = require('./queries')

const connection = mysql2.createConnection({
    host: 'localhost',
    database: 'cursonodejs',
    port: 3306,
    user: 'root',
    password: 'root'
})

const findPerson = async(id) => {
    const findQuery = findPersonQuery(id);

    const result = connection.query(findQuery, (err, result) => {
        if (err) throw err
        if (result) {
            console.log('result', result)
            return result
        }
    });

    return result;
}

const registerPerson = async person => {
    const registerPerson = registerPersonQuery(person);
    console.log('registerPerson', registerPerson)
    connection.query(registerPerson, (err, result, fields) => {
        if (err) throw err
        else console.log('result: ', result)
    })
}

const postPerson = async person => {
    try {
        const find = await findPerson(person.id)
        console.log('find: ', find)
        if (find.length) {
            throw new Error('Pessoa já registrada.')
        } else {
            await registerPerson(person)
        }

        connection.end()
    } catch (err) {
        throw console.log(err)
    }
}

module.exports = {
    postPerson
}