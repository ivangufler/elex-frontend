<template>
  <div v-if="election">
    <!-- Header -->
    <div>
      <div class="flex justify-between">
        <a
          class="text-primary mt-3 mx-6 font-cfont p-3 rounded-full cursor-pointer"
          @click="goBack()"
          >Zurück</a
        >
        <a
          class="text-primary mt-3 mx-6 font-cfont p-3 rounded-full cursor-pointer"
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

    <!-- Buttons -->
    <div>
      <div class="flex flex-rows items-center justify-center">
        <button
          v-if="state === NOT_STARTED"
          class="mx-2 bg-primary text-white hover:shadow-lg px-3 py-2 rounded-full"
          type="button"
        >
          Wahl starten
        </button>

        <button
          v-if="state === RUNNING"
          class="mx-2 bg-secondary-100 text-white hover:shadow-lg px-3 py-2 rounded-full"
          type="button"
        >
          Wahl pausieren
        </button>

        <button
          v-if="state === PAUSED"
          class="mx-2 bg-secondary-100 text-white hover:shadow-lg px-3 py-2 rounded-full"
          type="button"
        >
          Wahl wiederaufnehmen
        </button>

        <button
          v-if="state === PAUSED || state === RUNNING"
          class="mx-2 bg-primary text-white hover:shadow-lg px-3 py-2 rounded-full"
          type="button"
        >
          Wahl beenden
        </button>
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
            <p>
              <input
                placeholder="Titel eingeben"
                class="no-underline font-cfont font-semibold text-md outline-none focus:underline"
                v-model="election.name"
              />
            </p>
            <div class="flex">
              <hover-tip v-if="state === NOT_STARTED" tipText="Name ändern">
                <div @click="editName = true">
                  <svg
                    class="h-5"
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
                </div>
              </hover-tip>
              <hover-tip
                v-if="state === NOT_STARTED"
                tipText="Änderung Löschen"
              >
                <div @click="editName = true">
                  <svg
                    class="pl-2 h-5"
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
                </div>
              </hover-tip>
            </div>
          </div>
          <div class="flex justify-between items-center mt-4">
            <p>
              <input
                placeholder="Beschreibung eingeben"
                class="no-underline font-cfont text-md outline-none focus:underline"
                v-model="election.description"
              />
            </p>
            <div class="flex">
              <hover-tip v-if="state === NOT_STARTED" tipText="Name ändern">
                <div @click="editName = true">
                  <svg
                    class="h-5"
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
                </div>
              </hover-tip>
              <hover-tip
                v-if="state === NOT_STARTED"
                tipText="Änderung Löschen"
              >
                <div @click="editName = true">
                  <svg
                    class="pl-2 h-5"
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
                </div>
              </hover-tip>
            </div>
          </div>

          <div class="flex justify-between items-center mt-6">
            <p class="font-cfont text-sm">Wahl erstellt am</p>
            <p class="font-cfont text-md font-semibold">
              {{ $filters.formatDate(election.creation_date) }}
            </p>
          </div>

          <div class="flex justify-between items-center mt-2">
            <p class="font-cfont text-sm">Wahl gestartet am</p>
            <p
              v-if="election.start_date"
              class="font-cfont text-md font-semibold"
            >
              {{ $filters.formatDate(election.start_date) }}
            </p>
            <p v-else class="font-cfont text-sm">Wahl nocht nicht gestartet</p>
          </div>

          <div class="flex justify-between items-center mt-2">
            <p class="font-cfont text-sm">Wahl beendet am</p>
            <p
              v-if="election.end_date"
              class="font-cfont text-md font-semibold"
            >
              {{ $filters.formatDate(election.end_date) }}
            </p>
            <p v-else class="font-cfont text-sm">Wahl nocht nicht beendet</p>
          </div>
        </div>

        <!-- Election Voters -->
        <div class="electioncard">
          <h2 class="font-semibold font-cfont text-xl">Wähler</h2>
          <div class="flex justify-between items-center">
            <p class="font-cfont text-sm">
              {{ state === CLOSED ? election.voters : election.voters.length }}
              Wähler insgesamt
            </p>

            <div v-if="state !== CLOSED" @click="addvoters">
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
          <div
            v-if="election.voters.length"
            class="max-h-60 bg-white overflow-y-auto overflow-x-auto mt-4"
          >
            <div
              v-if="state !== CLOSED"
              v-for="voter in election.voters"
              :key="voter"
              class="list-box"
            >
              <p class="font-cfont text-sm overflow-auto mr-4">
                {{ voter }}
              </p>
              <hover-tip tipText="Diesen Wähler entfernen">
                <svg
                  class="h-5"
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
          <div class="flex justify-between items-center mt-2 mb-3">
            <p class="font-cfont text-md">
              {{ election.votable }} Vorzugstimme{{
                election.votable > 1 ? "n" : ""
              }}
              möglich
            </p>
            <div class="flex justify-end">
              <button
                :disabled="election.votable === 0"
                type="button"
                class="disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  class="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18 12H6"
                  />
                </svg>
              </button>

              <button type="button">
                <svg
                  class="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <p class="font-cfont text-sm">
              {{ election.options.length }} Optionen insgesamt
            </p>

            <hover-tip
              v-if="state === NOT_STARTED"
              tipText="Optionen hinzufügen"
            >
              <button @click="addoptions" type="button">
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
                  />
                </svg>
              </button>
            </hover-tip>
          </div>

          <!-- Options Box -->
          <div class="max-h-60 bg-white overflow-y-auto overflow-x-auto mt-4">
            <div
              v-for="option in election.options"
              :key="option"
              class="list-box"
            >
              <p class="font-cfont text-sm overflow-auto mr-4">{{ option }}</p>
              <hover-tip
                v-if="state === NOT_STARTED"
                tipText="Diese Option entfernen"
              >
                <svg
                  class="h-5"
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
                <div class="flex flex-col items-center">
                  <input
                    id="file"
                    type="file"
                    name="CSV Upload"
                    accept=".csv"
                    class="w-0 h-0 opacity-0 overflow-hidden absolute -z-1"
                  />
                  <label
                    class="p-4 flex items-center font-cfont bg-primary text-white font-semibold cursor-pointer"
                    for="file"
                    ><svg
                      class="h-7 pr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    CSV Datei hochladen</label
                  >
                  <p class="text-center my-2 text-secondary-200">oder</p>

                  <p class="pb-2">Manuell hinzufügen:</p>
                  <div class="flex items-center">
                    <input
                      type="email"
                      class="outline-none border-b-2"
                      placeholder="max@muster.com"
                      value=""
                    />
                    <svg
                      class="h-6 ml-4 text-gray-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="flex justify-center">
                  <button
                    v-if="newvoter.length > 0"
                    class="mt-11 border transition-colors duration-150 border-gray-700 text-gray-700 font-cfont px-3 py-2 rounded-full hover:bg-primary hover:border-primary hover:text-white"
                    type="button"
                  >
                    Untenstehende Wähler hinzufügen
                  </button>
                </div>
                <div class="mt-5">
                  <p v-if="newvoter.length > 0" class="text-center">
                    Diese E-Mail Adressen werden hinzugefügt:
                  </p>
                  <div
                    v-for="voter in newvoter"
                    :key="voter"
                    class="list-box"
                  >
                    <p class="font-cfont text-sm overflow-auto mr-4">
                      {{ voter }}
                    </p>
                    <hover-tip tipText="Diesen Wähler entfernen">
                      <svg
                        class="h-5"
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
        </section>
      </div>
    </div>
    <!--End Add Voters Pannel -->

    <!-- Add Voters Pannel -->
    <div id="addOption" class="hidden fixed inset-0 overflow-hidden">
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
                  Optionen hinzufügen
                </h2>
              </div>
              <div class="mt-6 relative flex-1 px-4 sm:px-6">
                <div class="flex flex-col items-center">
                  <input
                    id="file"
                    type="file"
                    name="CSV Upload"
                    accept=".csv"
                    class="w-0 h-0 opacity-0 overflow-hidden absolute -z-1"
                  />
                  <label
                    class="p-4 flex items-center font-cfont bg-primary text-white font-semibold cursor-pointer"
                    for="file"
                    ><svg
                      class="h-7 pr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    CSV Datei hochladen</label
                  >
                  <p class="text-center my-2 text-secondary-200">oder</p>

                  <p class="pb-2">Manuell hinzufügen:</p>
                  <div class="flex items-center">
                    <input
                      type="email"
                      class="outline-none border-b-2"
                      placeholder="Option"
                      value=""
                    />
                    <svg
                      class="h-6 ml-4 text-gray-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="flex justify-center">
                  <button
                    v-if="newoption.length > 0"
                    class="mt-11 border transition-colors duration-150 border-gray-700 text-gray-700 font-cfont px-3 py-2 rounded-full hover:bg-primary hover:border-primary hover:text-white"
                    type="button"
                  >
                    Untenstehende Optionen hinzufügen
                  </button>
                </div>
                <div class="mt-5">
                  <p v-if="newoption.length > 0" class="text-center">
                    Diese Optionen werden hinzugefügt:
                  </p>
                  <div
                    v-for="option in newoption"
                    :key="option"
                    class="list-box"
                  >
                    <p class="font-cfont text-sm overflow-auto mr-4">
                      {{ option }}
                    </p>
                    <hover-tip tipText="Diesen Wähler entfernen">
                      <svg
                        class="h-5"
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
        </section>
      </div>
    </div>
    <!--End Add Voters Pannel -->
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
      editName: false,
      editDescription: false,
      newvoter: [],
      newoption: ['kk'],
    };
  },
  props: {},
  beforeMount() {
    Service.getElection(this.$route.params.id)
      .then((election) => (this.election = election))
      .catch((error) => {
        if (error.response.status === 403)
          this.$router.push({ name: "ElectionList" });
        else this.$router.push({ name: "Home" });
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

    test: function () {
      console.log("TEST");
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

    addoptions: function () {
      if (this.addOptions) {
        document.getElementById("addOption").classList.add("hidden");
        this.addOptions = false;
      } else {
        document.getElementById("addOption").classList.remove("hidden");

        this.addOptions = true;
      }
    },
  },

  computed: {
    state() {
      //not started = 1; running = 2; paused = 3; closed = 4
      if (this.election.paused) return this.PAUSED;

      if (this.election.end_date === null) {
        if (this.election.start_date === null) return this.NOT_STARTED;
        return this.RUNNING;
      }
      return this.CLOSED;
    },
  },
};
</script>
