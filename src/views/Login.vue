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

    <div class="h-5"><p class="pl-5 text-sm text-red-700">{{errUser}}</p></div>
    
    <div class="flex items-center mt-4">
      
      <input
        id="passInput"
        @blur="validatePassword"
        @keypress="validate"
        v-model="password"
        class="font-cfont  px-5 py-3 focus:border-gray-600 border-gray-400 border-2 focus:shadow-lg focus:outline-none rounded-full"
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

    <div class="h-5"><p class="pl-5 text-sm text-red-700">{{errPass}}</p></div>

    <div class="flex justify-between">
      
      <svg @click="back" class="hover:text-grey-600 cursor-pointer transform hover:scale-125 translate ease-in w-6 mx-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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
</template>

<script>
import { resolveTransitionHooks } from 'vue';
export default {

  data(){
    return{
      username: '',
      password: '',
      errPass: '',
      errUser: '',
      fatalError: '',
    }
  },

  methods: {
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

    validate: function(){
      if(this.username != '' && this.password != '' && this.errPass === '' && this.errUser === ''){
        document.getElementById('submitButton').removeAttribute('disabled')         
      }else{
        document.getElementById('submitButton').setAttribute('disabled', true)    
        console.log('hhh')
      }
    },

    validatePassword: function() {
      if(this.password === ''){
        this.errPass='Bitte Password eingeben'
      }
      else{
        this.errPass='';
      }
      this.validate();
    },

    validateUsername: function() {
       if(this.username === ''){
        this.errUser='Bitte Benutzername eingeben'
      }
      else{
        this.errUser='';
      }
      this.validate();
    },

    login: function () {

      this.validate();

      //here will come the api call

      //this if is later after the api call and checks if the user is valid
      if(false){
        
      }
      else{
         //route if the user is valid
      this.$router.push({ name: "Admin" });
      }
     
    },

    back: function(){
      this.$router.back();
    }
  },
};
</script>