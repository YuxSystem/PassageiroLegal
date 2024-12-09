<template>
    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Processo de Solicitação</h2>
      <div class="flex items-center justify-between mb-6">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="flex items-center space-x-2"
        >
          <div
            :class="[
              'w-10 h-10 flex items-center justify-center rounded-full',
              currentStep >= index ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-600',
            ]"
          >
            {{ index + 1 }}
          </div>
          <p
            :class="[
              'text-sm font-medium',
              currentStep >= index ? 'text-indigo-500' : 'text-gray-600',
            ]"
          >
            {{ step }}
          </p>
        </div>
      </div>
  
      <!-- Formulário -->
      <div>
        <div v-if="currentStep === 0">
          <h3 class="text-lg font-semibold">Verificação da Elegibilidade</h3>
          <p class="text-sm text-gray-600 mb-4">Responda algumas perguntas básicas.</p>
          <form @submit.prevent="nextStep">
            <label class="block mb-4">
              <span class="text-gray-700">Qual o motivo da sua reclamação?</span>
              <select class="form-select mt-1 block w-full rounded-md border-gray-300">
                <option>Atraso de voo</option>
                <option>Cancelamento de voo</option>
                <option>Overbooking</option>
                <option>Outros</option>
              </select>
            </label>
            <button
              type="submit"
              class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-400"
            >
              Próximo
            </button>
          </form>
        </div>
  
        <div v-if="currentStep === 1">
          <h3 class="text-lg font-semibold">Informações Adicionais</h3>
          <p class="text-sm text-gray-600 mb-4">Informe detalhes adicionais do voo.</p>
          <form @submit.prevent="nextStep">
            <label class="block mb-4">
              <span class="text-gray-700">Número do voo</span>
              <input type="text" class="form-input mt-1 block w-full rounded-md border-gray-300" />
            </label>
            <label class="block mb-4">
              <span class="text-gray-700">Data do voo</span>
              <input
                type="date"
                class="form-input mt-1 block w-full rounded-md border-gray-300"
              />
            </label>
            <button
              type="button"
              @click="prevStep"
              class="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Voltar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-400"
            >
              Próximo
            </button>
          </form>
        </div>
  
        <div v-if="currentStep === 2">
          <h3 class="text-lg font-semibold">Envio de Documentos</h3>
          <p class="text-sm text-gray-600 mb-4">Envie os documentos necessários.</p>
          <form @submit.prevent="nextStep">
            <label class="block mb-4">
              <span class="text-gray-700">Envie uma cópia do bilhete</span>
              <input type="file" class="form-input mt-1 block w-full" />
            </label>
            <button
              type="button"
              @click="prevStep"
              class="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Voltar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-400"
            >
              Próximo
            </button>
          </form>
        </div>
  
        <div v-if="currentStep === 3">
          <h3 class="text-lg font-semibold">Finalização</h3>
          <p class="text-sm text-gray-600 mb-4">Seu processo foi enviado com sucesso.</p>
          <button
            type="button"
            @click="prevStep"
            class="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Voltar
          </button>
          <button
            @click="completeProcess"
            class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400"
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        steps: [
          "Verificação da Elegibilidade",
          "Informações Adicionais",
          "Documentos",
          "Finalização",
        ],
        currentStep: 0,
      };
    },
    methods: {
      nextStep() {
        if (this.currentStep < this.steps.length - 1) {
          this.currentStep++;
        }
      },
      prevStep() {
        if (this.currentStep > 0) {
          this.currentStep--;
        }
      },
      completeProcess() {
        alert("Processo finalizado!");
      },
    },
  };
  </script>
  