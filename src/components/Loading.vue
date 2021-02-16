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
              Wird geladen
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
  name: "Loading",

  created() {},

  data() {
    return {};
  },

  props: {},

  methods: {},
};
</script>
