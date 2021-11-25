const execute = require('./../utils/mysql')

class TestController {
    constructor(props){}

    init(a,b){
        console.log(a,b)
        return {status: 200, data:['hello world'], msg: 'ok'}
    }

    async getAllData(){
        const { error, results, fields } = await execute(`select * from db_1`)

        return error ? null : results
    }
}

module.exports = new TestController()