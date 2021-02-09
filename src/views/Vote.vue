<template>
  <div>
    <div class="flex flex-col justify-center items-center">
      <h1>{{ $route.params.token }}</h1>

      <span class="text-black font-semibold text-lg mt-5">Wahl zum Presi</span>
      <p class="m-5 font-cfont mt-4 text-gray-500 text-sm">Lorem Ipsum</p>

      <h1 class="text-primary text-5xl mt-4 font-cfont font-bold mx-5">
        Jetzt Abstimmen
      </h1>
    </div>

    <p class="m-5 font-cfont mt-4 text-gray-500 text-sm">
      Bei dieser Abstimmung haben Sie 1 Vorzugsstimme. Sie können auch weiß
      abgeben. Nach dem Klicken auf Abstimmen wird sich ein Fenster öffnen bei
      dem Sie Ihre Wahl bestätigen müssen. <br />
      Die Wahl erfolgt anonym und es sin keine Rückschlüsse auf Ihre Person
      möglich
    </p>

    <!--  Wenn nur 2 Optionen -->

    <div>

      <div class="flex flex-row">
        <div
          class="font-cfont flex-grow m-5 py-8 rounded-lg shadow-xl overflow-auto p-5 bg-gray-200 text-center"
        >
          Ja
        </div>

        <div
          class="font-cfont flex-grow m-5 py-8 rounded-lg shadow-xl overflow-auto p-5 bg-gray-200 text-center"
        >
          Nein
        </div>
      </div>
    </div>

    <!--  Wenn nicht 2 Optionen -->

    <div>
     

      <div class="flex flex-col">
        <div
          class="font-cfont flex-grow m-5 py-8 rounded-lg shadow-xl overflow-auto p-5 bg-gray-200 text-center"
        >
          Test Person
        </div>

        <div
          class="font-cfont flex-grow m-5 py-8 rounded-lg shadow-xl overflow-auto p-5 bg-gray-200 text-center"
        >
          Person Test
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>
