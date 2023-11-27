<template>
    <div class="w-[500px] h-auto flex flex-col centralizado items-center p-50 bg-branco rounded-10" >
        <div class="w-full flex centralizado mb-10">
            <h1 class="titulo text-xxgde text-laranja">Efetue o Login</h1>
        </div>
<!--Botão login social com o google  -->
        <button class="w-100% border border-cinza-claro rounded-10 mb-10 flex coluna centralizado 
            cursor-pointer"
            @click="loginGoogle"
        >   
            <div class="flex linha centralizado">
                <img src="../assets/imagens/google.png" class="w-20 h-20 mr-5" alt="img">
                <p class="texto text-med text-preto">Google</p>
            </div>
            <p class="font-texto text-pp text-cinza-claro">Conecte-se com o Google</p>
        </button>
<!--Botão login social com o Facebook  -->
        <button class="w-100% border border-cinza-claro rounded-10 mb-10 flex coluna centralizado 
            cursor-pointer"
            @click="loginGithub"
        >
            <div class="flex linha centralizado">
                <img src="../assets/imagens/github.png" class="w-20 h-20 mr-5" alt="img">
                <p class="texto text-med text-preto">Github</p>
            </div>
            <p class="font-texto text-pp text-cinza-claro">Conecte-se com o Github</p>
        </button>
        <div class="w-full flex justify-between items-center">
            <div class="w-[35%] h-2 bg-laranja"></div>
            <p class=" texto text-laranja text-med">ou</p>
            <div class="w-[35%] h-2 bg-laranja"></div>
        </div>
<!-- Formulário login com usuário e senha -->
        <form class="w-full" @submit.prevent="login()">
            <div class="w-full flex flex-col mb-10">
                <label for="name" class="texto text-peq text-cinza-claro">Usuário:</label> 
                <input type="text" class="w-full p-10 border border-cinza-claro rounded-10
                    placeholder:text-peq outline-none"
                    placeholder="Digite o Usuário..."
                    v-model="useDados.useUsuario"
                    ref="usuario"
                >
            </div>

            <div class="w-full flex flex-col mb-20">
                <label for="name" class="texto text-peq text-cinza-claro">Senha:</label> 
                <input type="password" class="w-full p-10 border border-cinza-claro rounded-10
                    placeholder:text-peq outline-none"
                    placeholder="Digite a senha..."
                    v-model="useDados.useSenha"
                    ref="senha"
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
        <NuxtLink to="/createUser" class="texto text-pp text-cinza-claro text-center">
            Ainda não tem conta? Cadastre-se aqui!
        </NuxtLink>
    </div>
</template> 

<script setup>
    const {signIn} = useAuth()

    const usuario = ref()
    const senha = ref()

    const useDados = useState('usuario',()=>{ 
        return {
            useUsuario: undefined,
            useSenha: undefined
        }
    })
    
// Login via form
    async function login(){
        if(!useDados.value.useUsuario || useDados.value.useUsuario === undefined){
            usuario.value.placeholder = "*Campo usuário é obrigatório..."
            setTimeout(()=>{
                usuario.value.placeholder = "Digite o usuário..."
            },4000)
            return false
        }
        if(!useDados.value.useSenha || useDados.value.useSenha === undefined){
            senha.value.placeholder = "*Campo senha é obrigatório..."
            setTimeout(()=>{
                senha.value.placeholder = "Digite a senha..."
            },4000)
            return false
        }

        await signIn('credentials',{
            usuario:useDados.value.useUsuario,
            senha:useDados.value.useSenha,
            callbackUrl:'/'
        })
    }
// Login via github
    const loginGithub = async()=>{
        await signIn('github',{callbackUrl:'/'})
    }
// Login via google
    const loginGoogle = async()=>{
        await signIn('google',{callbackUrl:'/'})
    }

</script>

<style scoped>
</style>