<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Welcome from '@/Components/Welcome.vue';
</script>

<template>
    <AppLayout title="Dashboard">
        <div>
            <div class="max-w-8xl mx-auto">
                <div class="bg-white overflow-hidden">
                    <Welcome />
                </div>
            </div>
        </div>
    </AppLayout>
</template>
