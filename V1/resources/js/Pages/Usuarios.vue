<template>
  <div>
    <h3 class="text-lg font-semibold">Usuários</h3>
    <table class="min-w-full mt-4 table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2 text-left">Nome</th>
          <th class="px-4 py-2 text-left">Email</th>
          <th class="px-4 py-2 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border px-4 py-2">João Silva</td>
          <td class="border px-4 py-2">joao@email.com</td>
          <td class="border px-4 py-2">Ativo</td>
        </tr>
        <tr>
          <td class="border px-4 py-2">Maria Oliveira</td>
          <td class="border px-4 py-2">maria@email.com</td>
          <td class="border px-4 py-2">Inativo</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Usuarios',
};
</script>
