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
          Hallo, {{ name }}
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
          <p class="font-cfont">{{ open }} aktive Wahle</p>
        </div>

        <div v-else class="flex">
          <div
            class="p-1 my-auto mr-2 bg-green-700 rounded-full animate-pulse"
          ></div>
          <p class="font-cfont">Keine aktiven Wahlen</p>
        </div>

        
        <button
          class="flex justify-center items-center p-3 font-cfont bg-secondary-100 rounded-full hover:bg-secondary-200 hover:shadow-xl hover:text-white"
          @click="newElection"
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
      </div>
    </div>

    <!-- Content -->
    <div>

        <router-view></router-view>

        <election-box></election-box>
      
    </div>
  </div>
</template>

<script>
import HoverTip from "../components/HoverTip.vue";
import ElectionBox from "../components/ElectionBox.vue";

export default {
  components: {
    HoverTip,
    ElectionBox,
  },
  data() {
    return {
      name: "Name",
      open: 5,
    };
  },
  methods: {
      newElection: function(){
          this.$router.push({name: 'New'})
      }
  },
};
</script>