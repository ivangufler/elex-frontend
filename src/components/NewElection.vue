<template>
  <div class="p-5 m-5 rounded-lg shadow-xl bg-gray-100">
    <div class="flex justify-center items-center">
      <h2 class="font-cfont font-bold text-3xl my-3 " >Neue Wahl erstellen</h2>
    </div>

    <div class="h-60 bg-white m-3 rounded-xl flex flex-col justify-evenly items-center">
      
      <div class="flex flex-col">
        <div  class="font-cfont text-center">Name der Wahl:</div>
        <input @keyup.enter="name.trim().length === 0 ? null: save()" v-model="name" placeholder="Name eingeben" type="text" class="outline-none text-center font-cfont font-semibold md:text-3xl">
      </div>
      
       <div class="flex flex-col">
        <div  class="font-cfont text-center">Beschreibung der Wahl:</div>
        <input @keyup.enter="name.trim().length === 0 ? null: save()" v-model="description" placeholder="Beschreibung eingeben" type="text" class="text-center outline-none font-cfont font-semibold md:text-xl">
      </div>

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
        class="flex justify-center items-center p-3 font-cfont text-white bg-primary rounded-full 
          hover:bg-secondary-200 hover:shadow-xl hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        @click="save" :disabled="name.trim().length === 0"
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
import Service from "../election.js";

export default {
  name: "NewElection",

  created() {},

  data() {
    return {
      name: '',
      description: '',
    };
  },

  props: {},

  methods: {
    cancel() {
      this.$router.go(-1);
    },

    save() {
      Service.createElection({name: this.name.trim(), description: this.description.trim()})
        .then(id => this.$router.push({ name: 'ElectionDetail', params: { id: id } }))
        .catch();
    },
  },
};
</script>