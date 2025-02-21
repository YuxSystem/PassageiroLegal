<script setup>
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';

const form = ref({
    name: '',
    email: '',
    cpf: '',
    password: '',
    telefone: '',
    celular: '',
    cidade: '',
    estado: '',
    pais: ''
});

const submit = () => {
    router.post('/usuarios', form.value);
};
</script>

<template>
    <div>
        <h1 class="text-2xl font-bold">Adicionar Usuário</h1>
        <form @submit.prevent="submit" class="mt-4">
            <input v-model="form.name" placeholder="Nome" required class="border p-2 w-full mb-2" />
            <input v-model="form.email" placeholder="Email" required class="border p-2 w-full mb-2" />
            <input v-model="form.cpf" placeholder="CPF" required class="border p-2 w-full mb-2" />
            <input v-model="form.password" type="password" placeholder="Senha" required class="border p-2 w-full mb-2" />
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
        </form>
    </div>
</template>
