<template>
    <div class="w-screen h-screen centralizado flex coluna">

        <h1 class="titulo text-xxgde text-laranja">Login efetuado com sucesso...</h1>
        <button @click="signOut()" class="w-full max-w-[300px] texto text-med text-branco
            bg-laranja p-10 rounded-10 mb-10 border-2 border-laranja cursor-pointer
            hover:bg-branco hover:text-laranja"
        >
            Sair
        </button>

    </div>


</template>

<script setup>
    const {signOut} = useAuth()
</script>

<style scoped>

</style>