var oracle = require('oracledb');

var credentials =  {
    user: 'test',
    password: '1234',
    connectString: '172.17.0.2/orcl18'
}


//export

async function Open(sql, binds, autoCommit){

    let con = await oracle.getConnection(credentials);
    
    if (con) {
        //console.log("Conexion establecida correctamente");
        let result = await con.execute(sql, binds, { autoCommit });
        con.release();

        return result;            

    } else {
        return null;
    }


}

exports.Open = Open;