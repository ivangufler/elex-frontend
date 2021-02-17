<template>
  <div class="flex-row m-6 mt-20">
    <h1 class="text-primary font-cfont text-5xl font-bold" >Ein Fehler ist aufgetreten.</h1>
  <p class="mt-7 text-gray-700">Es scheint, dass mit diesem Zugang bereits eine Stimme abgegeben wurde oder
    der Link falsch ist.<br>Versuche eventuell, den Link händisch in die Adresszeile deines Browsers zu kopieren.
    <br>
  </p>

<div class="flex justify-end md:justify-start">
  <router-link to="Home" >
    <button class="bg-primary p-4 rounded-xl mt-4 text-white" type="button">Zur Startseite</button>
  </router-link>

</div>
  </div>
</template>

<script>
export default {
  name: "Test",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>