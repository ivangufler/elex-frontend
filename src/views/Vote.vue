<template>
  <div>
    <div class="flex flex-col justify-center items-center">
      <h1>{{ $route.params.token }}</h1>

      <span class="text-black font-semibold text-lg mt-5">Wahl zum Presi</span>
      <p class="m-5 font-cfont mt-4 text-gray-500 text-sm">Lorem Ipsum</p>

      <h1 class="text-primary text-5xl mt-4 font-cfont font-bold mx-5">
        Jetzt Abstimmen
      </h1>
    </div>

    <p class="m-5 font-cfont mt-4 text-gray-500 text-sm">
      Bei dieser Abstimmung haben Sie 1 Vorzugsstimme. Sie können auch weiß
      abgeben. Nach dem Klicken auf Abstimmen wird sich ein Fenster öffnen bei
      dem Sie Ihre Wahl bestätigen müssen. <br />
      Die Wahl erfolgt anonym und es sin keine Rückschlüsse auf Ihre Person
      möglich
    </p>

    <!--  Wenn nur 2 Optionen -->

    <div>

      <div class="flex flex-row">
        
         <label class="hover:bg-gray-300 transition-colors duration-300 font-cfont flex-grow m-5 py-8 rounded-lg shadow-xl overflow-auto p-5 bg-gray-200 text-center "
>
            <input type="checkbox" >
            Nein
          </label>

        
          <label class="hover:bg-gray-300 transition-colors duration-300 font-cfont flex-grow m-5 py-8 rounded-lg shadow-xl overflow-auto p-5 bg-gray-200 text-center "
>
            <input type="checkbox" >
            Nein
          </label>
        

        
      </div>
    </div>

    <!--  Wenn nicht 2 Optionen -->

    <div>

    </div>

    <div class="flex justify-end">
      <div>
        <button @click="vote" class="bg-primary p-3 text-white font-cfont rounded-full m-5 text-lg font-semibold transform hover:scale-110 duration-500" type="button">Abstimmen</button>
      </div>
    </div>




<!-- Allert-->
<div id="panel" class="hidden fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    
    <div class="fixed inset-0 transition-opacity" aria-hidden="true">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>

    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    
    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
          
            <svg class="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
</svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg font-cfont leading-6 font-medium text-gray-900" id="modal-headline">
              Stimme Abgeben
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500 font-cfont">
                WText Text Text 
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm">
          Wählen
        </button>
        <button @click="vote" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Zurück
        </button>
      </div>
    </div>
  </div>
</div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      panel: false,

    }
  },
  methods: {
    vote: function () {
      if (this.panel) { 
        document.getElementById("panel").classList.add("hidden");
        this.panel = false;
      } else {
        document.getElementById("panel").classList.remove("hidden");

        this.panel = true;
      }
    },
  },
}
</script>
