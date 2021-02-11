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
          href="/auth/logout"
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
          :disabled="this.election.options.length < 2"
          @click="startElection()"
          class="mx-2 bg-primary text-white hover:shadow-lg px-3 py-2 rounded-full disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
        >
          {{ loading ? "Wird gestartet..." : "Wahl starten" }}
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
          @click="endElection()"
          class="mx-2 bg-primary text-white hover:shadow-lg px-3 py-2 rounded-full"
          type="button"
        >
          {{ loading ? "Wird beendet..." : "Wahl beenden" }}
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
                :disabled="state !== NOT_STARTED"
                v-on:keyup.enter="saveName()"
                placeholder="Titel eingeben"
                class="no-underline font-cfont font-semibold text-md outline-none focus:underline bg-white"
                v-model="new_election.name"
              />
            </p>
            <div class="flex" v-if="changedName">
              <hover-tip v-if="state === NOT_STARTED" tipText="Name ändern">
                <div @click="saveName()">
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
                <div @click="resetName()">
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
                :disabled="state !== NOT_STARTED"
                v-on:keyup.enter="saveDescription()"
                placeholder="Beschreibung eingeben"
                class="no-underline font-cfont text-md outline-none focus:underline bg-white"
                v-model="new_election.description"
              />
            </p>
            <div class="flex" v-if="changedDescription">
              <hover-tip v-if="state === NOT_STARTED" tipText="Name ändern">
                <div @click="saveDescription()">
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
                <div @click="resetDescription()">
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
        <div v-if="state != CLOSED" class="electioncard">
          <h2 class="font-semibold font-cfont text-xl">Wähler</h2>
          
         <div v-if="state != NOT_STARTED" class="relative pt-1">
  <div class="flex mb-2 items-center justify-between">
    <div>
      <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary bg-opacity-30">
       Aktuelle Wahlbeteiligung
      </span>
    </div>
    <div class="text-right">
      <span class="text-xs font-semibold inline-block text-primary">
        {{ election.voted === 0 ? 0 : (election.voted / election.voters.length ) * 100 }} %
      </span>
    </div>
  </div>
  <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary bg-opacity-30">
    <div :style="'width:'+(election.voted / election.voters.length) * 100+'%'" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
  </div>
</div>

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
            <div v-if="state !== CLOSED">
              <div
                v-for="voter in election.voters"
                :key="voter"
                class="list-box"
              >
                <p class="font-cfont text-sm overflow-auto mr-4">
                  {{ voter }}
                </p>
                <hover-tip
                  v-if="state === NOT_STARTED"
                  tipText="Diesen Wähler entfernen"
                >
                  <div @click="removeVoter(voter)">
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
                      />
                    </svg>
                  </div>
                </hover-tip>
              </div>
            </div>
          </div>
        </div>

        <!-- Election Results -->
        <div v-if="state === CLOSED" class="electioncard">
          <h2 class="font-semibold font-cfont text-xl">Wähler</h2>

          <div class="flex justify-between items-center mt-2">
            <p class="font-cfont text-sm">Eingeladene Wähler</p>
            <p class="font-cfont text-md font-semibold">
              {{ election.voters }}
            </p>
          </div>

          <div class="flex justify-between items-center mt-2">
            <p class="font-cfont text-sm">Abgegebene Stimmen</p>
            <p class="font-cfont text-md font-semibold">
              {{ election.voted }}
            </p>
          </div>

          <div class="flex justify-between items-center mt-2">
            <p class="font-cfont text-sm">Wahlbeteiligung</p>
            <p class="font-cfont text-md font-semibold">
              {{ (election.voted / election.voters) * 100 }} %
            </p>
          </div>

<div class="relative pt-1">
  <div class="flex mb-2 items-center justify-between">
    
  </div>
  <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary bg-opacity-30">
    <div :style="'width:'+(election.voted/election.voters * 100)+'%'" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
  </div>
