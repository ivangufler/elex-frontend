<template>
  <div class="p-5 m-2 rounded-lg shadow-lg">
    <div class="flex justify-center items-center">
      <h2 class="font-cfont font-bold text-3xl" >Neue Wahl erstellen</h2>
    </div>

    <div class="h-96 bg-blue-300 m-3">
      <!--Content here-->
    </div>

    <div class="flex w-full justify-end items-center">
      <button
        class="mr-2 flex justify-center items-center p-3 font-cfont bg-secondary-100 rounded-full hover:bg-secondary-200 hover:shadow-xl hover:text-white"
        @click="cancel"
      >
        <svg
                class="h-6 pr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
        Abbrechen
      </button>
      <button
        class="flex justify-center items-center p-3 font-cfont text-white bg-primary rounded-full hover:bg-secondary-200 hover:shadow-xl hover:text-white"
        @click="save"
      >
        <svg
                class="h-6 pr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
        Speichern
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewElection",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {
    cancel: function () {
      this.$router.go(-1);
    },
    save: function () {
      this.$router.push({ name: "Admin" });
    },
  },
};
</script>