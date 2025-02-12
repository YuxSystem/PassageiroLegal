<template>
    <div class="flex h-screen bg-gray-200">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-800 text-white shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Progresso</h2>
        <ul class="space-y-4">
          <li v-for="(item, index) in steps" :key="index" 
              :class="{'font-bold text-green-500': step === index + 1}">
            <span class="text-sm">{{ index + 1 }}. {{ item }}</span>
          </li>
        </ul>
      </aside>
  
      <!-- Formulário -->
      <div class="flex-1 flex justify-center">
        <div class="max-w-8xl p-12 w-full">  
          <!-- Step 1 -->
          <div v-if="step === 1">
            <h1 class="text-xl font-semibold mb-2">Verificação de Elegibilidade</h1>
            <hr class="w-full border-t-1 border-gray-800 mb-2">
            <h3 class="text-sm font-medium"><i>Escolha o motivo de sua solicitação</i></h3>
            <label class="block mt-4 font-medium">Motivo da Reclamação</label>
            <select v-model="form.motivo" class="w-full p-2 border rounded">
              <option value="Atraso de Voo">Atraso de Voo</option>
              <option value="Cancelamento de Voo">Cancelamento de Voo</option>
              <option value="Overbooking">Overbooking</option>
              <option value="Outros">Outros</option>
            </select>
            <input v-if="form.motivo === 'Outros'" v-model="form.motivo_outro" type="text" class="w-full p-2 border rounded mt-2" placeholder="Descreva o motivo" />
          </div>
  
          <!-- Step 2 -->
          <div v-if="step === 2">
            <h1 class="text-xl font-semibold mb-2">Informações Adicionais</h1>
            <hr class="w-full border-t-1 border-gray-800 mb-2">
            <h3 class="text-sm font-medium"><i>Preencha o formulário com número do voo, data do voo e uma breve descrição do ocorrido.</i></h3>
            <label class="block mt-4 font-medium">Número do Voo</label>
            <input v-model="form.num_voo" type="text" class="w-full p-2 border rounded" />
            <label class="block mt-4 font-medium">Data do Voo</label>
            <input v-model="form.dta_voo" type="date" class="w-full p-2 border rounded" />
            <label class="block mt-4 font-medium">Detalhes do Ocorrido</label>
            <textarea v-model="form.detalhe" class="w-full p-2 border rounded"></textarea>
          </div>
  
          <!-- Step 3 -->
          <div v-if="step === 3">
            <h1 class="text-xl font-semibold mb-2">Envio de Documentos</h1>
            <hr class="w-full border-t-1 border-gray-800 mb-2">
            <h3 class="text-sm font-medium"><i>Envie os documentos nescessarios para analise de sua solicitação.</i></h3>
            
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            <div class="sm:col-span-2">
            <label class="block mt-4 font-medium">Registro Nacional</label>
            <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div class="text-center">
                <svg class="mx-auto w-12 h-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
                </svg>
                <div class="mt-4 flex text-sm text-gray-600">
                <label for="registro-nasc-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                    <span class="p-3">Upload a file</span>
                    <input
                    id="registro-nasc-upload"
                    name="registro-nasc-upload"
                    type="file"
                    class="sr-only"
                    @change="handleFileUpload($event, 'registro_nasc')"
                    />
                </label>
                <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-600">PDF, PNG, JPG, GIF up to 10MB</p>
            </div>
            </div>
            </div>

            <!-- Comprovante de Residência -->
            <div class="sm:col-span-2">
            <label class="block mt-4 font-medium">Comprovante de Residência</label>
            <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div class="text-center">
                <svg class="mx-auto w-12 h-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
                </svg>
                <div class="mt-4 flex text-sm text-gray-600">
                <label for="comprovante-res-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                    <span class="p-3">Upload a file</span>
                    <input
                    id="comprovante-res-upload"
                    name="comprovante-res-upload"
                    type="file"
                    class="sr-only"
                    @change="handleFileUpload($event, 'comprovante_res')"
                    />
                </label>
                <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-600">PDF, PNG, JPG, GIF up to 10MB</p>
            </div>
            </div>
            </div>

            <!-- Cópia da Passagem Aérea -->
            <div class="sm:col-span-2">
            <label class="block mt-4 font-medium">Cópia da Passagem Aérea</label>
            <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div class="text-center">
                <svg class="mx-auto w-12 h-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
                </svg>
                <div class="mt-4 flex text-sm text-gray-600">
                <label for="comprovante-voo-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                    <span class="p-3">Upload a file</span>
                    <input
                    id="comprovante-voo-upload"
                    name="comprovante-voo-upload"
                    type="file"
                    class="sr-only"
                    @change="handleFileUpload($event, 'comprovante_voo')"
                    />
                </label>
                <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-600">PDF, PNG, JPG, GIF up to 10MB</p>
            </div>
            </div>
            </div>


            </div>
          </div>
  
          <!-- Step 4 -->
          <div v-if="step === 4">
            <h1 class="text-xl font-semibold mb-2">Informações Pessoais</h1>
            <hr class="w-full border-t-1 border-gray-800 mb-2">
            <h3 class="text-sm font-medium"><i>Preencha os dados restantes para sua solicitação</i></h3>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            <div class="sm:col-span-3">
            <label class="block mt-4 font-medium">Nome</label>
            <input v-model="form.nome" type="text" disabled placeholder="{{ users.name }}" class="bg-gray-300 w-full p-2 border rounded" />
            </div>

            <div class="sm:col-span-3">
            <label class="block mt-4 font-medium">Email</label>
            <input v-model="form.email" type="email" disabled placeholder="{{ users.email }}" class="bg-gray-300 w-full p-2 border rounded" />
            </div>

            <div class="sm:col-span-2">
            <label class="block mt-4 font-medium">CPF</label>
            <input v-model="form.cpf" type="text" class="w-full p-2 border rounded" />
            </div>
            
            <div class="sm:col-span-2">
            <label class="block mt-4 font-medium">Telefone</label>
            <input v-model="form.telefone" type="text" class="w-full p-2 border rounded" />
            </div>
            
            <div class="sm:col-span-2">
            <label class="block mt-4 font-medium">Celular</label>
            <input v-model="form.celular" type="text" class="w-full p-2 border rounded" />
            </div>
  
            <div class="sm:col-span-4">
            <label class="block mt-4 font-medium">Endereço</label>
            <input v-model="form.endereco" type="text" class="w-full p-2 border rounded" />
            </div>
            
            <div class="sm:col-span-2">
            <label class="block mt-4 font-medium">Bairro</label>
            <input v-model="form.bairro" type="text" class="w-full p-2 border rounded" />
            </div>

            <div class="sm:col-span-2">
            <label class="block mt-4 font-medium">CEP/Zipcode</label>
            <input v-model="form.cep_zipcode" type="text" class="w-full p-2 border rounded" />
            </div>
  
            <div class="sm:col-span-2">
            <label class="block mt-4 font-medium">Cidade</label>
            <input v-model="form.cidade" type="text" class="w-full p-2 border rounded" />
            </div>
  
            <div class="sm:col-span-1">
            <label class="block mt-4 font-medium">Estado</label>
            <input v-model="form.estado" type="text" class="w-full p-2 border rounded" />
            </div>
  
            <div class="sm:col-span-1">
            <label class="block mt-4 font-medium">País</label>
            <input v-model="form.pais" type="text" class="w-full p-2 border rounded" />
            </div>

            </div>
        </div>
  
          <!-- Botões de Navegação -->
          <div class="mt-6 flex justify-between">
            <button v-if="step > 1" @click="step--" class="bg-gray-400 text-white px-4 py-2 rounded">Voltar</button>
            <button v-if="step < 4" @click="step++" class="bg-blue-500 text-white px-4 py-2 rounded">Próximo</button>
            <button v-if="step === 4" @click="submitForm" class="bg-green-500 text-white px-4 py-2 rounded">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        step: 1,
        steps: ["Elegibilidade", "Informações do Voo", "Envio de Documentos", "Dados Pessoais"],
        form: {
          motivo: '',
          motivo_outro: '',
          num_voo: '',
          dta_voo: '',
          detalhe: '',
          registro_nasc: null,
          comprovante_res: null,
          comprovante_voo: null,
          nome: '',
          email: '',
          cpf: '',
          telefone: '',
          celular: '',
          endereco: '',
          bairro: '',
          cep_zipcode: '',
          cidade: '',
          estado: '',
          pais: ''
        }
      };
    },
    methods: {
      handleFileUpload(event, field) {
        this.form[field] = event.target.files[0];
      },
      async submitForm() {
        let formData = new FormData();
        Object.keys(this.form).forEach(key => {
          formData.append(key, this.form[key]);
        });
  
        try {
          await axios.post('/solicitacoes', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          alert('Solicitação enviada com sucesso!');
        } catch (error) {
          console.error(error);
          alert('Erro ao enviar solicitação.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }
  </style>
  