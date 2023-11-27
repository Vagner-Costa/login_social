<template>
    <div class="w-[500px] h-auto flex centralizado flex-col items-center p-50 bg-branco rounded-10" >
        <div class="w-full flex centralizado mb-10">
            <h1 class="titulo text-xxgde text-laranja">Cadastre-se</h1>
        </div>

        <form class="w-full" @submit.prevent="cadastrarUsuario">
            <div class="w-full h-40 flex centralizado">
                <p class=" texto text-cinza-claro" >{{ useMsgCreateUser }}</p>
            </div>

            <div class="w-full flex flex-col mb-10">
                <label class="texto text-peq text-cinza-claro">Crie um usuário válido:</label> 
                <input type="text" class="w-full p-10 border border-cinza-claro rounded-10
                    placeholder:text-peq outline-none"
                    placeholder="Cadastrar nome de Usuário..."
                    maxlength="12"
                    minlength="8"
                    v-model="useDadosUsuario.usuario"
                    ref="usuario"
                >
            </div>

            <div class="w-full flex flex-col mb-10">
                <label class="texto text-peq text-cinza-claro">Crie uma senha válida:</label> 
                <input type="password" class="w-full p-10 border border-cinza-claro rounded-10
                    placeholder:text-peq outline-none"
                    placeholder="Cadastrar senha..."
                    maxlength="12"
                    minlength="8"
                    v-model="useDadosUsuario.senha"
                    ref="senha"
                >
            </div>

            <div class="w-full flex flex-col mb-10">
                <label class="texto text-peq text-cinza-claro">Confirmar senha:</label> 
                <input type="password" class="w-full p-10 border border-cinza-claro rounded-10
                    placeholder:text-peq outline-none"
                    placeholder="Confirme sua senha..."
                    maxlength="12"
                    minlength="8"
                    v-model="useDadosUsuario.confirm_senha"
                    ref="confirmSenha"
                >
            </div>

            <div class="w-full min-w-full">
                <input type="submit" class="w-full min-w-full texto text-med text-branco bg-laranja
                    p-10 rounded-10 mb-10 border-2 border-laranja cursor-pointer
                    hover:bg-branco  hover:text-laranja"
                    value="Logar"
                >
            </div>
        </form>
        <NuxtLink to="/login" class="text-center texto text-pp text-cinza-claro ">
            Voltar
        </NuxtLink>
    </div>
</template>

<script setup>

    const useDadosUsuario = useState('dados_usuario',()=>{
        return {
            usuario:'',
            senha:'',
            confirm_senha:''
        }
    })
    const useMsgCreateUser = useState('useMsgCreateUser',()=>'')

    const usuario = ref()
    const senha = ref()
    const confirmSenha = ref()

    const router = useRouter()

    const cadastrarUsuario = async()=>{
        if(!useDadosUsuario.value.usuario){
            usuario.value.focus()
            usuario.value.placeholder = 'Campo usuário é obrigatório!'
            setTimeout(()=>{
                usuario.value.placeholder = 'Cadastrar nome de Usuário...'
            },4000)
            return false;
        }
        if(!useDadosUsuario.value.senha){
            senha.value.focus()
            senha.value.placeholder = 'Campo senha é obrigatório!'
            setTimeout(()=>{
                senha.value.placeholder = 'Cadastrar senha...'
            },4000)
            return false;
        }
        if(!useDadosUsuario.value.confirm_senha){
            confirmSenha.value.focus()
            confirmSenha.value.placeholder = 'Campo confirmar senha é obrigatório!'
            setTimeout(()=>{
                confirmSenha.value.placeholder = 'Confirme sua senha...'
            },4000)
            return false;
        }
        if(useDadosUsuario.value.confirm_senha !== useDadosUsuario.value.senha){
            useDadosUsuario.value.confirm_senha = ''
            confirmSenha.value.focus()
            confirmSenha.value.placeholder = 'Campo confirmar senha diferente da senha!'
            setTimeout(()=>{
                confirmSenha.value.placeholder = 'Confirme sua senha...'
            },4000)
            return false;
        }

        const {data} = await useFetch('/api/createUser',{
            method:'post',
            body:{
                usuario:useDadosUsuario.value.usuario,
                senha:useDadosUsuario.value.senha,
            }
        })   

        if(data._value !== undefined){
            useMsgCreateUser.value = await JSON.parse(data._value.body).mensagem
            setTimeout(()=>{
                useMsgCreateUser.value = ''
            },4000)
        }else{
            useMsgCreateUser.value = 'Usuário cadastrado com sucesso!'
            usuario.value.disabled = true
            senha.value.disabled = true
            confirmSenha.value.disabled = true
            setTimeout(()=>{
                useMsgCreateUser.value = ''
                return router.push('/login')
            },3000)
        }
    }

    

</script>

<style scoped>

</style>