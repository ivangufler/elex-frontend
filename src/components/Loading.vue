<template>
  <div>
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0  bg-gray-100 opacity-75"></div>
        </div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="inline-block overflow-hidden transform transition-all my-8 align-middle max-w-lg w-full h-64 "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="w-full h-full flex flex-col items-center justify-center">
            <div class="flex justify-center items-center">
             
            <div
              class="h-6 w-6 bg-primary border-primary  border-4 flex justify-center items-center animate-spin  rounded-md mx-5"
            >
            
            </div>
            </div>
           <div class="flex justify-center items-center mt-5">
              <div class="text-center font-cfont text-md text-gray-700" >
              Wird geladen<br>Bitte Warten 
            </div>
            <div>
              <svg class="h-7 ml-4 animate-bounce text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
</svg>
            </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>
