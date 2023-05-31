<template>
  <div class="mt-8 space-y-6">
    <div class="shadow-sm -space-y-px">
      <div class="w-full relative">
        <Combobox v-model="selected">
          <div class="mt-1 flex shadow-sm">
            <span
              class="inline-flex items-center bg-white text-gray-600 text-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"
              :class="
                selected.length > 0 && textInInput !== ''
                  ? 'rounded-tl-2xl rounded-bl-none'
                  : 'rounded-l-full'
              "
            >
              <div class="flex">
                <span class="sr-only">Search</span>
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </span>
            <div class="relative w-full">
              <ComboboxInput
                type="text"
                @keyup.enter="submit()"
                @change="(textInInput = $event.target.value) && onChange()"
                :displayValue="() => textInInput"
                :value="textInInput"
                name="game-search"
                id="game-search"
                autocomplete="off"
                class="flex-1 rounded-tr-full block w-full px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:z-10 text-base text-gray-600 bg-white active:bg-white autofill::bg-white focus:bg-white"
                :class="
                  selected.length > 0 && textInInput !== ''
                    ? 'rounded-tr-2xl rounded-br-none'
                    : 'rounded-br-full'
                "
                placeholder="Szukaj gry"
              />
            </div>
          </div>
          <TransitionRoot
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ComboboxOptions
              v-if="(selected.length > 0 && textInInput !== '')"
              class="absolute max-h-60 w-full overflow-auto rounded-b-2xl bg-white text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10"
            >
              <ComboboxOption
                v-for="app in selected"
                :key="app.productTitle"
                :value="app.productTitle"
                @click="(textInInput = app.productTitle) && submit()"
              >
                <li
                  class="relative cursor-default select-none py-2 px-8 list-none text-gray-900"
                >
                  <span class="block truncate font-normal">
                    {{ app.productTitle }}
                  </span>
                </li>
              </ComboboxOption>
              <div>
                <button
                  @click="submit()"
                  type="submit"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 float-right transition duration-300 ease-in-out"
                >
                  <span
                    class="absolute left-0 inset-y-0 flex items-center pl-3"
                  >
                    <img
                      draggable="false"
                      class="block h-6 w-auto"
                      src="../assets/gameify-mark-white-500.svg"
                      alt="Gameify"
                    />
                  </span>
                  Szukaj w Gameify
                </button>
              </div>
            </ComboboxOptions>
          </TransitionRoot>
        </Combobox>
      </div>
    </div>

    <div>
      <button
        @click="submit()"
        type="submit"
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 outline-none focus:ring-indigo-500 float-right transition duration-300 ease-in-out rounded-full"
      >
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          <img
            draggable="false"
            class="block h-6 w-auto"
            src="../assets/gameify-mark-white-500.svg"
            alt="Gameify"
          />
        </span>
        Szukaj w Gameify
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Combobox, ComboboxInput } from "@headlessui/vue";
import axios from "axios";
import { Ref, ref } from "vue";
import { ProductsProposed } from "./Proposed.vue";

const selected: Ref<never[] | ProductsProposed[]> = ref([]);
const textInInput = ref("");
const searchDelay = 1000;
let typingTimer: NodeJS.Timeout;
const emit = defineEmits(["updatedParams"]);

function doneTyping() {
  axios
    .get<ProductsProposed[]>(
      `${import.meta.env.VITE_BACKEND}/search?itemName=${textInInput.value}`
    )
    .then((res) => {
      console.log(res.data);
      if (!res.data) return;
      selected.value = res.data;
    })
    .catch((err) => {});
}

function onChange() {
  if (textInInput.value === "") return;
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, searchDelay);
}

function submit() {
  if (!textInInput.value || textInInput.value === "") return;
  const params = new URLSearchParams(window.location.search);
  params.set("item", textInInput.value);
  textInInput.value = "";
  window.history.replaceState(
    {},
    "",
    `${location.pathname}?${params.toString()}`
  );
  emit("updatedParams");
}
</script>
