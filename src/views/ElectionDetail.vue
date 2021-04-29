<template>
  <loading v-if="loading"></loading>
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
      <div class="flex flex-col md:flex-row items-center justify-center">
        
        <div v-if="state === NOT_STARTED">
          <hover-tip v-if="this.election.options.length < 2" tipText="Es müssen min. zwei Wahlptionen angegeben werden">
            <button
              disabled
              class="mx-2 bg-primary text-white hover:shadow-lg px-3 py-2 rounded-full disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
            >
              Wahl starten
            </button>
          </hover-tip>
          <button v-else
            @click="showStartElectionPanel()"
            class="mx-2 bg-primary text-white hover:shadow-lg px-3 py-2 rounded-full disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
          >
            Wahl starten
          </button>
        </div>

        <div
          class="flex flex-col md:flex-row items-center justify-center"
          v-if="state === RUNNING || state === PAUSED"
        >
          <button
            @click="showPauseElectionPanel()"
            class="mx-2 bg-secondary-100 text-white hover:shadow-lg px-3 py-2 rounded-full"
            type="button"
          >
            {{ state === RUNNING ? "Wahl pausieren" : "Wahl wieder aufnehmen" }}
          </button>

          <button
            @click="showSendReminderPanel()"
            class="mx-2 md:mt-0 mt-3 flex-wrapmt-3 bg-secondary-100 text-white hover:shadow-lg px-3 py-2 rounded-full"
            type="button"
          >
            Erinnerung senden
          </button>

          <button
            @click="showEndElectionPanel()"
            class="mx-2 mt-3 md:mt-0 bg-primary text-white hover:shadow-lg px-3 py-2 rounded-full"
            type="button"
          >
            {{ loading ? "Wird beendet..." : "Wahl beenden" }}
          </button>
        </div>
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
            <div class="flex">
              <hover-tip v-if="state === NOT_STARTED" tipText="Name ändern">
                <button
                  :disabled="!changedName || new_election.name === ''"
                  class="text-black disabled:cursor-not-allowed disabled:opacity-30"
                  @click="saveName()"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </hover-tip>
              <hover-tip
                v-if="state === NOT_STARTED"
                tipText="Änderung Löschen"
              >
                <button
                  :disabled="!changedName || new_election.name === ''"
                  class="text-black disabled:cursor-not-allowed disabled:opacity-30"
                  @click="resetName()"
                >
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
                </button>
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
            <div class="flex">
              <hover-tip
                v-if="state === NOT_STARTED"
                tipText="Beschreibung ändern"
              >
                <button
                  :disabled="!changedDescription"
                  class="text-black disabled:cursor-not-allowed disabled:opacity-30"
                  @click="saveDescription()"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </hover-tip>
              <hover-tip
                v-if="state === NOT_STARTED"
                tipText="Änderung Löschen"
              >
                <button
                  :disabled="!changedDescription"
                  class="text-black disabled:cursor-not-allowed disabled:opacity-30"
                  @click="resetDescription()"
                >
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
                </button>
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
          <div class="flex justify-between">
            <h2 class="font-semibold font-cfont text-xl">Wähler</h2>
            <button
              v-if="state === RUNNING || state === PAUSED"
              class="disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none border-transparent"
              :disabled="state === PAUSED"
              @click="refresh()"
            >
              <hover-tip tipText="Wahlbeteiligung aktualisieren">
                <div id="refreshVoter">
                  <svg
                    style="-webkit-transform: scaleX(-1); transform: scaleX(-1)"
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg></div
              ></hover-tip>
            </button>
          </div>
          <div v-if="state != NOT_STARTED" class="relative pt-1">
            <div class="flex mb-2 items-center justify-between">
              <div>
                <span
                  class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary bg-opacity-30"
                >
                  Aktuelle Wahlbeteiligung
                </span>
              </div>
              <div class="text-right">
                <span class="text-xs font-semibold inline-block text-primary">
                  {{
                    election.voted === 0
                      ? 0
                      : (
                          (election.voted / election.voters.length) *
                          100
                        ).toFixed(1)
                  }}
                  %
                </span>
              </div>
            </div>
            <div
              class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary bg-opacity-30"
            >
              <div
                :style="
                  'width:' +
                  (election.voted / election.voters.length) * 100 +
                  '%'
                "
                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
              ></div>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <p class="font-cfont text-sm">
              {{ state === CLOSED ? election.voters : election.voters.length }}
              Wähler insgesamt
            </p>
            <p></p>
            <button v-if="state !== CLOSED" @click="toggleVoterDialog()">
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
            </button>
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
              {{
                election.voters === 0
                  ? (0).toFixed(1)
                  : ((election.voted / election.voters) * 100).toFixed(1)
              }}
              %
            </p>
          </div>

          <div class="relative pt-1">
            <div class="flex mb-2 items-center justify-between"></div>
            <div
              class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary bg-opacity-30"
            >
              <div
                :style="
                  'width:' + (election.voted / election.voters) * 100 + '%'
                "
                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
              ></div>
            </div>
          </div>
          <div class="flex sm:justify-end justify-center">
            <button
              class="font-cfont flex items-center p-3 rounded-xl bg-primary mt-3 text-white font-semibold"
              @click="downloadPDF()"
            >
              <svg
                class="h-7 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Bericht als PDF herunterladen
            </button>
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
              <button @click="toggleOptionDialog()" type="button">
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
          <h2 class="font-semibold font-cfont text-xl">Wahlergebnisse</h2>

          <div class="flex justify-between items-center mt-2">
            <p class="font-cfont text-sm">Mögliche Vorzugsstimmen</p>
            <p class="font-cfont text-md font-semibold">
              {{ election.votable }}
            </p>
          </div>

          <div class="flex justify-between items-center mt-2">
            <p class="font-cfont text-sm">Optionen insgesamt</p>
            <p class="font-cfont text-md font-semibold">
              {{ election.options.length }}
            </p>
          </div>

          <!-- Options Box -->
          <div class="max-h-60 bg-white overflow-y-auto overflow-x-auto mt-4">
            <div
              v-for="(result, option) in election.results"
              :key="option"
              class="list-box"
            >
              <p class="font-cfont text-sm overflow-auto mr-4">{{ option }}</p>

              <div
                class="flex justify-between font-cfont text-md font-semibold"
              >
                <hover-tip tipText="Stimmen Absolut"
                  ><div>
                    {{ result }}
                  </div></hover-tip
                >
                <hover-tip tipText="Stimmen Prozentuell"
                  ><div class="ml-7">
                    {{
                      result === 0
                        ? (0).toFixed(1)
                        : ((result / totalVotes) * 100).toFixed(1)
                    }}
                    %
                  </div></hover-tip
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Voters Pannel -->
    <div v-if="showVoterDialog" class="fixed inset-0 overflow-hidden">
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
                @click="toggleVoterDialog()"
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
                  <csv-import
                    id="csv-file-voter"
                    @parsed="votersCSV"
                  ></csv-import>
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
                    @click="state === NOT_STARTED ? saveVoters() : showAddVotersPanel()"
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

    <!-- Add Options Pannel -->
    <div v-if="showOptionDialog" class="fixed inset-0 overflow-hidden">
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
                @click="toggleOptionDialog()"
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
                 
                  

                  <csv-import
                    id="csv-file-option"
                    @parsed="optionsCSV"
                  ></csv-import>

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
    <!--End Add Options Pannel -->

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
                      Eventuelle Änderungen wurden nicht gespeichert.<br>
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

    <!-- Start Election Review-->
    <div id="startElection" class="hidden fixed z-10 inset-0 overflow-y-auto">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg font-cfont leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Wahl starten
                </h3>

                <div class="mt-2">
                  <p class="text-sm text-gray-500 font-cfont">
                    <span>
                      Bist du sicher, dass du die Wahl starten willst?<br>
                      An alle bereits hinzugefügten Wähler werden Einladungs-E-Mails verschickt werden.
                      Es werden keine Änderungen mehr möglich sein, du wirst aber noch Wähler hinzufügen können.
                      Der Vorgang kann nicht mehr rückgängig gemacht werden.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="startElection"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Jetzt starten
            </button>
            <button
              @click="showStartElectionPanel"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Zurück
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- End Election Review-->
    <div id="endElection" class="hidden fixed z-10 inset-0 overflow-y-auto">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg font-cfont leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Wahl beenden
                </h3>

                <div class="mt-2">
                  <p class="text-sm text-gray-500 font-cfont">
                    <span>
                      Bist du sicher, dass du die Wahl jetzt beenden möchtest?<br>
                      Es wird nicht mehr möglich sein, abzustimmen und die Ergebnisse werden angezeigt werden.
                      Der Vorgang kann nicht mehr rückgängig gemacht werden.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="endElection"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Beenden
            </button>
            <button
              @click="showEndElectionPanel"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Zurück
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Remind Election Review-->
    <div id="reminder" class="hidden fixed z-10 inset-0 overflow-y-auto">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg font-cfont leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Erinnerung senden
                </h3>

                <div class="mt-2">
                  <p class="text-sm text-gray-500 font-cfont">
                    <span>
                      Bist du sicher, dass an alle eingeladenen Wähler, die noch nicht abgestimmt haben, eine
                      Erinnerungsnachricht versendet werden soll?
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="sendReminder"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Erinnerung senden
            </button>
            <button
              @click="showSendReminderPanel"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Zurück
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pause Election Review-->
    <div id="pauseElection" class="hidden fixed z-10 inset-0 overflow-y-auto">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg font-cfont leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Wahl {{ state === RUNNING ? 'pausieren' : 'wieder aufnehmen' }}
                </h3>

                <div class="mt-2">
                  <p class="text-sm text-gray-500 font-cfont">
                    <span v-if="state === RUNNING">
                      Bist du sicher, dass du die Wahl pausieren möchtest?<br>
                      Es wird niemandem mehr möglich sein, seine Stimme abzugeben.<br>
                      Du kannst die Wahl jederzeit wieder aufnehmen.
                    </span>
                    <span v-else>
                      Bist du sicher, dass du die Wahl wieder aufnehmen möchtest?<br>
                      Es wird wieder möglich sein, an der Wahl teilzunehmen.<br>
                      Du kannst die Wahl jederzeit wieder pausieren.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="pauseElection()"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Wahl {{ state === RUNNING ? 'pausieren' : 'wieder aufnehmen' }}
            </button>
            <button
              @click="showPauseElectionPanel()"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Zurück
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Voters Review-->
    <div id="addVotersReview" class="hidden fixed z-10 inset-0 overflow-y-auto">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg font-cfont leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Wähler hinzufügen
                </h3>

                <div class="mt-2">
                  <p class="text-sm text-gray-500 font-cfont">
                    <span>
                      Bist du sicher, dass du die eingegebenen Wähler hinzufügen willst?<br>
                      Da die Wahl bereits läuft, werden die Einladungsnachrichten sofort verschickt werden.<br>
                      Dieser Vorgang kann nicht rückgängig gemacht werden.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="saveVoters()"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Wähler hinzufügen
            </button>
            <button
              @click="showAddVotersPanel()"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Zurück
            </button>
          </div>
        </div>
      </div>
    </div>

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
import Loading from "../components/Loading.vue";
import CSVImport from "../components/CsvImport.vue";
import Service from "../election.js";
import moment from "moment";

