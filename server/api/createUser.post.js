import bcrypt from 'bcrypt'

export default defineEventHandler(async(event)=>{
    const {usuario, senha} = await readBody(event)
    const {db,client} = await conexao()

    // Verica se o usuário já existe
    const usuario_pesquisado = await db.collection('Usuarios').aggregate([
        {$match:{usuario: usuario}}
    ]).toArray()

    if(usuario_pesquisado.length > 0){
        await client.close()
        return {
            statusCode: 409,
            body: JSON.stringify({mensagem:'Já existe um usuário com esse nome!'})
        }
    }

    // Gerando senha criptografada
    const  hash  =  await bcrypt.hashSync(senha,12)
    if(!hash){
        await client.close()
        return {
            statusCode: 409,
            body: JSON.stringify({mensagem:'Erro ao cadastrar novo usuário!'})
        }
    }

    // Adicionando novo usuário ao banco de dados
    db.collection("Usuarios").insertOne({usuario:usuario,senha:hash})
    .then(async(response)=>{
        await client.close()
        if(!response.acknowledged){
            return {
                statusCode : 409,
                body: JSON.stringify({mensagem: 'Erro ao cadastrar novo usuário!'})
            }
        }else{
            const user = {id:response.insertedId}
            return user
        }
        
    })
    .catch(async(err)=>{
        console.log(err)
        await client.close()
        return {
            statusCode : 500,
            body: JSON.stringify({mensagem: 'Erro! tente novamente mais tarde!'})
        }
    })
})