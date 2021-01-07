<template>
  <div>
    <!-- Header -->
    <div>
      <div class="flex justify-between">
        <a class="text-primary mt-3 mx-6 font-cfont p-3 rounded-full" href=""
          >Zurück</a
        >
        <a
          class="text-primary mt-3 mx-6 font-cfont p-3 rounded-full"
          @click="goBack"
          >Logout</a
        >
      </div>

      <div class="rounded-full flex justify-center items-center">
        <div v-if="status === 1" class="flex">
          <div
            class="p-1 my-auto mr-2 bg-green-700 rounded-full animate-pulse"
          ></div>
          <p class="font-cfont">Diese Wahl wurde noch nicht gestartet</p>
        </div>

        <div v-if="status === 2" class="flex">
          <div
            class="p-1 my-auto mr-2 bg-red-500 rounded-full animate-ping"
          ></div>
          <p class="font-cfont">Diese Wahl ist aktiv</p>
        </div>

        <div v-if="status === 3" class="flex">
          <div
            class="p-1 my-auto mr-2 bg-yellow-500 rounded-full animate-ping"
          ></div>
          <p class="font-cfont">Diese Wahl ist pausiert</p>
        </div>

        <div v-if="status === 4" class="flex">
          <div
            class="p-1 my-auto mr-2 bg-green-700 rounded-full animate-pulse"
          ></div>
          <p class="font-cfont">Diese Wahl ist abgeschlossen</p>
        </div>
      </div>

      <div class="pt-10 flex justify-center">
        <p class="text-primary font-cfont font-bold text-5xl">
          {{ name }}
        </p>
      </div>
      <div class="p-10 flex justify-center">
        <h1 class="text-secondary-200 font-cfont">
          {{ description }}
        </h1>
      </div>
    </div>

    <!-- Content -->
    <div>
      <div
        class="flex flex-col lg:flex-row lg:justify-items-stretch lg:justify-center"
      >
        <!-- Election Settings -->
        <div class="electioncard">
          <h2 class="font-semibold font-cfont text-xl">Allgemein</h2>

          <div class="flex justify-between items-center mt-4">
            <p class="font-cfont font-semibold text-lg">{{ name }}</p>
            <hover-tip tipText="Name bearbeiten"
              ><div>
                <svg
                  class="h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg></div
            ></hover-tip>
          </div>
          <div class="flex justify-between items-center mt-2">
            <p class="font-cfont text-sm">{{ description }}</p>
            <hover-tip tipText="Beschreibung bearbeiten"
              ><div>
                <svg
                  class="h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg></div
            ></hover-tip>
          </div>

          <div class="flex justify-between items-center mt-6">
            <p class="font-cfont text-sm">Wahl erstellt am</p>
            <p class="font-cfont text-md font-semibold">{{ creation_date }}</p>
          </div>

          <div class="flex justify-between items-center mt-2">
            <p class="font-cfont text-sm">Wahl gestartet am</p>
            <p class="font-cfont text-md font-semibold">{{ start_date }}</p>
          </div>

          <div class="flex justify-between items-center mt-2">
            <p class="font-cfont text-sm">Wahl beendet am</p>
            <p class="font-cfont text-md font-semibold">{{ end_date }}</p>
          </div>
        </div>

        <!-- Election Voters -->
        <div class="electioncard">
          <h2 class="font-semibold font-cfont text-xl">Wähler</h2>
          <div class="flex justify-between items-center">
            <p class="font-cfont text-sm">xx Wähler insgesamt</p>

            <hover-tip tipText="Wähler hinzufügen">
              <svg
                class="h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
            ></hover-tip>
          </div>

          <!-- Voters Box -->
          <div class="max-h-60 bg-white overflow-y-auto overflow-x-auto mt-4">

            <div class="flex justify-between items-center px-4 py-2 border-gray-600 border m-2 rounded-full bg-gray-100 shadow-lg">
              <p class="font-cfont text-sm overflow-auto mr-4">ddffffffffffffffffffffffffffffffffffffffffd</p>
<hover-tip tipText="Diesen Wähler entfernen">
              <svg class="h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg></hover-tip>



            </div>

            <p>ffffff</p>
            <p>ffffff</p><p>ffffff</p>
            <p>ffffff</p>
            <p>ffffff</p>
            <p>ffffff</p>
            <p>ffffff</p>
            <p>ffffff</p>
            <p>ffffff</p>
            <p>ffffff</p><p>ffffff</p>

            <p>ffffff</p>
            <p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p>

           
          </div>

        </div>

        <!-- Election Options -->
        <div class="electioncard">
          <h2 class="font-semibold font-cfont text-xl">Wahloptionen</h2>
          <div class="flex justify-between items-center">
            <p class="font-cfont text-sm">xx Optinen insgesamt</p>

            <hover-tip tipText="Option hinzufügen">
              <svg
                class="h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
            ></hover-tip>
          </div>

          <!-- Options Box -->
          <div class="max-h-60 bg-white overflow-y-auto overflow-x-auto mt-4">

            <div class="flex justify-between items-center px-4 py-2 border-gray-600 border m-2 rounded-full bg-gray-100 shadow-lg">
              <p class="font-cfont text-sm overflow-auto mr-4">Ja</p>
<hover-tip tipText="Diese Option entfernen">
              <svg class="h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg></hover-tip>



            </div>

            <p>ffffff</p>
            <p>ffffff</p><p>ffffff</p>
            <p>ffffff</p>
            <p>ffffff</p>
            <p>ffffff</p>
            <p>ffffff</p>
            <p>ffffff</p>
            <p>ffffff</p>
            <p>ffffff</p><p>ffffff</p>

            <p>ffffff</p>
            <p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p><p>ffffff</p>

           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, onUpdated, onUnmounted } from "vue";
import HoverTip from "../components/HoverTip.vue";
export default {
  name: "Election",
  components: {
    "hover-tip": HoverTip,
  },
  created() {},
  data() {
    return {
      id: null,
      status: null, //1: not started 2: running 3: paused 4: closed
      name: null,
      description: null,
      paused: null,
      voters: null,
      voted: null,
      creation_date: "27-05-2020 19:00",
      start_date: null,
      end_date: null,
      votable: null,
      options: null,
      results: null,
    };
  },
  props: {},
  beforeMount() {
    if (this.$route.query.id === undefined) {
      this.$router.push({ name: "Admin" });
    }

    this.id = this.$route.query.id;

    //api call

    //check if election is valid

    //write in variables

    this.name = "ggg";
    this.description = "lorem ipsum";

    //determine status
    this.status = 3;
  },

  mounted() {},

  methods: {
    goBack: function () {
      this.$router.go(-1);
    },
  },
};
</script>