</div>
        <div>
          <button @click="downloadPDF()">als PDF herunterladen</button>
        </div>

        </div>

        <!-- Election Options -->
        <div v-else class="electioncard">
          <h2 class="font-semibold font-cfont text-xl">Wahloptionen</h2>
          <div class="flex justify-between items-center mt-2 mb-3">
            <p class="font-cfont text-md">
              {{ election.votable }} Vorzugsstimme{{
                election.votable > 1 ? "n" : ""
              }}
              möglich
            </p>
            <div class="flex justify-end" v-if="state === NOT_STARTED">
              <button
                @click="changeVotable(-1)"
                :disabled="election.votable === 1"
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

              <button type="button" @click="changeVotable(1)">
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
                <div @click="removeOption(option)">
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
                    />
                  </svg>
                </div>
              </hover-tip>
            </div>
          </div>
        </div>

        <!-- Election Results -->
        <div v-if="state === CLOSED" class="electioncard">
          <h2 class="font-semibold font-cfont text-xl">Wahlergebnise</h2>

          <div class="flex justify-between items-center mt-2">
            <p class="font-cfont text-sm">Mögliche Vorzugsstimmen</p>
            <p class="font-cfont text-md font-semibold">
              {{ election.votable }}
            </p>
          </div>

          <div class="flex justify-between items-center mt-2">
            <p class="font-cfont text-sm">Optionen Insgesamt</p>
            <p class="font-cfont text-md font-semibold">
              {{ election.options.length }}
            </p>
          </div>

          <!-- Options Box -->
          <div class="max-h-60 bg-white overflow-y-auto overflow-x-auto mt-4">
            <div v-for="(result, option) in election.results" :key="option" class="list-box">
              <p class="font-cfont text-sm overflow-auto mr-4">{{ option }}</p>

              <div class="flex justify-between font-cfont text-md font-semibold">
                <hover-tip tipText="Stimmen Absolut"
                  ><div>
                    {{ result }}
                  </div></hover-tip
                >
                <hover-tip tipText="Stimmen Prozentuell"
                  ><div class="ml-7">
                    {{ result === 0 ? 0 : result / totalVotes * 100 }} %
                  </div></hover-tip
                >
              </div>
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
                  <!--
                  <input
                    id="file"
                    type="file"
                    name="CSV Upload"
                    @change="readFile()"
                    accept=".csv"
                    class="w-0 h-0 opacity-0 overflow-hidden absolute -z-1"
                  /> -->
                  <csv-import id="csv-file-voter" @parsed="votersCSV"></csv-import>
                  <label
                    class="p-4 flex items-center font-cfont bg-primary text-white font-semibold cursor-pointer"
                    for="csv-file-voter"
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
                      v-model="new_voter"
                      @input="validateInputVoter()"
                      v-on:keyup.enter="valid ? addVoter() : null"
                    />
                    <button
                      @click="addVoter()"
                      :disabled="!valid"
                      class="disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <svg
                        class="h-6 ml-4 text-black-300"
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
                    </button>
                  </div>
                </div>
                <div class="flex justify-center">
                  <button
                    v-if="new_voters.length > 0"
                    @click="saveVoters()"
                    class="mt-11 border transition-colors duration-150 border-gray-700 text-gray-700 font-cfont px-3 py-2 rounded-full hover:bg-primary hover:border-primary hover:text-white"
                    type="button"
                  >
                    Untenstehende Wähler hinzufügen
                  </button>
                </div>
                <div class="mt-5">
                  <p v-if="new_voters.length > 0" class="text-center">
                    Diese E-Mail Adressen werden hinzugefügt:
                  </p>
                  <div
                    v-for="voter in new_voters"
                    :key="voter"
                    class="list-box"
                  >
                    <p class="font-cfont text-sm overflow-auto mr-4">
                      {{ voter }}
                    </p>
                    <hover-tip tipText="Diesen Wähler entfernen">
                      <div
                        @click="
                          new_voters = new_voters.filter((v) => v !== voter)
                        "
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
                          />
                        </svg>
                      </div>
                    </hover-tip>
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
                  <csv-import id="csv-file-option" @parsed="optionsCSV"></csv-import>
                  <label
                    class="p-4 flex items-center font-cfont bg-primary text-white font-semibold cursor-pointer"
                    for="csv-file-option"
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
                      v-model="new_option"
                      @input="validateInputOption()"
                      v-on:keyup.enter="valid ? addOption() : null"
                    />
                    <button
                      @click="addOption()"
                      :disabled="!valid"
                      class="disabled:cursor-not-allowed disabled:opacity-50"
                    >
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
                    </button>
                  </div>
                </div>
                <div class="flex justify-center">
                  <button
                    v-if="new_options.length > 0"
                    @click="saveOptions()"
                    class="mt-11 border transition-colors duration-150 border-gray-700 text-gray-700 font-cfont px-3 py-2 rounded-full hover:bg-primary hover:border-primary hover:text-white"
                    type="button"
                  >
                    Untenstehende Optionen hinzufügen
                  </button>
                </div>
                <div class="mt-5">
                  <p v-if="new_options.length > 0" class="text-center">
                    Diese Optionen werden hinzugefügt:
                  </p>
                  <div
                    v-for="option in new_options"
                    :key="option"
                    class="list-box"
                  >
                    <p class="font-cfont text-sm overflow-auto mr-4">
                      {{ option }}
                    </p>
                    <hover-tip tipText="Diese Option entfernen">
                      <div
                        @click="
                          new_options = new_options.filter((o) => o !== option)
                        "
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
                          />
                        </svg>
                      </div>
                    </hover-tip>
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
import {
  onBeforeMount,
  onMounted,
  onUpdated,
  onUnmounted,
  setBlockTracking,
} from "vue";
import HoverTip from "../components/HoverTip.vue";
import CSVImport from "../components/CsvImport.vue";
import Service from "../election.js";
import moment from 'moment';

