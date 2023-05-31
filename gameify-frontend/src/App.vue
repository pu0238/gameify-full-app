<template>
  <HomeMenu />
  <!---->
  <SearchContainer @updated-params="updatedParams()" />
  <Proposed @updated-params="updatedParams()" />
  <ProductsCart
    v-if="currentProduct"
    :product-name="currentProduct"
    :open="open"
    @close="closedProductsCart()"
  />
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";

import HomeMenu from "./components/HomeMenu.vue";
import SearchContainer from "./components/SearchContainer.vue";
import Proposed from "./components/Proposed.vue";
import ProductsCart from "./components/ProductsCart.vue";

const currentProduct: Ref<null | string> = ref(null);
const open: Ref<boolean> = ref(false);

function updatedParams() {
  const params = new URLSearchParams(window.location.search);
  currentProduct.value = params.get("item");
  if (currentProduct.value) {
    open.value = true;
  }
}

function closedProductsCart() {
  const params = new URLSearchParams(window.location.search);
  params.delete("item");
  const paramsStr = params.toString();
  open.value = false;
  if (paramsStr === "") {
    return window.history.replaceState({}, "", location.pathname);
  }
  return window.history.replaceState(
    {},
    "",
    `${location.pathname}?${paramsStr}`
  );
}

updatedParams();
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
