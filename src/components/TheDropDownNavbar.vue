<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from "vue";
import TheDropDownNavbarLogo from "./TheDropDownNavbarLogo.vue";

const navbarDropdown = ref<HTMLElement>();
const logo = ref<HTMLElement>();
const closeDropdownMenuCallbacks = ref<(() => void)[]>([]);

const toggleNavbarDropdown = () => {
  if (navbarDropdown.value) {
    navbarDropdown.value.classList.toggle("dd-nav-hidden");
  }
};

const addCloseDropdownMenuCallback = (callback: () => void) => {
  closeDropdownMenuCallbacks.value.push(callback);
};

const closeAllDropdownMenu = () => {
  closeDropdownMenuCallbacks.value.forEach((callback) => callback());
};

const onClickEvent = (e: MouseEvent) => {
  if ((e.target as Element).getAttribute("no-close-others") !== null) {
    return;
  }

  if (
    !navbarDropdown.value?.contains(e.target as Node) &&
    !logo.value?.contains(e.target as Node)
  ) {
    closeAllDropdownMenu();
  }
};
onMounted(() => {
  if (navbarDropdown.value) {
    navbarDropdown.value.classList.add("dd-nav-hidden");
    navbarDropdown.value.classList.remove("dd-nav-invisible");
  }

  window.addEventListener("click", onClickEvent);
});

onUnmounted(() => {
  window.removeEventListener("click", onClickEvent);
});

provide("addCloseDropdownMenuCallback", addCloseDropdownMenuCallback);
provide("closeAllDropdownMenu", closeAllDropdownMenu);

defineExpose({
  closeAllDropdownMenu,
});
</script>
<template>
  <nav
    class="dd-nav-px-2 dd-nav-bg-white dd-nav-border-gray-200 dark:dd-nav-bg-gray-900 dark:dd-nav-border-gray-700"
  >
    <div
      class="dd-nav-container dd-nav-flex dd-nav-flex-wrap dd-nav-items-center dd-nav-justify-between dd-nav-mx-auto"
    >
      <div ref="logo">
        <slot name="logo">
          <TheDropDownNavbarLogo>Vue3 DropDown Navbar</TheDropDownNavbarLogo>
        </slot>
      </div>
      <button
        type="button"
        class="dd-nav-inline-flex dd-nav-items-center dd-nav-p-2 dd-nav-h-9 dd-nav-my-4 dd-nav-ml-3 dd-nav-mr-1 dd-nav-text-sm dd-nav-text-gray-500 dd-nav-rounded-lg md:dd-nav-hidden hover:dd-nav-bg-gray-100 focus:dd-nav-outline-none focus:dd-nav-ring-2 focus:dd-nav-ring-gray-200 dark:dd-nav-text-gray-400 dark:hover:dd-nav-bg-gray-700 dark:focus:dd-nav-ring-gray-600"
        @click="toggleNavbarDropdown"
      >
        <span class="dd-nav-sr-only">open main menu</span>
        <svg
          class="dd-nav-w-6 dd-nav-h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        id="dropdown-root"
        class="dd-nav-invisible dd-nav-w-full md:dd-nav-block md:dd-nav-w-auto"
        ref="navbarDropdown"
      >
        <ul
          class="dd-nav-flex dd-nav-flex-col dd-nav-flex-wrap dd-nav-p-4 dd-nav-mt-2 dd-nav-mb-4 dd-nav-border dd-nav-border-gray-100 dd-nav-rounded-lg dd-nav-bg-gray-50 md:dd-nav-flex-row md:dd-nav-space-x-8 md:dd-nav-my-0 md:dd-nav-text-sm md:dd-nav-font-medium md:dd-nav-border-0 md:dd-nav-bg-white dark:dd-nav-bg-gray-800 md:dark:dd-nav-bg-gray-900 dark:dd-nav-border-gray-700"
        >
          <slot></slot>
        </ul>
      </div>
    </div>
  </nav>
</template>
