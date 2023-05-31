<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto py-2 lg:pt-4 lg:pb-32 lg:max-w-none">
        <div v-if="topSellers.length != 0">
          <h2 class="text-2xl font-extrabold text-white">
            Proponowane produkty
          </h2>
          <div
            class="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6"
          >
            <div v-for="item in topSellers">
              <ProposedItem
                :item-name="item.productTitle"
                :item-url="item.productImg"
                @click="openItem(item.productTitle)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted, Ref } from "vue";

import ProposedItem from "./ProposedItem.vue";

export interface ProductsProposed {
  productTitle: string;
  productImg: string;
  slug: string;
}

const topSellers: Ref<never[] | ProductsProposed[]> = ref([]);
const emit = defineEmits(["updatedParams"]);

function openItem(name: string) {
  const splitedName = name.split(" ");
  const params = new URLSearchParams(window.location.search);
  if (splitedName.length < 4) params.set("item", name);
  else params.set("item", splitedName.slice(0, 4).join("%20"));
  window.history.replaceState(
    {},
    "",
    `${location.pathname}?${params.toString()}`
  );
  emit("updatedParams");
}

onMounted(async () => {
  axios
    .get<ProductsProposed[]>(
      `${import.meta.env.VITE_BACKEND}/product/proposed?quantity=6`
    )
    .then((res) => {
      if (res.data) topSellers.value = res.data;
    })
    .catch((err) => {});
});
</script>
