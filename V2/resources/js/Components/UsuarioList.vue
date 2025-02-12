<script setup>
import { defineProps } from 'vue';

defineProps({
    users: Array
});
</script>

<template>
    <div>
        <h1 class="text-2xl font-bold">Lista de Usuários</h1>
        <ul class="mt-4">
            <li v-for="user in users" :key="user.id" class="border-b p-2">
                {{ user.name }} - {{ user.email }}
            </li>
        </ul>
    </div>
</template>
