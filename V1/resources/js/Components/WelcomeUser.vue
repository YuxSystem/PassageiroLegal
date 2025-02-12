<template>
  <div class="container mx-auto p-6">
    <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Solicitação de Reclamação</h2>
      
      <div v-if="step === 1">
        <h3 class="text-lg font-medium">Verificação de Elegibilidade</h3>
        <label class="block mt-4">Motivo da Reclamação</label>
        <select v-model="form.motivo" class="w-full p-2 border rounded">
          <option value="Atraso de Voo">Atraso de Voo</option>
          <option value="Cancelamento de Voo">Cancelamento de Voo</option>
          <option value="Overbooking">Overbooking</option>
          <option value="Outros">Outros</option>
        </select>
        <input v-if="form.motivo === 'Outros'" v-model="form.motivo_outro" type="text" class="w-full p-2 border rounded mt-2" placeholder="Descreva o motivo" />
      </div>
      
      <div v-if="step === 2">
        <h3 class="text-lg font-medium">Informações Adicionais</h3>
        <label class="block mt-4">Número do Voo</label>
        <input v-model="form.num_voo" type="text" class="w-full p-2 border rounded" />
        <label class="block mt-4">Data do Voo</label>
        <input v-model="form.dta_voo" type="date" class="w-full p-2 border rounded" />
        <label class="block mt-4">Detalhes do Ocorrido</label>
        <textarea v-model="form.detalhe" class="w-full p-2 border rounded"></textarea>
      </div>
      
      <div v-if="step === 3">
        <h3 class="text-lg font-medium">Envio de Documentos</h3>
        <label class="block mt-4">Registro Nacional</label>
        <input type="file" @change="handleFileUpload($event, 'registro_nasc')" class="w-full p-2 border rounded" />
        <label class="block mt-4">Comprovante de Residência</label>
        <input type="file" @change="handleFileUpload($event, 'comprovante_res')" class="w-full p-2 border rounded" />
        <label class="block mt-4">Cópia da Passagem Aérea</label>
        <input type="file" @change="handleFileUpload($event, 'comprovante_voo')" class="w-full p-2 border rounded" />
      </div>
      
      <div v-if="step === 4">
        <h3 class="text-lg font-medium">Informações Pessoais</h3>
        <label class="block mt-4">Nome</label>
        <input v-model="form.nome" type="text" class="w-full p-2 border rounded" />
        <label class="block mt-4">Email</label>
        <input v-model="form.email" type="email" class="w-full p-2 border rounded" />
        <label class="block mt-4">CPF</label>
        <input v-model="form.cpf" type="text" class="w-full p-2 border rounded" />
        <label class="block mt-4">Telefone</label>
        <input v-model="form.telefone" type="text" class="w-full p-2 border rounded" />
      </div>
      
      <div class="mt-6 flex justify-between">
        <button v-if="step > 1" @click="step--" class="bg-gray-400 text-white px-4 py-2 rounded">Voltar</button>
        <button v-if="step < 4" @click="step++" class="bg-blue-500 text-white px-4 py-2 rounded">Próximo</button>
        <button v-if="step === 4" @click="submitForm" class="bg-green-500 text-white px-4 py-2 rounded">Enviar</button>
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
        telefone: ''
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

