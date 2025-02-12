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
                            <span class="sr-only">Your Company</span>
                            <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Logo">
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

                                <Link v-if="canRegister" :href="route('register')" class="text-sm font-semibold bg-green-600 hover:bg-green-500 text-white py-3 px-3 rounded-xl">
                                    Register
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

            <!-- Conteúdo Principal -->
            <div class="relative isolate px-6 pt-24 lg:px-8">
                <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
                    <h1 class="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                        Data to enrich your online business
                    </h1>
                    <p class="mt-8 text-lg text-gray-500 sm:text-xl">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                    </p>
                    <div class="mt-10 flex items-center justify-center gap-x-6">
                        <a href="#" class="bg-indigo-600 px-4 py-2 text-white rounded-md font-semibold hover:bg-indigo-500">Get started</a>
                        <a href="#" class="text-sm font-semibold text-gray-900">Learn more →</a>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <Footer />
</template>