export default {
  name: "Election Detail",

  components: {
    "hover-tip": HoverTip,
    "csv-import": CSVImport,
    "loading": Loading,
  },

  created() {},

  data() {
    return {
      error: null,
      election: null,
      new_election: {},
      loading: true,
      showVoterDialog: false,
      showOptionDialog: false,
      editName: false,
      editDescription: false,
      new_voters: [],
      new_options: [],
      new_option: "",
      new_voter: "",
      valid: false,
      csv: {},
      startElectionPanel: false,
      endElectionPanel: false,
      sendReminderPanel: false,
      pauseElectionPanel: false,
      addVotersPanel: false,
    };
  },

  props: {},

  beforeMount() {
    if (isNaN(this.$route.params.id))
      this.$router.push({ name: "ElectionList" });
    else
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
      this.$router.push({ name: "ElectionList" });
    },

    test: function () {
      console.log(this.csv);
    },

    resetError() {
      this.error = null;
      this.getElection();
    },

    getElection() {
      this.loading = true;
      Service.getElection(this.$route.params.id)
        .then((election) => {
          this.election = election;
          Object.assign(this.new_election, election);
        })
        .catch((error) => {
          if (error.response.status === 401)
            window.location.href = "/auth/login/azuread-tenant-oauth2/";
          else if (error.response.status === 403 || error.response.status === 404)
            this.$router.push({ name: "ElectionList" });
          else this.$router.push({ name: "Home" });
        })
        .finally(() => this.loading = false);
    },

    saveName() {
      if (this.new_election.name.trim() === "")
        return;
      this.loading = true;
      Service.updateElection(this.election.id, { name: this.new_election.name })
        .then((election) => {
          this.election.name = election.name;
          this.new_election.name = election.name;
        })
        .catch((error) => (this.error = error))
        .finally(() => this.loading = false);
    },

    resetName() {
      this.new_election.name = this.election.name;
    },

    saveDescription() {
      this.loading = true;
      Service.updateElection(this.election.id, {
        description: this.new_election.description,
      })
        .then((election) => {
          this.election.description = election.description;
          this.new_election.description = election.description;
        })
        .catch((error) => (this.error = error))
        .finally(() => this.loading = false);
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
        .catch((error) => (this.error = error))
        .finally(() => this.loading = false);
    },

    refresh() {
      document.getElementById("refreshVoter").classList.add("animate-spin");
      Service.getElection(this.$route.params.id)
        .then((election) => {
          this.election = election;
          Object.assign(this.new_election, election);
        })
        .catch((error) => (this.error = error))
        .finally(() => document.getElementById("refreshVoter").classList.remove("animate-spin"));
    },

    showStartElectionPanel() {
      if (this.startElectionPanel) {
        document.getElementById("startElection").classList.add("hidden");
        this.startElectionPanel = false;
      } else {
        document.getElementById("startElection").classList.remove("hidden");
        this.startElectionPanel = true;
      }
    },

    startElection() {
      this.showStartElectionPanel();
      this.loading = true;
      Service.startElection(this.election.id)
        .then((start_date) => (this.election.start_date = start_date))
        .catch((error) => (this.error = error))
        .finally(() => (this.loading = false));
    },

    showPauseElectionPanel() {
      if (this.pauseElectionPanel) {
        document.getElementById("pauseElection").classList.add("hidden");
        this.pauseElectionPanel = false;
      } else {
        document.getElementById("pauseElection").classList.remove("hidden");
        this.pauseElectionPanel = true;
      }
    },

    pauseElection() {
      this.loading = true;
      this.showPauseElectionPanel();
      Service.pauseElection(this.election.id)
        .then(() => (this.election.paused = !this.election.paused))
        .catch((error) => (this.error = error))
        .finally(() => this.loading = false);
    },

    showEndElectionPanel() {
      if (this.endElectionPanel) {
        document.getElementById("endElection").classList.add("hidden");
        this.endElectionPanel = false;
      } else {
        document.getElementById("endElection").classList.remove("hidden");
        this.endElectionPanel = true;
      }
    },

    endElection() {
      this.showEndElectionPanel();
      this.loading = true;
      Service.endElection(this.election.id)
        .then(() => this.getElection())
        .catch((error) => (this.error = error))
    },

    showSendReminderPanel() {
      if (this.sendReminderPanel) {
        document.getElementById("reminder").classList.add("hidden");
        this.sendReminderPanel = false;
      } else {
        document.getElementById("reminder").classList.remove("hidden");
        this.sendReminderPanel = true;
      }
    },

    sendReminder() {
      this.loading = true;
      this.showSendReminderPanel();
      Service.remindeElection(this.election.id)
        .then()
        .catch((error) => (this.error = error))
        .finally(() => this.loading = false);
    },

    downloadPDF() {
      this.loading = true;
      Service.getReport(this.election.id)
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "Report_" + moment().format("DD-MM-YYYY");
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch((error) => (this.error = error))
        .finally(() => this.loading = false);
    },

    votersCSV(emails) {
      emails.forEach((email) => {
        if (this.validateVoter(email)) this.addVoter(email);
      });
    },

    saveVoters() {
      this.loading = true;
      if (this.state !== this.NOT_STARTED)
        this.showAddVotersPanel();
      Service.addVoters(this.election.id, this.new_voters)
        .then((response) => {
          this.election.voters = response.voters;
          this.toggleVoterDialog();
        })
        .catch((error) => (this.error = error))
        .finally(() => this.loading = false);
    },

    validateVoter(voter) {
      const re = /\S+@\S+\.\S+/;
      voter = voter.toLowerCase().trim();
      if (voter.length === 0 || !re.test(voter)) return false;
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
        this.new_voter = "";
      } else voter = voter.toLowerCase().trim();
      this.new_voters.push(voter);
      this.valid = false;
    },

    showAddVotersPanel() {
      if (this.addVotersPanel) {
        document.getElementById("addVotersReview").classList.add("hidden");
        this.addVotersPanel = false;
      } else {
        document.getElementById("addVotersReview").classList.remove("hidden");
        this.addVotersPanel = true;
      }
    },

    removeVoter(voter) {
      this.loading = true;
      Service.removeVoter(this.election.id, voter)
        .then((response) => (this.election.voters = response.voters))
        .catch((error) => (this.error = error))
        .finally(() => this.loading = false);
    },

    toggleVoterDialog() {
      if (this.showVoterDialog) {
        this.showVoterDialog = false;
      } else {
        this.showVoterDialog = true;
        this.new_voters = [];
        this.new_voter = "";
      }
    },

    optionsCSV(options) {
      options.forEach((option) => {
        if (this.validateOption(option)) this.addOption(option);
      });
    },

    saveOptions() {
      this.loading = true;
      Service.addOptions(this.election.id, this.new_options)
        .then((response) => {
          this.election.options = response.options;
          this.new_options = [];
          this.toggleOptionDialog();
        })
        .catch((error) => (this.error = error))
        .finally(() => this.loading = false);
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
      this.valid = this.validateOption(this.new_option);
    },

    addOption(option) {
      if (option === undefined) {
        option = this.new_option.trim();
        this.new_option = "";
      } else option = option.trim();
      this.new_options.push(option);
      this.valid = false;
    },

    removeOption(option) {
      this.loading = true;
      let index = this.election.options.indexOf(option);
      Service.removeOption(this.election.id, index)
        .then((response) => (this.election.options = response.options))
        .catch((error) => (this.error = error))
        .finally(() => this.loading = false);
    },

    toggleOptionDialog() {
      if (this.showOptionDialog) {
        this.showOptionDialog = false;
      } else {
        this.showOptionDialog = true;
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
      for (var option in this.election.results)
        sum += this.election.results[option];
      return sum;
    },
  },
};
</script>
