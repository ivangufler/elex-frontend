<template>
  <div v-if="election">
    <!-- Header -->
    <div>
      <div class="flex justify-between">
        <a class="text-primary mt-3 mx-6 font-cfont p-3 rounded-full" @click="goBack()"
          >Zurück</a
        >
        <a
          class="text-primary mt-3 mx-6 font-cfont p-3 rounded-full"
          @click="null"
          >Logout</a
        >
      </div>

      <div class="rounded-full flex justify-center items-center">
        <div v-if="state === NOT_STARTED" class="flex">
          <div
            class="p-1 my-auto mr-2 bg-green-700 rounded-full animate-pulse"
          ></div>
          <p class="font-cfont">Diese Wahl wurde noch nicht gestartet</p>
        </div>

        <div v-if="state === RUNNING" class="flex">
          <div
            class="p-1 my-auto mr-2 bg-red-500 rounded-full animate-ping"
          ></div>
          <p class="font-cfont">Diese Wahl ist aktiv</p>
        </div>

        <div v-if="state === PAUSED" class="flex">
          <div
            class="p-1 my-auto mr-2 bg-yellow-500 rounded-full animate-ping"
          ></div>
          <p class="font-cfont">Diese Wahl ist pausiert</p>
        </div>

        <div v-if="state === CLOSED" class="flex">
          <div
            class="p-1 my-auto mr-2 bg-green-700 rounded-full animate-pulse"
          ></div>
          <p class="font-cfont">Diese Wahl ist abgeschlossen</p>
        </div>
      </div>

      <div class="pt-10 flex justify-center">
        <p class="text-primary font-cfont font-bold text-5xl">
          {{ election.name }}
        </p>
      </div>
      <div class="p-10 flex justify-center">
        <h1 class="text-secondary-200 font-cfont">
          {{ election.description }}
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
            <p class="font-cfont font-semibold text-lg">{{ election.name }}</p>
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
            <p class="font-cfont text-sm">{{ election.description }}</p>
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
            <p class="font-cfont text-md font-semibold">{{ $filters.formatDate(election.creation_date) }}</p>
          </div>

          <div class="flex justify-between items-center mt-2">
            <p class="font-cfont text-sm">Wahl gestartet am</p>
            <p v-if="election.start_date" class="font-cfont text-md font-semibold">
              {{ $filters.formatDate(election.start_date) }}
            </p>
            <p v-else class="font-cfont text-sm">Wahl nocht nicht gestartet</p>
          </div>

          <div class="flex justify-between items-center mt-2">
            <p class="font-cfont text-sm">Wahl beendet am</p>
            <p v-if="election.end_date" class="font-cfont text-md font-semibold">
              {{ $filters.formatDate(election.end_date) }}
            </p>
            <p v-else class="font-cfont text-sm">Wahl nocht nicht beendet</p>
          </div>
        </div>

        <!-- Election Voters -->
        <div class="electioncard">
          <h2 class="font-semibold font-cfont text-xl">Wähler</h2>
          <div class="flex justify-between items-center">
            <p class="font-cfont text-sm">{{ election.voters.length ? election.voters.length : election.voters }}
              Wähler insgesamt</p>

            <div @click="addvoters">
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
          </div>

          <!-- Voters Box -->
          <div v-if="election.voters.length" class="max-h-60 bg-white overflow-y-auto overflow-x-auto mt-4">
            <div v-for="voter in election.voters" :key="voter"
              class="flex justify-between items-center px-4 py-2 border-gray-600 border m-2 rounded-full bg-gray-100 shadow-md"
            >
              <p class="font-cfont text-sm overflow-auto mr-4">
                {{ voter }}
              </p>
              <hover-tip tipText="Diesen Wähler entfernen">
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
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  /></svg
              ></hover-tip>
            </div>
          </div>
        </div>

        <!-- Election Options -->
        <div class="electioncard">
          <h2 class="font-semibold font-cfont text-xl">Wahloptionen</h2>
          <div class="flex justify-between items-center">
            <p class="font-cfont text-sm">{{ election.options.length }} Optionen insgesamt</p>

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
            <div v-for="option in election.options" :key="option"
              class="flex justify-between items-center px-4 py-2 border-gray-600 border m-2 rounded-full bg-gray-100 shadow-lg"
            >
              <p class="font-cfont text-sm overflow-auto mr-4">{{ option }}</p>
              <hover-tip tipText="Diese Option entfernen">
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
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  /></svg
              ></hover-tip>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Voters Pannel -->
    <div id="addVoter" class="hidden fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div
          id="addVoterBg"
          class="ease-in-out duration-500 absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <section
          class="absolute inset-y-0 right-0 pl-10 max-w-full flex"
          aria-labelledby="slide-over-heading"
        >
          <div
            class="transform transition ease-in-out duration-500 sm:duration-700 relative w-screen max-w-md"
          >
            <div
              class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4"
            >
              <button
                @click="addvoters"
                class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span class="sr-only">Close panel</span>
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div
              class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll"
            >
              <div class="px-4 sm:px-6">
                <h2
                  id="slide-over-heading"
                  class="text-lg font-cfont font-medium text-gray-900"
                >
                  Wähler hinzufügen
                </h2>
              </div>
              <div class="mt-6 relative flex-1 px-4 sm:px-6">
                <!-- Replace with your content -->
                ....
                <!-- /End replace -->
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <!--End Add Voters Pannel -->

    <!-- Add Options Pannel -->
    <div id="addOptions" class="hidden fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div
          id="addVoterBg"
          class="ease-in-out duration-500 absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <section
          class="absolute inset-y-0 right-0 pl-10 max-w-full flex"
          aria-labelledby="slide-over-heading"
        >
          <div
            class="transform transition ease-in-out duration-500 sm:duration-700 relative w-screen max-w-md"
          >
            <div
              class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4"
            >
              <button
                @click="addoptions"
                class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span class="sr-only">Close panel</span>
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div
              class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll"
            >
              <div class="px-4 sm:px-6">
                <h2
                  id="slide-over-heading"
                  class="text-lg font-cfont font-medium text-gray-900"
                >
                  Wähler hinzufügen
                </h2>
              </div>
              <div class="mt-6 relative flex-1 px-4 sm:px-6">
                <!-- Replace with your content -->
                ....
                <!-- /End replace -->
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <!--End Add Options Pannel -->
  </div>