export default {
  name: "Election Detail",

  components: {
    'hover-tip': HoverTip,
    'csv-import': CSVImport
  },

  created() {},

  data() {
    return {
      election: null,
      new_election: {},
      loading: false,
      addVoters: false,
      addOptions: false,
      editName: false,
      editDescription: false,
      new_voters: [],
      new_options: [],
      new_option: "",
      new_voter: "",
      valid: false,
      csv: {},
    };
  },

  props: {},

  beforeMount() {
    this.getElection();
  },

  created() {
    this.NOT_STARTED = 1;
    this.RUNNING = 2;
    this.PAUSED = 3;
    this.CLOSED = 4;
  },

  mounted() {},

  methods: {
    goBack() {
      this.$router.go(-1);
    },

    test: function () {
      console.log(this.csv);
    },

    getElection() {
      Service.getElection(this.$route.params.id)
        .then((election) => {
          this.election = election;
          Object.assign(this.new_election, election);
        })
        .catch((error) => {
          if (error.response.status === 403)
            this.$router.push({ name: "ElectionList" });
          else this.$router.push({ name: "Home" });
        });
    },

    saveName() {
      Service.updateElection(this.election.id, { name: this.new_election.name })
        .then((election) => {
          this.election.name = election.name;
          this.new_election.name = election.name;
        })
        .catch();
    },

    resetName() {
      this.new_election.name = this.election.name;
    },

    saveDescription() {
      Service.updateElection(this.election.id, {
        description: this.new_election.description,
      })
        .then((election) => {
          this.election.description = election.description;
          this.new_election.description = election.description;
        })
        .catch();
    },

    resetDescription() {
      this.new_election.description = this.election.description;
    },

    changeVotable(value) {
      let votable = this.election.votable;
      if (value < 0) {
        if (votable === 1) return;
        votable--;
      } else votable++;

      Service.updateElection(this.election.id, { votable: votable })
        .then((election) => (this.election.votable = election.votable))
        .catch();
    },

    startElection() {
      this.loading = true;
      Service.startElection(this.election.id)
        .then((start_date) => (this.election.start_date = start_date))
        .catch()
        .finally(() => (this.loading = false));
    },

    pauseElection() {},

    endElection() {
      this.loading = true;
      Service.endElection(this.election.id)
        .then(() => this.getElection())
        .catch()
        .finally(() => (this.loading = false));
    },

    downloadPDF()  {
      Service.getReport(this.election.id)
        .then(response => {
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'Report_' + moment().format('DD-MM-YYYY');
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch();
    },

    votersCSV(emails) {
      emails.forEach(email => {
        if (this.validateVoter(email))
          this.addVoter(email);
      });
    },

    saveVoters() {
      Service.addVoters(this.election.id, this.new_voters)
        .then((response) => {
          this.election.voters = response.voters;
          this.addvoters();
        })
        .catch();
    },

    validateVoter(voter) {
      const re = /\S+@\S+\.\S+/;
      voter = voter.toLowerCase().trim();
      if (voter.length === 0 || !re.test(voter))
        return false;
      else if (
        this.new_voters.includes(voter) ||
        this.election.voters.includes(voter)
      )
        return false;
      return true;
    },

    validateInputVoter() {
      this.new_voter = this.new_voter.toLowerCase().trim();
      this.valid = this.validateVoter(this.new_voter);
    },

    addVoter(voter) {
      if (voter === undefined) {
        voter = this.new_voter.toLowerCase().trim();
        this.new_voter = '';
      }
      else
        voter = voter.toLowerCase().trim();
      this.new_voters.push(voter);      
      this.valid = false;
    },

    removeVoter(voter) {
      Service.removeVoter(this.election.id, voter)
        .then((response) => (this.election.voters = response.voters))
        .catch();
    },

    addvoters() {
      if (this.addVoters) {
        document.getElementById("addVoter").classList.add("hidden");
        this.addVoters = false;
      } else {
        document.getElementById("addVoter").classList.remove("hidden");
        this.addVoters = true;
        this.new_voters = [];
        this.new_voter = "";
      }
    },

    optionsCSV(options) {
      options.forEach(option => {
        if (this.validateOption(option))
          this.addOption(option);
      });
    },

    saveOptions() {
      Service.addOptions(this.election.id, this.new_options)
        .then((response) => {
          this.election.options = response.options;
          this.new_options = [];
          this.addoptions();
        })
        .catch();
    },

    validateOption(option) {
      option = option.trim();

      if (option.trim().length === 0) return false;
      else if (
        this.new_options.includes(option) ||
        this.election.options.includes(option)
      )
        return false;
      return true;
    },

    validateInputOption() {
      this.new_option = this.new_option.trim();
      this.valid = this.validateOption(this.new_option);
    },

    addOption(option) {
      if (option === undefined) {
        option = this.new_option.trim();
        this.new_option = '';
      }
      else
        option = option.trim();
      this.new_options.push(option);      
      this.valid = false;
    },

    removeOption(option) {
      let index = this.election.options.indexOf(option);
      Service.removeOption(this.election.id, index)
        .then((response) => (this.election.options = response.options))
        .catch();
    },

    addoptions() {
      if (this.addOptions) {
        document.getElementById("addOption").classList.add("hidden");
        this.addOptions = false;
      } else {
        document.getElementById("addOption").classList.remove("hidden");
        this.addOptions = true;
        this.new_options = [];
        this.new_option = "";
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

    changedName() {
      return this.election.name !== this.new_election.name;
    },

    changedDescription() {
      return this.election.description !== this.new_election.description;
    },

    totalVotes() {
      let sum = 0;
      for(var option in this.election.results)
        sum += this.election.results[option];
      return sum;
    },
  },
};
</script>
