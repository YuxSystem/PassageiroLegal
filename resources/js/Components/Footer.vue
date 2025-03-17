<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
    canLogin: {
        type: Boolean,
    },
    canRegister: {
        type: Boolean,
    },
    laravelVersion: {
        type: String,
        required: true,
    },
    phpVersion: {
        type: String,
        required: true,
    },
});

</script>

<template>
    <footer class="py-16 text-sm text-black dark:text-white/70">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <!-- Coluna 1 -->
            <div>
                <h5 class="text-lg font-semibold mb-4 sr-only">Passageiro Legal</h5>
                <ul>
                    <li>
                        <img src="/assets/logoVertical.png" alt="Logo">
                    </li>
                </ul>

                <h5 class="text-lg font-semibold mb-4 sr-only">Bem vindo</h5>
                <Link v-if="$page.props.auth.user" :href="route('dashboard')" class="text-sm/6 font-semibold text-gray-900">
                <ul>
                    <li>
                        <div class="flex items-center gap-x-6">
                        <img class="size-16 rounded-full" :src="$page.props.auth.user.profile_photo_url" alt="">
                        <div>
                            <h3 class="text-base/7 font-semibold tracking-tight text-gray-900">{{ $page.props.auth.user.name }}</h3>
                            <p class="text-sm/6 font-semibold text-indigo-600">Co-Founder / CEO</p>
                        </div>
                        </div>
                    </li>
                </ul>
                
                </Link>
            </div>
            <!-- Coluna 2 -->
            <div>
                <h5 class="text-lg font-semibold mb-4">Seus Direitos</h5>
                <ul>
                    <li class="mb-2"><a href="/direito-passageiros" class="hover:underline">Direito dos Passageiros aéreos</a></li>
                    <li class="mb-2"><a href="/indenizacao-atraso" class="hover:underline">Indenização por atraso de voo</a></li>
                    <li class="mb-2"><a href="/indenizacao-cancelamento" class="hover:underline">Indenização por cancelamento de voo</a></li>
                    <li class="mb-2"><a href="/perda-conexao" class="hover:underline">Receba por perda de conexão</a></li>
                    <li class="mb-2"><a href="/indenizacao-overbooking" class="hover:underline">Indenização Overbooking</a></li>
                    <li class="mb-2"><a href="/indenizacao-bagagem" class="hover:underline">Indenização por atraso de bagagem</a></li>
                    <li class="mb-2"><a href="/indenizacao-greve" class="hover:underline">Indenização por greve de companhia aérea</a></li>
                    <li class="mb-2"><a href="/reembolso-voo" class="hover:underline">Reembolso de voo</a></li>
                </ul>

                <h5 class="text-lg font-semibold mb-4">Empresas e Operação</h5>
                <ul>
                    <li class="mb-2"><a href="/aeroportos" class="hover:underline">Aeroportos</a></li>
                    <li class="mb-2"><a href="/companhias-aereas" class="hover:underline">Companhia Aérea</a></li>
                </ul>
            </div>
            <!-- Coluna 3 -->
            <div>
                <h5 class="text-lg font-semibold mb-4">Suporte</h5>
                <ul>
                    <li class="mb-2"><a href="/ajuda" class="hover:underline">Central de Ajuda</a></li>
                    <li class="mb-2"><a href="/faq" class="hover:underline">F.A.Q</a></li>
                    <li class="mb-2"><a href="/fale-conosco" class="hover:underline">Fale Conosco</a></li>
                    <li class="mb-2"><a href="/termos-condicoes" class="hover:underline">Termos & Condições</a></li>
                    <li class="mb-2"><a href="/politica-privacidade" class="hover:underline">Politica de Privacidade</a></li>
                    <li class="mb-2"><a href="/cookies" class="hover:underline">Cookies</a></li>
                </ul>
            </div>
            <!-- Coluna 4 -->
            <div>
                <h5 class="text-lg font-semibold mb-4">Nossa Empresa</h5>
                <ul>
                    <li class="mb-2"><a href="/sobre" class="hover:underline">Sobre nós</a></li>
                    <li class="mb-2"><a href="/blog" class="hover:underline">Blog</a></li>
                    <li class="mb-2"><a href="/imprensa" class="hover:underline">Imprensa</a></li>
                    <li class="mb-2"><a href="/carreira" class="hover:underline">Carreira</a></li>
                    <li class="mb-2"><a href="/parceiro-juridico" class="hover:underline">Parceiro Jurídico</a></li>
                    <li class="mb-2"><a href="/para-companhias" class="hover:underline">Para companhias aéreas</a></li>
                </ul>
            </div>
            <!-- Coluna 5 -->
            <div>
                <h5 class="text-lg font-semibold mb-4">Indique uma pessoa</h5>
                <div class="border border-gray-300 rounded-xl p-4">
                    <div class="max-w-xl lg:max-w-lg">
                        <h2 class="text-xl font-semibold tracking-tight">Reclamações por atraso, cancelamento ou extravio de bagagem?</h2>
                        <p class="mt-4 text-sm text-gray-400">Uma simples indicação pode ser o começo de uma grande solução. Compartilhe!</p>
                        <div class="mt-6 flex max-w-md gap-x-4">
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="email-address" name="email" type="email" autocomplete="email" required class="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder="Digite o contato">
                        <button type="submit" class="flex-none rounded-md bg-indigo-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Indicar</button>
                        </div>
                        <p class="mt-4 text-xs text-gray-400"><i>Email, Telefone ou WhatsApp</i></p>
                    </div>                    
                </div>
                <h5 class="text-lg font-semibold mb-4 mt-5">Siga nossas redes sociais!</h5>
                <ul class="flex space-x-4">
                    <li><a href="#" class="text-sm hover:text-gray-400"><i class="bi bi-facebook"></i> Facebook</a></li>
                    <li><a href="#" class="text-sm hover:text-gray-400"><i class="bi bi-twitter-x"></i> Twitter</a></li>
                    <li><a href="#" class="text-sm hover:text-gray-400"><i class="bi bi-instagram"></i> instagram</a></li>
                </ul>
            </div>
        </div>
            <div class="border-t border-gray-700 mt-6 pt-4 text-center">
                <p class="text-sm">© 2024 Passageiro Legal. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>
</template>
