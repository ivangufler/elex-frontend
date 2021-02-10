<template>
  <div v-if="election">
    <div class="p-5 m-2 rounded-lg shadow-lg flex justify-between items-center">
      <span
        class="w-32 sm:w-96 sm:overflow-hidden overflow-scroll font-cfont"
        >{{ election.name }}</span
      >

      <hover-tip tipText="Anzahl Abgegebene Stimmen"
        ><span class="pl-4 font-cfont">{{ election.voted }}</span></hover-tip
      >
      <hover-tip tipText="Anzahl Teilnehmer"
        ><span class="pl-4 font-cfont">{{ election.voters }} </span></hover-tip
      >

      <div>
        <hover-tip v-if="state === PAUSED" tipText="Wahl pausiert"
          ><svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
        ></hover-tip>

        <hover-tip
          v-if="state === NOT_STARTED"
          tipText="Wahl noch nicht gestartet"
          ><svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            /></svg
        ></hover-tip>

        <hover-tip v-if="state === CLOSED" tipText="Wahl beendet"
          ><svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            /></svg
        ></hover-tip>

        <hover-tip
          v-if="state === RUNNING"
          tipText="Wahl für Stimmabgaben offen"
          ><svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
            /></svg
        ></hover-tip>
      </div>

     <router-link :to="'/election/'+election.id">
 <button class="bg-gray-300 rounded-xl shadow-md hover:bg-gray-200 duration-300 transition-colors" type="button">
        <div>
          <hover-tip v-if="state === CLOSED" tipText="Wahlergebnise ansehen"
            ><div>
              <svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg></div
          ></hover-tip>
          <hover-tip v-if="state != CLOSED" tipText="Wahl bearbeiten"
            ><div>
              <svg
                class="icon"
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
      </button>
     </router-link>
     
    </div>
  </div>
</template>

<script>
import HoverTip from "./HoverTip.vue";

export default {
  name: "ElectionBox",
  components: {
    "hover-tip": HoverTip,
  },
  created() {},
  data() {
    return {};
  },

  created() {
    this.NOT_STARTED = 1;
    this.RUNNING = 2;
    this.PAUSED = 3;
    this.CLOSED = 4;
  },

  props: {
    election: null,
  },
  methods: {},
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
