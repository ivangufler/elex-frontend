<template>
  <loading v-if="loading"></loading>

  <div v-if="paused">
      <h1 class="text-primary md:text-5xl md:mt-9 text-5xl mt-4 font-cfont font-bold mx-5">
        Diese Wahl ist pausiert.
      </h1>

      <p class="m-5 font-cfont mt-4 text-gray-500 text-sm">
        Diese Wahl wurde vom Ersteller pausiert. Somit ist momentan keine Stimmabgabe möglich.<br>
        Sobald der Ersteller die Wahl wieder aufnimmt, wirst du hier abstimmen können. Dein Abstimmungslink bleibt gültig.
      </p>

      <button
          @click="getElection()"
          class="bg-primary p-3 text-white font-cfont rounded-full m-5 text-lg font-semibold transform hover:scale-110 duration-500"
          type="button"
        >
          Aktualisieren
      </button>

  </div>

  <div v-if="election" >
    <div class="flex flex-col justify-center items-center mx-5">
      <span class="text-black font-bold md:mt-14 md:text-3xl font-cfont text-lg mt-5 text-center">{{
        election.name
      }}</span>
      <p class="m-5 font-cfont md:mt-8 mt-4 text-gray-500 text-sm">
        {{ election.description }}
      </p>

      <h1 class="text-primary md:text-5xl md:mt-9 text-5xl mt-4 font-cfont font-bold mx-5">
        Jetzt Abstimmen
      </h1>
    </div>

    <p class="m-5 font-cfont mt-4 text-gray-500 text-sm">
      Die Wahl erfolgt anonym und es sind keine Rückschlüsse auf deine Person
      möglich.
    </p>

    <p class="m-5 font-cfont mt-4 text-gray-500 text-sm">
      Bei Problemen wende dich an den Ersteller der Wahl unter
      <a class="underline" :href="'mailto:' + election.owner">{{
        election.owner
      }}.</a>
    </p>

    <p class="m-5 font-cfont mt-4 text-gray-500 text-sm">
      Du hast {{ election.votable }} Vorzugstimme
      {{ election.votable > 1 ? "n" : "" }}
      zur Verfügung.
    </p>

    <!--  Wenn nur 2 Optionen -->
    <div v-if="election.options.length === 2">
      <div class="flex flex-row">
        <label
          :key="key"
          v-for="(o, key) in election.options"
          :id="o"
          :for="key"
          :class="
            ' transition-colors duration-300 font-cfont flex-grow m-5 py-8 rounded-lg shadow-xl overflow-auto p-5  text-center ' +
            (checkedOptions.indexOf(o) === -1
              ? ' bg-gray-200 hover:bg-gray-300 '
              : ' bg-primary hover:bg-opacity-70 ') +
            (checkedOptions.length >= election.votable &&
            checkedOptions.indexOf(o) === -1
              ? 'cursor-not-allowed opacity-40'
              : '')
          "
        >
          <input
            type="checkbox"
            :id="key"
            :disabled="
              checkedOptions.length >= election.votable &&
              checkedOptions.indexOf(o) === -1
            "
            :value="o"
            v-model="checkedOptions"
            class="absolute opacity-0 h-0 w-0"
          />
          {{o}}
        </label>
      </div>
    </div>

    <!--  Wenn nicht 2 Optionen -->

    <div v-if="election.options.length != 2">
      <div class="flex flex-col ">
        <label
          v-for="(o, key) in election.options"
          :id="o"
          :for="key"
          :key="key"
          :class="
            ' transition-colors duration-300 font-cfont flex-grow m-5 py-8 rounded-lg shadow-xl overflow-auto p-5  text-center ' +
            (checkedOptions.indexOf(o) === -1
              ? ' bg-gray-200 hover:bg-gray-300 '
              : ' bg-primary hover:bg-opacity-70 ') +
            (checkedOptions.length >= election.votable &&
            checkedOptions.indexOf(o) === -1
              ? 'cursor-not-allowed opacity-40'
              : '')
          "
        >
          <input
            type="checkbox"
            :id="key"
            :disabled="
              checkedOptions.length >= election.votable &&
              checkedOptions.indexOf(o) === -1
            "
            :value="o"
            v-model="checkedOptions"
            class="absolute opacity-0 h-0 w-0"
          />
          {{ o }}
        </label>
      </div>
    </div>

    <div class="flex justify-end">
      <div>
        <button
          @click="voteButton"
          class="bg-primary p-3 text-white font-cfont rounded-full m-5 text-lg font-semibold transform hover:scale-110 duration-500"
          type="button"
        >
          Abstimmen
        </button>
      </div>
    </div>

    <!-- Vote Review -->
    <div id="panel" class="hidden fixed z-10 inset-0 overflow-y-auto">
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
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary bg-opacity-30 sm:mx-0 sm:h-10 sm:w-10"
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
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg font-cfont leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Stimme abgeben
                </h3>

                <div class="mt-2">
                  <p class="text-sm text-gray-500 font-cfont">
                    <span v-if="checkedOptions.length === 0"
                      >Bist du sicher, dass du weiß (leer) wählen willst?</span
                    >

                    <span v-if="checkedOptions.length === 1"
                      >Du hast "{{ checkedOptions[0] }}" ausgewählt.<br />
                      Um endgültig deine Stimme abzugeben, auf
                      <b>Wählen</b> klicken</span
                    >

                    <span v-if="checkedOptions.length > 1">
                      Du hast folgende Auswahl getroffen:
                      <div v-for="i in checkedOptions" :key="i">"{{ i }}"</div>
                      <span
                        >Um endgültig deine Stimme abzugeben, auf
                        <b>Wählen</b> klicken</span
                      >
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="vote"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Wählen
            </button>
            <button
              @click="voteButton"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Zurück
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Alert-->
    <div v-if="error" class="fixed z-10 inset-0 overflow-y-auto">
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
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-500 bg-opacity-30 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  class="h-6 w-6 text-red-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg font-cfont leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Fehler
                </h3>

                <div class="mt-2">
                  <p class="text-sm text-gray-500 font-cfont">
                    <span
                      >Ein Fehler ist aufgetreten.<br>
                      Deine Stimme konnte nicht gespeichert werden.<br>
                      Bitte versuche es später nochmal!
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="resetError()"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--End Alert Pannel -->

  </div>
