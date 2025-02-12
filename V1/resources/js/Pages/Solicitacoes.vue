<template>
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <dl class="grid grid-cols-1 gap-y-16 text-center lg:grid-cols-3">
      <!-- Coluna de Pendentes -->
      <div class="bg-gray-300 py-6 px-10">
        <dt class="text-xl pb-5 text-gray-600"><span class="text-indigo-500"><i class="bi bi-circle-fill"></i></span> Pendentes</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-xl">
          <div class="space-y-2">
            <div
              v-for="(solicitacao, index) in pendentes"
              :key="'pendente-' + index"
              class="bg-white p-3 rounded-md shadow-sm cursor-pointer"
              @click="openModal(solicitacao, 'pendentes', index)"
            >
              {{ solicitacao }}
            </div>
          </div>
        </dd>
      </div>

      <!-- Coluna de Em andamento -->
      <div class="bg-gray-200 py-6 px-10">
        <dt class="text-xl pb-5 text-gray-600"><span class="text-yellow-200"><i class="bi bi-circle-fill"></i></span> Em andamento</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-xl">
          <div class="space-y-2">
            <div
              v-for="(solicitacao, index) in andamento"
              :key="'andamento-' + index"
              class="bg-white p-3 rounded-md shadow-sm cursor-pointer"
              @click="openModal(solicitacao, 'andamento', index)"
            >
              {{ solicitacao }}
            </div>
          </div>
        </dd>
      </div>

      <!-- Coluna de Concluídos -->
      <div class="bg-gray-300 py-6 px-10">
        <dt class="text-xl pb-5 text-gray-600"><span class="text-green-300"><i class="bi bi-circle-fill"></i></span> Concluídos</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-xl">
          <div class="space-y-2">
            <div
              v-for="(solicitacao, index) in concluidos"
              :key="'concluido-' + index"
              class="bg-white p-3 rounded-md shadow-sm cursor-pointer"
              @click="openModal(solicitacao, 'concluidos', index)"
            >
              {{ solicitacao }}
            </div>
          </div>
        </dd>
      </div>
    </dl>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div class="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h3 class="text-lg font-bold mb-4">Detalhes da Solicitação</h3>
        <p class="mb-4">{{ modalContent }}</p>
        <div class="mt-6 flex justify-between space-x-4">
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            @click="moverPara('andamento')"
          >
            Marcar como Em Análise
          </button>
          <button
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            @click="moverPara('concluidos')"
          >
            Marcar como Concluído
          </button>
        </div>
        <div class="mt-6 flex justify-between space-x-4">
          <button
            class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            @click="entrarEmContato"
          >
            Entrar em Contato
          </button>
        </div>
        <div class="mt-4 flex justify-end">
          <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" @click="closeModal">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pendentes: ["Solicitação 1", "Solicitação 2", "Solicitação 3"],
      andamento: ["Solicitação 4", "Solicitação 5"],
      concluidos: ["Solicitação 6", "Solicitação 7"],
      showModal: false,
      modalContent: "",
      currentStatus: "",
      currentIndex: null,
    };
  },
  methods: {
    openModal(solicitacao, status, index) {
      this.modalContent = solicitacao;
      this.currentStatus = status;
      this.currentIndex = index;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.modalContent = "";
      this.currentStatus = "";
      this.currentIndex = null;
    },
    moverPara(novoStatus) {
      if (this.currentStatus && this.currentIndex !== null) {
        const item = this[this.currentStatus][this.currentIndex];
        this[this.currentStatus].splice(this.currentIndex, 1);
        this[novoStatus].push(item);
        this.closeModal();
      }
    },
    entrarEmContato() {
      alert(`Entrando em contato sobre: ${this.modalContent}`);
      // Aqui você pode implementar uma lógica para redirecionar ou abrir um formulário
    },
  },
};
</script>
