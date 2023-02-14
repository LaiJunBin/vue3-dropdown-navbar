<script setup lang="ts">
import { getCurrentInstance, inject } from "vue";
import { RouterLink } from "vue-router";

type Props = {
  link?: string;
  alt?: string;
  imageUrl?: string;
  native?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  link: "",
  alt: "Logo",
  imageUrl: "",
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
  <component
    class="dd-nav-flex dd-nav-items-center dd-nav-py-2"
    @click="onClick"
    :is="isUsingRouterLink ? RouterLink : 'a'"
    :[propKey]="props.link"
  >
    <img
      v-if="props.imageUrl"
      :src="props.imageUrl"
      class="dd-nav-h-6 dd-nav-mr-3 sm:dd-nav-h-10"
      :alt="props.alt"
    />
    <div
      v-else
      class="dd-nav-w-0 dd-nav-h-0 dd-nav-mr-2 dd-nav-border-0 dd-nav-border-x-[15px] dd-nav-border-b-[40px] dd-nav-border-[transparent_transparent_#00d9ff_transparent]"
    ></div>
    <span
      class="dd-nav-self-center dd-nav-text-xl dd-nav-font-semibold dd-nav-whitespace-nowrap dark:dd-nav-text-white"
    >
      <slot></slot>
    </span>
  </component>
</template>
