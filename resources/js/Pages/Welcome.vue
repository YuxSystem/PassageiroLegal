<script setup>
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import Footer from '@/Components/Footer.vue';

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

// Estado para o menu mobile
const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
    isMenuOpen.value = false;
};
</script>

<template>
    <main class="mt-6">
        <div class="bg-white">
            <!-- Navbar -->
            <header class="absolute inset-x-0 top-0 z-50 bg-white shadow-md">
                <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div class="flex lg:flex-1">
                        <a href="#" class="-m-1.5 p-1.5">
                            <img src="/assets/logoHorizontal.png" alt="Logo">
                        </a>
                    </div>

                    <!-- Botão Menu Mobile -->
                    <div class="flex lg:hidden">
                        <button @click="toggleMenu" type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                            <span class="sr-only">Open main menu</span>
                            <svg v-if="!isMenuOpen" class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg v-else class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Menu Desktop -->
                    <div class="hidden lg:flex lg:gap-x-12">
                        <a href="#" class="text-sm font-semibold text-gray-900 hover:text-gray-700">Obter compensação</a>
                        <a href="#" class="text-sm font-semibold text-gray-900 hover:text-gray-700">Reserve suas viagens</a>
                        <a href="#" class="text-sm font-semibold text-gray-900 hover:text-gray-700">Conheça seus direitos</a>
                        <a href="#" class="text-sm font-semibold text-gray-900 hover:text-gray-700">Sobre nós</a>
                    </div>

                    <!-- Área de Login -->
                    <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                        <nav v-if="canLogin">
                            <Link v-if="$page.props.auth.user" :href="route('dashboard')" class="text-sm border border-gray-300 p-3 rounded-xl font-semibold text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                                Olá, {{ $page.props.auth.user.name }}
                            </Link>

                            <template v-else>
                                <Link :href="route('login')" class="text-sm font-semibold text-gray-900 py-3 px-3 rounded-xl mr-3 hover:bg-gray-100">
                                    Log in <span aria-hidden="true">&rarr;</span>
                                </Link>

                                <Link v-if="canRegister" :href="route('register')" class="text-sm font-semibold bg-indigo-900 hover:bg-indigo-800 text-white py-3 px-3 rounded-xl">
                                    Registrar
                                </Link>
                            </template>
                        </nav>
                    </div>
                </nav>

                <!-- Menu Mobile -->
                <div v-if="isMenuOpen" class="fixed inset-0 z-50 bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div class="flex items-center justify-between">
                        <a href="#" class="-m-1.5 p-1.5">
                            <span class="sr-only">Your Company</span>
                            <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Logo">
                        </a>
                        <button @click="closeMenu" type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
                            <span class="sr-only">Close menu</span>
                            <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="mt-6">
                        <a href="#" class="block py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Obter compensação</a>
                        <a href="#" class="block py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Reserve suas viagens</a>
                        <a href="#" class="block py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Conheça seus direitos</a>
                        <a href="#" class="block py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Sobre nós</a>
                        <div class="mt-4">
                            <nav v-if="canLogin">
                                <Link v-if="$page.props.auth.user" :href="route('dashboard')" class="block py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                                    Olá, {{ $page.props.auth.user.name }}
                                </Link>

                                <template v-else>
                                    <Link :href="route('login')" class="block py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                                        Log in <span aria-hidden="true">&rarr;</span>
                                    </Link>

                                    <Link v-if="canRegister" :href="route('register')" class="block py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                                        Register
                                    </Link>
                                </template>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Hero Section-->
            <div class="bg-white">
            <div class="mx-auto max-w-8xl sm:px-6 sm:py-32 lg:px-8">
                <div class="relative isolate overflow-hidden px-6 pt-16 sm:px-16 md:pt-24 lg:flex lg:gap-x-40 lg:px-24 lg:pt-0">                
                <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                    <h1 class="text-2xl font-semibold tracking-tight text-balance sm:text-6xl text-indigo-800">Algum voo seu foi cancelado ou atrasado?</h1>
                    <p class="mt-6 text-lg/8 text-gray-400">Receba até <strong>R$10.000 de indenisação</strong> por passageiro, seja qual for o preço da passagem. Você só paga se ganhar.</p>
                    <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                        <Link :href="route('register')" class="bg-indigo-900 rounded-lg block py-2 p-6 text-base font-semibold text-white hover:bg-indigo-800">
                            Verificar Elegibilidade
                        </Link>
                    </div>
                </div>
                <div class="relative mt-16 h-30 lg:mt-8">
                    <img class="absolute top-0 left-0 w-[60rem] max-w-none rounded-xl" src="assets/passageira.jpg" alt="Passageira viajando" width="1824" height="1080">
                </div>
                </div>
            </div>
            </div>

            <!-- Indicação de Pessoas -->

            <!-- Dados -->
            <div class="relative isolate overflow-hidden bg-gray-200 py-10 sm:py-10">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto max-w-8xl lg:mx-0">
                <p class="mt-8 text-lg font-medium text-indigo-800 sm:text-xl/8 text-center">ESPECIALISTA EM DIREITOS DO PASSAGEIRO AÉREO.</p>
                </div>
                <div class="mx-auto mt-10 max-w-2xl text-center lg:mx-0 lg:max-w-none">
                <dl class="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                    <div class="flex flex-col-reverse gap-1">
                    <dt class="text-base/7 text-indigo-800">De clientes indenizados</dt>
                    <dd class="text-4xl font-semibold tracking-tight text-indigo-800">2,5<span class="text-yellow-500">+</span> Milhões</dd>
                    </div>
                    <div class="flex flex-col-reverse gap-1">
                    <dt class="text-base/7 text-indigo-800">Voos registrados</dt>
                    <dd class="text-4xl font-semibold tracking-tight text-indigo-800">180<span class="text-yellow-500">+</span> Milhões</dd>
                    </div>
                    <div class="flex flex-col-reverse gap-1">
                    <dt class="text-base/7 text-indigo-800">No mercado</dt>
                    <dd class="text-4xl font-semibold tracking-tight text-indigo-800">5<span class="text-yellow-500">+</span> Anos</dd>
                    </div>
                    <div class="flex flex-col-reverse gap-1">
                    <dt class="text-base/7 text-indigo-800">Avaliações</dt>
                    <dd class="text-4xl font-semibold tracking-tight text-indigo-800">156.000<span class="text-yellow-500">+</span></dd>
                    </div>
                </dl>
                </div>
            </div>
            </div>

            <!-- Parceiros -->
            <div class="relative isolate overflow-hidden py-10 sm:py-10">
            <div class="mx-auto max-w-7xl rounded-xl shadow bg-gray-50 px-6 p-3 lg:px-8">
                <div class="mx-auto max-w-8xl lg:mx-0">
                <p class="mt-8 text-lg font-medium text-indigo-800 sm:text-xl/8 text-center">O PASSAGEIRO LEGAL PROTEGE O DIREITO DO PASSAGEIRO AÉREO.</p>
                </div>
                <div class="mx-auto mt-10 max-w-2xl text-center lg:mx-0 lg:max-w-none">
                <dl class="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
                    <div class="flex flex-col-reverse gap-1">
                    <dt class="text-base/7 text-indigo-800">Código de defesa do consumidor</dt>
                    <img src=/assets/Brasil.png alt="Bandeira Brasil" class="mx-auto" width="80">
                    </div>
                    <div class="flex flex-col-reverse gap-1">
                    <dt class="text-base/7 text-indigo-800">Resolução N° 400 da ANAC</dt>
                    <img src=/assets/Anac.png alt="Bandeira Anac" class="mx-auto" width="80">
                    </div>
                    <div class="flex flex-col-reverse gap-1">
                    <dt class="text-base/7 text-indigo-800">Convenção de montreal (ICAO)</dt>
                    <img src=/assets/Icao.png alt="Bandeira Icao" class="mx-auto" width="80">
                    </div>
                </dl>
                </div>
            </div>
            </div>

            <!-- Benefícios -->
            <div class="py-24 sm:py-32">
            <div class="mx-auto grid max-w-7xl p-20 bg-gray-900 rounded-xl">
                <div class="p-6 text-center"><img src=/assets/LogoEscritaBranca.png alt="Logo Escrita" class="mx-auto" width="200"></div>
            <div class="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
                <div class="max-w-xl">
                <img src=/assets/Viajante.jpg alt="Viajante" class="mx-auto rounded-full shadow" width="300">
                </div>
                <ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                <li>
                    <div class="flex items-center gap-x-6">
                        <p class="mt-6 text-lg/8 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white inline-block mr-2">
                                <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                            € 100 por problema com voo
                        </p>
                    </div>
                </li>
                <li>
                    <div class="flex items-center gap-x-6">
                        <p class="mt-6 text-lg/8 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white inline-block mr-2">
                                <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                            Acesso à sala VIP durante um problema
                        </p>
                    </div>
                </li>
                <li>
                    <div class="flex items-center gap-x-6">
                        <p class="mt-6 text-lg/8 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white inline-block mr-2">
                                <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                            Assistência 24 horas, todos os dias
                        </p>
                    </div>
                </li>
                <li>
                    <div class="flex items-center gap-x-6">
                        <p class="mt-6 text-lg/8 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white inline-block mr-2">
                                <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                            € 100 por perda ou atraso de mala
                        </p>
                    </div>
                </li>
                <li>
                    <div class="flex items-center gap-x-6">
                        <p class="mt-6 text-lg/8 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white inline-block mr-2">
                                <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                            Nenhuma taxa cobrana da sua indenização
                        </p>
                    </div>
                </li>
                <li>
                    <div class="flex items-center gap-x-6">
                        <button class="mt-6 text-lg text-indigo-800 bg-yellow-50 py-3 px-8 rounded-xl hover:bg-yellow-100">Verificar Elegibilidade</button>
                    </div>
                </li>

                </ul>
            </div>
            </div>
            </div>

        </div>
    </main>

    <Footer />
</template>
