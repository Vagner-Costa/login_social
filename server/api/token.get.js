import { getToken } from '#auth'
// const {status} = useAuth()

export default eventHandler(async (event) => {
    const retorno = await getToken({ event })

    if(retorno){
        console.log(status.value)
    }
    return retorno
})