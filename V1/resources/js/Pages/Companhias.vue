<template>
  <div>
    <h3 class="text-lg font-semibold">Companhias Aéreas</h3>
    <table class="min-w-full mt-4 table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2 text-left">Nome</th>
          <th class="px-4 py-2 text-left">Código</th>
          <th class="px-4 py-2 text-left">País</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border px-4 py-2">Companhia 1</td>
          <td class="border px-4 py-2">ABC123</td>
          <td class="border px-4 py-2">Brasil</td>
        </tr>
        <tr>
          <td class="border px-4 py-2">Companhia 2</td>
          <td class="border px-4 py-2">XYZ456</td>
          <td class="border px-4 py-2">EUA</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Companhias',
};
</script>
