<script setup lang="ts">
import { getCurrentInstance, inject } from "vue";
import { RouterLink } from "vue-router";

type Props = {
  link?: string;
  native?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  link: "",
  native: false,
});

const app = getCurrentInstance();
const closeAllDropdownMenu = inject("closeAllDropdownMenu") as () => void;
const isUsingRouterLink =
  app?.appContext.components["RouterLink"] !== undefined && !props.native;
const propKey = isUsingRouterLink ? "to" : "href";

const onClick = (e: MouseEvent) => {
  if (props.link === "") {
    e.preventDefault();
  }
  closeAllDropdownMenu();
};
</script>

<template>
  <li>
    <component
      class="dd-nav-block dd-nav-px-4 dd-nav-py-2 hover:dd-nav-bg-gray-100 dark:dd-nav-text-gray-400 dark:hover:dd-nav-bg-gray-600 dark:hover:dd-nav-text-white"
      @click="onClick"
      :is="isUsingRouterLink ? RouterLink : 'a'"
      :[propKey]="props.link"
    >
      <slot></slot>
    </component>
  </li>
</template>