</template>

<script>
import { onBeforeMount, onMounted, onUpdated, onUnmounted } from "vue";
import HoverTip from "../components/HoverTip.vue";
import Service from "../election.js";

export default {
  name: "Election Detail",
  components: {
    "hover-tip": HoverTip,
  },
  created() {},
  data() {
    return {
      election: null,
      addVoters: false,
      addOptions: false,
    };
  },
  props: {},
  beforeMount() {

    Service.getElection(this.$route.params.id)
      .then(election => this.election = election)
      .catch(error => {
        if (error.response.status === 403)
          this.$router.push({ name: "ElectionList" });
        else
          this.$router.push({ name: "Home" });
      });

    //determine status
    this.status = 3;
  },

  created() {
    this.NOT_STARTED = 1;
    this.RUNNING = 2;
    this.PAUSED = 3;
    this.CLOSED = 4;
  },

  mounted() {},

  methods: {
    goBack: function () {
      this.$router.go(-1);
    },

    addvoters: function () {
      if (this.addVoters) {
        document.getElementById("addVoter").classList.add("hidden");
        this.addVoters = false;
      } else {
        document.getElementById("addVoter").classList.remove("hidden");

        this.addVoters = true;
      }
    },

    addptions: function () {},
  },

  computed: {

    state() {
      //not started = 1; running = 2; paused = 3; closed = 4
      if (this.election.paused)
        return this.PAUSED;

      if (this.election.end_date === null) {
        if (this.election.start_date === null)
          return this.NOT_STARTED;
        return this.RUNNING;
      }
      return this.CLOSED;
    },

  },
};
</script>
