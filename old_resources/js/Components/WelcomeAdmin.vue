<template>
    <aside class="w-64 h-screen bg-white shadow-lg p-6">
      <h2 class="text-xl font-semibold mb-6">Painel Administrativo</h2>
      
      <ul class="space-y-4">
        <!-- Botão Solicitações -->
        <li @click="setActive('solicitacoes')" 
            :class="{'font-bold text-blue-500': activeMenu === 'solicitacoes'}"
            class="cursor-pointer">
          Solicitações
        </li>
  
        <!-- Dropdown Usuários -->
        <li class="relative">
          <div @click="toggleDropdown" class="cursor-pointer flex items-center justify-between">
            <span :class="{'font-bold text-blue-500': activeMenu.startsWith('usuarios')}">Usuários</span>
            <span class="text-gray-600">{{ isDropdownOpen ? '▲' : '▼' }}</span>
          </div>
          
          <ul v-if="isDropdownOpen" class="ml-4 mt-2 space-y-2 text-sm">
            <li @click="setActive('usuarios_adicionar')" 
                :class="{'font-bold text-blue-500': activeMenu === 'usuarios_adicionar'}"
                class="cursor-pointer">
              Adicionar Usuário
            </li>
            <li @click="setActive('usuarios_todos')" 
                :class="{'font-bold text-blue-500': activeMenu === 'usuarios_todos'}"
                class="cursor-pointer">
              Todos
            </li>
            <li @click="setActive('usuarios_permissoes')" 
                :class="{'font-bold text-blue-500': activeMenu === 'usuarios_permissoes'}"
                class="cursor-pointer">
              Permissões
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Estado para controlar o menu ativo
  const activeMenu = ref('solicitacoes');
  
  // Estado para abrir/fechar dropdown
  const isDropdownOpen = ref(false);
  
  // Função para definir o menu ativo
  const setActive = (menu) => {
    activeMenu.value = menu;
    isDropdownOpen.value = menu.startsWith('usuarios'); // Manter dropdown aberto se estiver em "Usuários"
  };
  
  // Função para alternar dropdown
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };
  </script>
  
  <style scoped>
  .cursor-pointer {
    padding: 10px;
    border-radius: 5px;
    transition: background 0.3s;
  }
  
  .cursor-pointer:hover {
    background: #f1f5f9;
  }
  </style>
  