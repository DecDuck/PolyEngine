<template>
  <div>
    <div class="px-4 sm:px-0 inline-flex items-center gap-x-4">
      <h3 class="text-base font-semibold leading-7 text-gray-900">
        {{ server.name }}
      </h3>
      <button
        @click="() => del()"
        type="button"
        class="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        Delete
        <TrashIcon class="-mr-0.5 h-5 w-5" aria-hidden="true" />
      </button>
    </div>
    <div class="mt-4 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Server ID</dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ server._id }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Access ID</dt>
          <dd
            v-html="server.accessId"
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          ></dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Packs</dt>
          <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul
              v-if="server.packs.length > 0"
              role="list"
              class="divide-y divide-gray-100 rounded-md border border-gray-200"
            >
              <li
                v-for="pack in server.packs"
                class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
              >
                <div class="flex w-0 flex-1 items-center">
                  <PaperClipIcon
                    class="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <div class="ml-4 flex min-w-0 flex-1 gap-2">
                    <span class="truncate font-medium">{{ pack }}</span>
                  </div>
                  <div>
                    <NuxtLink
                      :href="`/pack.zip?id=${pack}`"
                      target="_blank"
                      class="inline-flex items-center gap-x-1.5 rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Download
                      <ArrowDownTrayIcon
                        class="-mr-0.5 h-5 w-5"
                        aria-hidden="true"
                      />
                    </NuxtLink>
                  </div>
                </div>
              </li>
            </ul>
            <p class="text-gray-700" v-else>No packs have been uploaded.</p>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowDownTrayIcon,
  PaperClipIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();
const router = useRouter();
const server: {
  _id: string;
  name: string;
  packs: Array<string>;
  owner: string;
  accessId: string;
} = await $fetch(`/api/servers/${route.params.id}`);

async function del() {
  await $fetch(`/api/servers/${route.params.id}`, { method: "DELETE" });
  router.push("/servers");
}

useHead({
  title: server.name,
});
</script>
