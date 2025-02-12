<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar com Menu Kanban -->
    <aside class="bg-white dark:bg-gray-800 shadow-lg w-64">
      <div class="p-6">
        <h2 class="text-xl font-bold text-gray-700 dark:text-gray-200">Menu</h2>
      </div>
      <nav class="mt-4 space-y-2">
        <router-link
          to="/solicitacoes"
          class="flex items-center space-x-4 px-4 py-2 cursor-pointer hover:bg-indigo-300"
        >
          <p class="text-xl"><i class="bi bi-kanban"></i></p>
          <p class="text-sm">Solicitações de Análise</p>
        </router-link>

        <router-link
          to="/companhias"
          class="flex items-center space-x-4 px-4 py-2 cursor-pointer hover:bg-indigo-300"
        >
          <p class="text-xl"><i class="bi bi-airplane"></i></p>
          <p class="text-sm">Companhias Aéreas</p>
        </router-link>

        <router-link
          to="/usuarios"
          class="flex items-center space-x-4 px-4 py-2 cursor-pointer hover:bg-indigo-300"
        >
          <p class="text-xl"><i class="bi bi-people"></i></p>
          <p class="text-sm">Usuários</p>
        </router-link>
      </nav>
    </aside>

    <!-- Conteúdo Principal -->
    <div class="w-full">
    <Solicitacoes />
    </div>
    
  </div>
</template>

<script setup>
import Solicitacoes from '@/Pages/Solicitacoes.vue';
</script>
