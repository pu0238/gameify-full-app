<template>
  <Disclosure as="nav">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        ></div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div class="dropdown">
            <button
              type="button"
              class="p-1 rounded-full text-gray-300 hover:text-white focus:outline-none relative dropbtn"
            >
              <span class="sr-only">View notifications</span>
              <span class="flex h-3 w-3 absolute right-0.5 top-0">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"
                ></span>
                <span
                  class="relative inline-flex rounded-full h-3 w-3 bg-indigo-600"
                ></span>
              </span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
            <div class="justify-between sm:w-fit md:w-max bg-white text-gray-600 py-2 px-4 rounded-lg md:rounded-full top-0 right-full dropdown-content font-semibold text-sm">
              <h3>Powiadomienia o oczekiwanej cenie? Wkrótce!</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure } from "@headlessui/vue";
import { BellIcon } from "@heroicons/vue/outline";
</script>
