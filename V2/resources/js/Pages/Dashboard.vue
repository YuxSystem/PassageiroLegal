<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import WelcomeAdmin from '@/Components/WelcomeAdmin.vue';
import WelcomeUser from '@/Components/WelcomeUser.vue';

// Pegando os dados do usuário autenticado
const user = computed(() => usePage().props.auth.user);
</script>

<template>
    <AppLayout title="Dashboard">
        <div>
        <!-- Renderiza a página correta com base no perfil -->
        <WelcomeAdmin v-if="user.rule === 'Admin'" />
        <WelcomeUser v-else />
    </div>
    </AppLayout>
</template>
