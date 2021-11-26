const execute = require('./../utils/mysql')

class ExtensionController{
    constructor(props){}

    // 创建扩展
    async createExtension(data){
        const { uuid, view_file, ext_file, icon_file, name, introduce, catalog, source_url, source_name, downloads } = data
        let fileSql = "insert into `files` (`uuid`, `type`, `url`) values "
        view_file.concat(ext_file, icon_file).map((item) => {
            const { type, ossUrl } = item
            fileSql += `('${uuid}', '${type}', '${ossUrl}'),`
        })
        fileSql = fileSql.substr(0, fileSql.length-1)

        try{
            const {error: err1, results: res1, fields: field1} = await execute(fileSql)

            if( err1 ){
                return {error: err1, result: null, message: 'db files error'}
            }
        }catch(e){
            return {error: e.message, result: null, message: 'db files error'}
        }

        try{
            let sql = "insert into `extensions` (`uuid`, `name`, `introduce`, `catalog`, `source_url`, `source_name`, `downloads`) values ('"+uuid+"','"+name+"','"+introduce+"','"+catalog+"','"+source_url+"','"+source_name+"',"+downloads+")"
            const {error: err2, results: res2, fields: field2} = await execute(sql)

            if( err2 ){
                return {error: err2, result: null, message: 'db extension error'}
            }
        }catch(e){
            return {error: e.message, result: null, message: 'db extension error'}
        }

        return {error: null, result: uuid, message: 'ok'}
    }

    // 获取数据
    async getExtension(id){
        const sql = "select `uuid`, `name`, `introduce`, `catalog`, `source_url`, `source_name`, `downloads`, `created_at`, `updated_at` from `extensions` where extensions.uuid='"+id+"'"
        const fileSql = "select `type`, `url` from `files` where uuid='"+id+"'"

        let { error:err1, results:res1, fields:fields1 } = await execute(sql)
        let { error:err2, results:res2, fields:fields2 } = await execute(fileSql)

        if( err1 || err2 ){
            return {error: err1 || err2, result: null, message: 'db extension error'}
        }
        res1 = res1.map((item) => {
            item.ext_file = res2.filter(d => d.type == 'ext')
            item.view_file = res2.filter(d => d.type == 'view')
            item.icon_file = res2.filter(d => d.type == 'icon')

            return item
        })
        return {error: null, result: res1, message: 'success'}
    }
}

module.exports = new ExtensionController()