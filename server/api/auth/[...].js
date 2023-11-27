import { NuxtAuthHandler } from '#auth'
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'


export default NuxtAuthHandler({
  secret:useRuntimeConfig().oauth_secret,
  pages:{
    signIn:'/login'
  },
  providers: [
    GithubProvider.default({
      clientId: useRuntimeConfig().github_client_id,
      clientSecret: useRuntimeConfig().github_key_secret
    }),
    GoogleProvider.default({
      clientId: useRuntimeConfig().google_client_id,
      clientSecret: useRuntimeConfig().google_key_secret
    }),
    CredentialsProvider.default({
      name: 'Credentials',
      
      async authorize(credentials,req) {
        const {db,client} = await conexao()

        const dados_usuario = await db.collection('Usuarios').aggregate([
          {$match:{usuario:credentials.usuario}}
        ]).toArray()

        if(dados_usuario.length <=0){
          return null
        }

        const verifica_senha = await bcrypt.compare(credentials.senha,dados_usuario[0].senha)

        if(!verifica_senha){
          return null
        }else{
          const user = {
            id : dados_usuario[0]._id, 
            name : dados_usuario[0].usuario,   
          }
          return user
        }
      },
    }),

  ]
})