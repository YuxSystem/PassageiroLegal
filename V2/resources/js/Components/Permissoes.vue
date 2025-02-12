<script setup>
import { defineProps } from 'vue';
import { router } from '@inertiajs/vue3';

defineProps({
    users: Array
});

const updateUser = (user, field, value) => {
    router.patch(`/usuarios/${user.id}`, { [field]: value });
};
</script>

<template>
    <div>
        <h1 class="text-2xl font-bold">Gerenciar Permissões</h1>
        <ul class="mt-4">
            <li v-for="user in users" :key="user.id" class="border-b p-2 flex justify-between">
                <span>{{ user.name }} - {{ user.rule }}</span>
                <button @click="updateUser(user, 'rule', user.rule === 'Admin' ? 'User' : 'Admin')" class="bg-blue-500 text-white px-4 py-2 rounded">
                    {{ user.rule === 'Admin' ? 'Tornar User' : 'Tornar Admin' }}
                </button>
            </li>
        </ul>
    </div>
</template>
