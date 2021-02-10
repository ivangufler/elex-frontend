<template>
  <div>
    <!-- Header -->
    <div>
      <div class="flex justify-end">
          
        <a class="text-primary mt-3 mr-6 font-cfont p-3 rounded-full" href=""
          >Logout</a
        >
      </div>

      <div class="p-10 flex justify-center">
        <h1 class="text-primary font-cfont font-bold text-5xl">
          Hallo, {{ 'd' }}
        </h1>
      </div>
    </div>
    <a class="text-primary mt-3 mr-6 font-cfont p-3 rounded-full" @click="fakelogin()">FAKE LOGIN</a>
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
          class="flex justify-center items-center p-3 font-cfont text-gray-700 bg-gray-300 rounded-full hover:bg-gray-200  transition duration-300 shadow-md focus:outline-none"
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
        
        <election-box v-for="e in elections" :key="e.id" :election="e">

        </election-box>
      
    </div>
  </div>
</template>

<script>
import HoverTip from "../components/HoverTip.vue";
import ElectionBox from "../components/ElectionBox.vue";
import { onBeforeMount, onMounted, onUpdated, onUnmounted } from "vue";
import Service from"../election.js";

export default {
  components: {
    HoverTip,
    ElectionBox,
  },
  data() {
    return {
      name: "Election List",
      open: 0,
      elections: null,
    };
  },
  methods: {
      newElection: function(){
          this.$router.push({name: 'New'})
      },
      fakelogin: function(){
        Service.doFakeLogin();
      },
      getElections: function() {
        Service.getAllElections()
          .then(elections => {this.elections = elections
          this.open = elections.filter(e => this.state(e)).length
          })
          //.catch(error => this.$router.push({ name: "Home" }));
      },

      state(e) {
      //not started = 1; running = 2; paused = 3; closed = 4
      if (e.paused)
        return false;
      if (e.end_date === null) {
        if (e.start_date === null)
          return false;
        return true;
      }
      return false;
    },

  },
  beforeMount() {
    this.getElections();
  },

 
  

};
</script>