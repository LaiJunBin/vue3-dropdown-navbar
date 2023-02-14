<script setup lang="ts">
import TheDropDownNavbar from "./components/TheDropDownNavbar.vue";
import TheDropDownMenu from "./components/TheDropDownMenu.vue";
import TheDropDownItem from "./components/TheDropDownItem.vue";
import TheDropDownDivideBlock from "./components/TheDropDownDivideBlock.vue";
import { ref } from "vue";

const dropdownMenu1 = ref<InstanceType<typeof TheDropDownMenu>>();
const dropdownMenu2 = ref<InstanceType<typeof TheDropDownMenu>>();
const toggleDarkMode = () => {
  document.documentElement.classList.toggle("dd-nav-dark");
};
</script>

<template>
  <TheDropDownNavbar>
    <TheDropDownItem link="/home" :native="true">Native Home</TheDropDownItem>
    <TheDropDownItem link="/home">Home</TheDropDownItem>
    <TheDropDownMenu text="Dropdown 1" ref="dropdownMenu1">
      <TheDropDownItem>Dropdown Item 1</TheDropDownItem>
      <TheDropDownItem>Dropdown Item 2</TheDropDownItem>
      <TheDropDownMenu text="Dropdown Item 3">
        <TheDropDownItem>Dropdown Item 3-1</TheDropDownItem>
        <TheDropDownItem>Dropdown Item 3-2</TheDropDownItem>
      </TheDropDownMenu>
      <TheDropDownDivideBlock>
        <TheDropDownItem>Sign out</TheDropDownItem>
      </TheDropDownDivideBlock>
    </TheDropDownMenu>
    <TheDropDownMenu text="Dropdown 2" ref="dropdownMenu2">
      <TheDropDownItem>Dropdown Item 1</TheDropDownItem>
      <TheDropDownMenu text="Dropdown Item 2">
        <TheDropDownItem>Dropdown Item 2-1</TheDropDownItem>
        <TheDropDownItem>Dropdown Item 2-2</TheDropDownItem>
      </TheDropDownMenu>
    </TheDropDownMenu>
    <TheDropDownItem @click="toggleDarkMode">Toggle Dark Mode</TheDropDownItem>
  </TheDropDownNavbar>

  <div class="dd-nav-flex dd-nav-justify-center dd-nav-mt-2">
    <button
      class="dd-nav-border dd-nav-bg-blue-500 dd-nav-text-white dd-nav-px-4 dd-nav-py-2 dd-nav-rounded-lg"
      @click="dropdownMenu1?.openDropdownMenu"
    >
      Open Dropdown Menu 1
    </button>
    <button
      class="dd-nav-border dd-nav-bg-blue-500 dd-nav-text-white dd-nav-px-4 dd-nav-py-2 dd-nav-rounded-lg"
      @click="dropdownMenu2?.openDropdownMenu"
    >
      Open Dropdown Menu 2
    </button>
  </div>
</template>
