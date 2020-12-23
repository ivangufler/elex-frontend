<template>
  <div>

    <div
        class="p-5 m-2 rounded-lg shadow-lg flex justify-between items-center"
      >
        <span class="w-32 sm:w-96 sm:overflow-hidden overflow-scroll font-cfont"
          >Wahl zum Schulratspräsidenten</span>

        <hover-tip tipText="Anzahl Abgegebene Stimmen"
          ><span class="pl-4 font-cfont">34</span></hover-tip
        >
        <hover-tip tipText="Anzahl Teilnehmer"
          ><span class="pl-4 font-cfont">45</span></hover-tip
        >

        <div class="sm:flex">
          <hover-tip tipText="Wahl noch nicht beendet">
            <div>
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </hover-tip>

          <hover-tip tipText="Wahl beendet">
            <div>
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
                  d="M5 13l4 4L19 7"
                />
              </svg></div
          ></hover-tip>

          <hover-tip tipText="Wahl offen - Stimmabgabe möglich">
            <div>
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
                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              </svg></div
          ></hover-tip>
          <hover-tip tipText="Wahl gesperrt - keine Stimmabgabe möglich">
            <div>
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </hover-tip>

          <hover-tip tipText="Wahlergebnise ansehen"
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
          <hover-tip tipText="Wahl bearbeiten"
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
      </div>

  </div>
</template>

<script>
import HoverTip from './HoverTip.vue';

export default {
  name: "ElectionBox",
  components: {
    'hover-tip': HoverTip,
  },
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {
  },
};
</script>

