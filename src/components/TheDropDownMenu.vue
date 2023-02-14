<script setup lang="ts">
import { ref, onMounted, computed, provide, inject } from "vue";

type Props = {
  text: string;
  closeOthers?: boolean;
};

const isOpening = ref(false);
const props = withDefaults(defineProps<Props>(), {
  closeOthers: true,
});

const dropdownMenu = ref<HTMLElement>();
const dropdownTrigger = ref<HTMLElement>();
const height = ref(0);

const isOpen = ref(false);
const isRoot = computed(() => {
  const el = dropdownMenu.value?.parentNode?.parentNode
    ?.parentNode as HTMLElement;
  return el?.id === "dropdown-root";
});

const closeAllDropdownMenu = inject("closeAllDropdownMenu") as () => void;
const toggleDropdownMenu = () => {
  if (dropdownMenu.value) {
    if (props.closeOthers && isRoot.value && !isOpen.value) {
      closeAllDropdownMenu();
    }
    dropdownMenu.value.classList.toggle("dd-nav-opacity-0");
    dropdownMenu.value.classList.toggle("dd-nav-pointer-events-auto");
    isOpen.value = !isOpen.value;
  }
};

const closeDropdownMenu = () => {
  if (isOpen.value) {
    toggleDropdownMenu();
  }
};

const openParentDropdownMenu = inject(
  "openParentDropdownMenu",
  () => {}
) as () => void;
const openDropdownMenu = () => {
  isOpening.value = true;
  openParentDropdownMenu();
  if (dropdownMenu.value && !isOpen.value) {
    dropdownMenu.value.classList.toggle("dd-nav-opacity-0");
    dropdownMenu.value.classList.toggle("dd-nav-pointer-events-auto");
    isOpen.value = true;
  }
  setTimeout(() => {
    isOpening.value = false;
  });
};

const addCloseDropdownMenuCallback = inject("addCloseDropdownMenuCallback") as (
  callback: () => void
) => void;
addCloseDropdownMenuCallback(() => {
  if (!isOpening.value) {
    closeDropdownMenu();
  }
});

onMounted(() => {
  if (dropdownMenu.value) {
    height.value = dropdownMenu.value.clientHeight;
    dropdownMenu.value.style.height = "0px";
  }
});

provide("openParentDropdownMenu", openDropdownMenu);
defineExpose({
  openDropdownMenu,
  closeDropdownMenu,
});
</script>
<template>
  <li>
    <button
      class="dd-nav-flex dd-nav-items-center dd-nav-justify-between dd-nav-w-full dd-nav-py-2 dd-nav-px-4 dd-nav-font-medium dd-nav-text-gray-700 dd-nav-rounded hover:dd-nav-bg-gray-100 md:dd-nav-px-4 md:dd-nav-border-0 md:hover:dd-nav-bg-gray-100 dark:dd-nav-text-gray-400 dark:hover:dd-nav-text-white dark:focus:dd-nav-text-white dark:dd-nav-border-gray-700 dark:hover:dd-nav-bg-gray-700 md:dark:hover:dd-nav-bg-gray-600"
      @click="toggleDropdownMenu"
      ref="dropdownTrigger"
    >
      {{ props.text }}
      <svg
        class="dd-nav-w-5 dd-nav-h-5 dd-nav-ml-1"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>

    <div
      ref="dropdownMenu"
      class="dd-nav-opacity-0 dd-nav-pointer-events-none dd-nav-duration-200 dd-nav-z-10 dd-nav-w-full dd-nav-font-normal dd-nav-bg-white dd-nav-divide-y dd-nav-divide-gray-100 dd-nav-rounded-lg dd-nav-shadow md:dd-nav-w-44 dark:dd-nav-bg-gray-700 dark:dd-nav-divide-gray-600"
      :class="{ 'md:dd-nav-absolute': isRoot }"
      :style="{
        height: isOpen ? 'unset' : '0px',
        minHeight: isOpen ? `${height}px` : 'unset',
      }"
    >
      <ul
        class="dd-nav-py-2 dd-nav-text-sm dd-nav-text-gray-700 dark:dd-nav-text-gray-400"
        aria-labelledby="dropdownLargeButton"
      >
        <slot></slot>
      </ul>
    </div>
  </li>
</template>
