<script setup>
import { usePage } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import WelcomeAdmin from '@/Components/WelcomeAdmin.vue';
import WelcomeUser from '@/Components/WelcomeUser.vue';

// Obtenha o papel do usuário passado pelo Inertia (via props)
const { userRole } = usePage().props;
</script>

<template>
    <AppLayout title="Dashboard">
        <!-- User View -->
        <div v-if="userRole === 'user'">
            <div class="max-w-8xl mx-auto">
                <div class="bg-white overflow-hidden">
                    <WelcomeUser />
                    <NotificationUser />
                </div>
            </div>
        </div>

        <!-- Admin View -->
        <div v-if="userRole === 'admin'">
            <div class="max-w-8xl mx-auto">
                <div class="bg-white overflow-hidden">
                    <WelcomeAdmin />
                    <NotificationAdmin />
                </div>
            </div>
        </div>
    </AppLayout>
</template>
