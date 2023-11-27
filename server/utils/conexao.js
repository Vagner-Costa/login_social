import { MongoClient } from 'mongodb'
const uri = useRuntimeConfig().conexao

export const conexao = async()=>{
    let client
    let db
    try{
        client = new MongoClient(uri)
        db = client.db('login_social')
        
        return {db:db,client:client}
    }catch(err){
        console.log(err)

        return false
    }

}