</template>

<script>
import Service from "../election.js";
import Loading from "../components/Loading.vue"

export default {

  components: {
    "loading": Loading,
  },

  data() {
    return {
      panel: false,
      checkedOptions: [],
      election: null,
      loading: true,
      error: null,
      paused: false,
    };
  },
  methods: {
    voteButton() {
      if (this.panel) {
        document.getElementById("panel").classList.add("hidden");
        this.panel = false;
      } else {
        document.getElementById("panel").classList.remove("hidden");

        this.panel = true;
      }
    },

    resetError() {
      this.checkedOptions = [];
      this.panel = false;
      this.error = null;
      this.getElection();
    },

    vote() {
      this.loading = true;
      this.voteButton();
      let votes = [];
      this.checkedOptions.forEach((option) => {
        votes.push(this.election.options.indexOf(option));
      });
      Service.vote(this.$route.params.token, votes)
        .then(() => this.$router.push({ name: "After" }))
        .catch(error => this.error = error)
        .finally(() => this.loading = false);
    },

    getElection() {
      this.loading = true;
      Service.getVoterElection(this.$route.params.token)
        .then((election) => {
          this.election = election;
          this.paused = false;
        })
        .catch((error) => {
          this.election = null;
          if (error.response.status === 403) {
            if (error.response.data.voted)
              this.$router.push({ name: "Error" });
            else
              this.paused = true;
          } else
            this.$router.push({ name: "Error" });

        })
        .finally(() => this.loading = false);
    },
  },

  beforeMount() {
    this.getElection();
  },
};
</script>
