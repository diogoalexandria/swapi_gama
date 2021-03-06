const findPersonQuery = (id) => `
  SELECT * FROM person
  WHERE person.id = ${id};
`

const registerPersonQuery = (person) => `
  INSERT INTO person (
    ${person.id},
    ${person.name},
    ${person.birth_year},
    ${person.gender},
    ${person.height},
    ${person.mass}
  )
`

module.exports = {
    findPersonQuery,
    registerPersonQuery
}