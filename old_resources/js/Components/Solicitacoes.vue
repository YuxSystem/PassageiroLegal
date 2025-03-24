<script setup>
import { defineProps } from 'vue';

defineProps({
    solicitacoes: Array
});
</script>

<template>
    <div>
        <h1 class="text-2xl font-bold">Solicitações</h1>
        <table class="w-full mt-4 border">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border p-2">Usuário</th>
                    <th class="border p-2">Motivo</th>
                    <th class="border p-2">Data do Voo</th>
                    <th class="border p-2">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="solicitacao in solicitacoes" :key="solicitacao.id">
                    <td class="border p-2">{{ solicitacao.user.name }}</td>
                    <td class="border p-2">{{ solicitacao.motivo }}</td>
                    <td class="border p-2">{{ solicitacao.dta_voo }}</td>
                    <td class="border p-2">{{ solicitacao.status }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
