<template>
  <div v-if="elections">
    <!-- Header -->
    <div>
      <div class="flex justify-end">
        <a
          class="text-primary mt-3 mx-6 font-cfont p-3 rounded-full cursor-pointer"
          href="/auth/logout"
          >Logout</a
        >
      </div>

      <div class="p-10 flex justify-center">
        <h1 class="text-primary font-cfont font-bold text-5xl">
          Hallo, {{ userName }}
        </h1>
      </div>
    </div>
    <!-- Info -->
    <div>
      <div class="rounded-full flex justify-evenly items-center">
        <div v-if="open > 1" class="flex">
          <div
            class="p-1 my-auto mr-2 bg-red-500 rounded-full animate-ping"
          ></div>
          <p class="font-cfont">{{ open }} aktive Wahlen</p>
        </div>

        <div v-else-if="open === 1" class="flex">
          <div
            class="p-1 my-auto mr-2 bg-red-500 rounded-full animate-ping"
          ></div>
          <p class="font-cfont">{{ open }} aktive Wahl</p>
        </div>

        <div v-else class="flex">
          <div
            class="p-1 my-auto mr-2 bg-green-700 rounded-full animate-pulse"
          ></div>
          <p class="font-cfont">Keine aktiven Wahlen</p>
        </div>

        <router-link to="/election/new">
          <button
            class="flex justify-center items-center p-3 font-cfont text-gray-700 bg-gray-300 rounded-full hover:bg-gray-200 transition duration-300 shadow-md focus:outline-none"
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
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Wahl erstellen
          </button>
        </router-link>
      </div>
    </div>

    

    <!-- Content -->
    <div>
      <router-view></router-view>

      <!-- Filter and Search bar -->

    <div>
      <div
        class="p-5 m-2 rounded-lg flex flex-col-reverse md:flex-row justify-evenly items-center"
      >
        <div class="flex items-center p-2 pl-4 bg-gray-200 rounded-xl">
          <svg
            class="h-6 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            id="search-list"
            v-model="searchName"
            v-on:keyup="searchByName()"
            class="bg-gray-200 rounded-xl p-2 font-cfont focus:outline-none"
            type="text"
            placeholder="Bsp. Wahl"
          />
        </div>

        <div
          class="flex items-center p-2 pl-4 mb-5 md:mb-0 bg-gray-200 rounded-xl"
        >
          <svg
            class="h-6 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>

          <select
            v-model="searchCat"
            v-on:change="searchByCat()"
            name="type"
            id="type"
            class="bg-gray-200 rounded-xl p-2 font-cfont focus:outline-none"
          >
            <option value="0" selected>Alle</option>
            <option value="1">Noch nicht gestartet</option>
            <option value="3">Pausiert</option>
            <option value="2">Offen</option>
            <option value="4">Beendet</option>
          </select>
        </div>
      </div>
    </div>

      <election-box v-for="e in filtered" :key="e.id" :election="e">
      </election-box>
    </div>
  </div>
  <loading v-else></loading>
</template>

<script>
import HoverTip from "../components/HoverTip.vue";
import ElectionBox from "../components/ElectionBox.vue";
import { onBeforeMount, onMounted, onUpdated, onUnmounted } from "vue";
import Service from "../election.js";
import Loading from "../components/Loading.vue";

export default {
  components: {
    HoverTip,
    ElectionBox,
    Loading,
  },
  data() {
    return {
      name: "Election List",
      open: 0,
      elections: null,
      filtered: null,
      searchName: "",
      searchCat: "0",
      userName: null,
    };
  },
  methods: {
    searchByName() {
      this.filtered = this.elections.filter(
        (e) => e.name.toLowerCase().indexOf(this.searchName.toLowerCase()) >= 0
      );
    },

    searchByCat() {
      this.filtered = this.elections.filter((e) => {
        if (this.searchCat === "0") return true;
        return this.state(e) === parseInt(this.searchCat);
      });
    },

    newElection: function () {
      this.$router.push({ name: "New" });
    },

    getUserName: function() {
      Service.getUserName()
        .then((response) => {
          localStorage.userName = response.name;
          this.userName = response.name;
        })
        .catch((error) => {
          if (error.response.status === 401)
            window.location.href = "/auth/login/azuread-tenant-oauth2/";
          else
            this.$router.push({ name: "Home" });
        });
    },

    getElections: function () {
      Service.getAllElections()
        .then((elections) => {
          this.getUserName();
          this.elections = elections;
          this.open = elections.filter((e) => this.isRunning(e)).length;
          this.filtered = elections;
        })
        .catch((error) => {
          if (error.response.status === 401)
            window.location.href = "/auth/login/azuread-tenant-oauth2/";
          else
            this.$router.push({ name: "Home" });
        });
    },

    isRunning(e) {
      if (e.paused) return false;
      if (e.end_date === null) {
        if (e.start_date === null) return false;
        return true;
      }
      return false;
    },

    state(e) {
      //not started = 1; running = 2; paused = 3; closed = 4
      if (e.paused) return this.PAUSED;
      if (e.end_date === null) {
        if (e.start_date === null) return this.NOT_STARTED;
        return this.RUNNING;
      }
      return this.CLOSED;
    },
  },

  beforeMount() {
    this.getElections();

  },

  created() {
    this.NOT_STARTED = 1;
    this.RUNNING = 2;
    this.PAUSED = 3;
    this.CLOSED = 4;
  },
};
</script>
