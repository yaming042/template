const mysql = require('mysql')
const config = require('./../../config/config.json')

const pool = mysql.createPool( config.mysql )

const execute = function(sql){
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if( err ) return resolve({error: err, results: null, fields: null})

            connection.query(sql, (error, results, fields) => {
                connection.release()

                if( error ) return resolve({error: error, results: null, fields: null})

                resolve({error: error, results: JSON.parse(JSON.stringify(results)), fields: fields})
            })
        })
    })
}

module.exports = execute