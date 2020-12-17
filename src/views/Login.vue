<template>
  <div class="flex items-center flex-col">
    <h1 class="mt-20 text-primary font-cfont text-3xl">Login</h1>
    <p class="text-secondary-100 text-center mt-3 mb-6 font-cfont">
      Bitte melden Sie sich mit Ihren LASIS Anmeldedaten an.
    </p>
    <div>
      <div class="flex items-center mt-4">
        <input
          v-model="username"
          @blur="validateUsername"
          @keypress="validate"
          class="font-cfont px-5 py-3 focus:border-gray-600 border-gray-400 border-2 focus:outline-none rounded-full focus:shadow-lg"
          placeholder="Benutzername"
          type="text"
        />
        <svg
        @click="openInfo"
          class="w-6 ml-4 text-gray-400 hover:text-gray-600 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <div class="h-5">
        <p class="pl-5 text-sm text-red-700">{{ errUser }}</p>
      </div>

      <div class="flex items-center mt-4">
        <input
          id="passInput"
          @blur="validatePassword"
          @keypress="validate"
          v-model="password"
          class="font-cfont px-5 py-3 focus:border-gray-600 border-gray-400 border-2 focus:shadow-lg focus:outline-none rounded-full"
          placeholder="Passwort"
          type="password"
        />
        <svg
          @click="passwordVisible"
          id="ico-vis"
          class="hover:text-gray-600 cursor-pointer w-6 ml-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>
        <svg
          @click="passwordHide"
          id="ico-hide"
          class="hover:text-gray-600 cursor-pointer hidden w-6 ml-4 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </div>

      <div class="h-5">
        <p class="pl-5 text-sm text-red-700">{{ errPass }}</p>
      </div>

      <div class="flex justify-between">
        <svg
          @click="back"
          class="hover:text-grey-600 cursor-pointer transform hover:scale-125 translate ease-in w-6 mx-2 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <button
          id="submitButton"
          class="disabled:opacity-50 disabled:cursor-not-allowed my-5 mx-2 px-3 font-cfont py-2 text-primary hover:bg-primary hover:text-white transition ease-in-out duration-500 border-primary border-2 rounded-full hover:shadow-lg focus:outline-none"
          @click="login"
          disabled
        >
          Anmelden
        </button>
      </div>
    </div>

    <div>
      <img src="../assets/auth.svg" class="h-96 mt-16 hidden sm:block" alt="" />
    </div>
  </div>

  <!-- This is the info block -->
  <div id="info" class="hidden fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 sm:mx-0 sm:h-10 sm:w-10"
            >
              
              <svg
                class="h-6 w-6 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                class="text-lg font-cfont leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Der LASIS Zugang
              </h3>
              <div class="mt-2">
                <p class="text-sm font-cfont text-gray-500">
                  lorem ipsum dolor sit amen
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            @click="closeInfo"
            class="font-cfont mt-3 w-full inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Schliesen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resolveTransitionHooks } from "vue";
export default {
  data() {
    return {
      username: "",
      password: "",
      errPass: "",
      errUser: "",
      fatalError: "",
    };
  },

  methods: {

    openInfo: function(){
      document.getElementById('info').classList.remove('hidden')
    },

    closeInfo: function(){
      document.getElementById('info').classList.add('hidden')
    },

    passwordVisible: function () {
      var x = document.getElementById("passInput");
      x.type = "text";
      var i = document.getElementById("ico-hide");
      i.classList.remove("hidden");
      i = document.getElementById("ico-vis");
      i.classList.add("hidden");
    },
    passwordHide: function () {
      var x = document.getElementById("passInput");
      x.type = "password";
      var i = document.getElementById("ico-vis");
      i.classList.remove("hidden");
      i = document.getElementById("ico-hide");
      i.classList.add("hidden");
    },

    validate: function () {
      if (
        this.username != "" &&
        this.password != "" &&
        this.errPass === "" &&
        this.errUser === ""
      ) {
        document.getElementById("submitButton").removeAttribute("disabled");
      } else {
        document.getElementById("submitButton").setAttribute("disabled", true);
        console.log("hhh");
      }
    },

    validatePassword: function () {
      if (this.password === "") {
        this.errPass = "Bitte Password eingeben";
      } else {
        this.errPass = "";
      }
      this.validate();
    },

    validateUsername: function () {
      if (this.username === "") {
        this.errUser = "Bitte Benutzername eingeben";
      } else {
        this.errUser = "";
      }
      this.validate();
    },

    login: function () {
      this.validate();

      //here will come the api call

      //this if is later after the api call and checks if the user is valid
      if (false) {
      } else {
        //route if the user is valid
        this.$router.push({ name: "Admin" });
      }
    },

    back: function () {
      this.$router.back();
    },
  },
};
</script>