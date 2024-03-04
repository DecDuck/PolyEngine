<template>
  <div class="bg-white px-4 py-5 sm:px-6">
    <div
      class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
    >
      <div class="ml-4 mt-2">
        <h3 class="text-base font-semibold leading-6 text-gray-900">Packs</h3>
      </div>
    </div>
  </div>
  <ul role="list" class="space-y-4">
    <li
      v-for="pack in packs"
      :key="pack._id"
      class="relative flex justify-between py-5 hover:bg-gray-50 transition px-4 rounded-xl"
    >
      <div class="flex gap-x-4 pr-6 sm:w-1/2 sm:flex-none">
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">
            <NuxtLink :href="`/servers/${pack.metadata.serverId}`">
              <span class="absolute inset-x-0 -top-px bottom-0" />

              Pack ID: {{ pack.objId }}
            </NuxtLink>
          </p>
          <p class="mt-1 flex text-xs leading-5 text-gray-500">
            Pushed to "{{ pack.server.name }}"
            {{ timeAgo.format(parseInt(pack.metadata.uploaded)) }}
          </p>
        </div>
      </div>
      <div class="flex items-center justify-end gap-x-4 sm:w-1/2 sm:flex-none">
        <ChevronRightIcon
          class="h-5 w-5 flex-none text-gray-400"
          aria-hidden="true"
        />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/24/outline";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en");

const servers: Array<{ _id: string }> = await $fetch("/api/servers/fetch");
const packs: Array<{
  _id: string;
  objId: string;
  metadata: { uploaded: string; serverId: string };
  server: { name: string };
}> =
  servers.length > 0
    ? await $fetch(
        `/api/packs/fetch?servers=${servers.map((e) => e._id).join(",")}`
      )
    : [];

useHead({
  title: "Packs",
});
</script>
