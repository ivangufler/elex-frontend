<template>
  <div>
    <div class="hidden lg:flex lg:justify-center lg:items-center lg:h-44 mb-12">
      <img class="h-24 mr-4" src="../assets/elex.png" />
      <div class="flex flex-col items-end">
        <span class="font-black font-cfont text-6xl text-primary">ELEX</span>
        <span class="text-md font-cfont text-gray-800">vote digital</span>
      </div>
    </div>

    <div class="relative bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto lg:ml-12">
        <div
          class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"
        >
          <svg
            class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div class="relative pt-6 px-4 sm:px-6 lg:px-8">
            <nav
              class="relative flex items-center justify-between sm:h-10 lg:justify-start"
              aria-label="Global"
            >
              <div
                class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0"
              >
                <div class="flex items-center justify-between w-full md:w-auto">
                  <a href="#" class="flex items-center">
                    <img class="h-8 w-auto sm:h-10" src="../assets/elex.png" />
                    <span
                      class="lg:hidden font-bold font-cfont text-2xl ml-4 text-primary"
                      >ELEX</span
                    >
                  </a>
                  <div class="-mr-2 flex items-center md:hidden"></div>
                </div>
              </div>
              <div class="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                <a
                  href="#"
                  class="font-medium text-gray-500 hover:text-gray-900 font-cfont"
                  >Funktionen</a
                >

                <a
                  href="#"
                  class="font-medium text-gray-500 hover:text-gray-900 font-cfont"
                  >Tutorials</a
                >
              </div>
            </nav>
          </div>

          <main
            class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
          >
            <div class="sm:text-center lg:text-left">
              <h1
                class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
              >
                <span class="block xl:inline font-cfont">Online Wahlen</span>
                <span class="block text-primary font-cfont"
                  >Sicher und einfach</span
                >
              </h1>
              <p
                class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-cfont"
              >
                Ein einfaches Tool zum Abhalten anonymer und sicherer Wahlen
                online.
              </p>
              <div
                class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
              >
                <div class="rounded-md shadow">
                  <a
                    href="#"
                    class="font-cfont w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-opacity-70 md:py-4 md:text-lg md:px-10"
                  >
                    Transparenz Hinweise
                  </a>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="http://localhost:8000/auth/login/azuread-tenant-oauth2/"
                    class="font-cfont w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-gray-200 hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
                  >
                    Login
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { vShow } from "vue";
export default {
  methods: {
    close() {
      document.getElementById("menu").classList.add("hidden");
    },

    show() {
      document.getElementById("menu").classList.remove("hidden");
    },
  },
};
</script>
