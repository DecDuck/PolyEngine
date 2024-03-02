<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <form
                @submit.prevent="() => createNewServer()"
                class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
              >
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <ServerIcon
                      class="h-6 w-6 text-emerald-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-gray-900"
                      >Create New Server</DialogTitle
                    >
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Enter a name to create a new server to start uploading
                        packs for.
                      </p>
                    </div>
                    <div class="mt-2">
                      <label for="server-name" class="sr-only"
                        >Server Name</label
                      >
                      <input
                        type="text"
                        name="server-name"
                        id="server-name"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                        placeholder="Server Name"
                        v-model="serverName"
                      />
                    </div>
                  </div>
                </div>
              </form>
              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  type="submit"
                  class="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 sm:ml-3 sm:w-auto"
                >
                  Create
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="open = false"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <div class="bg-white px-4 py-5 sm:px-6">
    <div
      class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
    >
      <div class="ml-4 mt-2">
        <h3 class="text-base font-semibold leading-6 text-gray-900">Servers</h3>
      </div>
      <div class="ml-4 mt-2 flex-shrink-0">
        <button
          @click="() => (open = true)"
          type="button"
          class="relative inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Create new server
        </button>
      </div>
    </div>
  </div>
  <ul role="list" class="space-y-4">
    <li
      v-for="server in servers"
      :key="server._id"
      class="relative flex justify-between py-5 hover:bg-gray-50 transition px-4 rounded-xl"
    >
      <div class="flex gap-x-4 pr-6 sm:w-1/2 sm:flex-none">
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">
            <NuxtLink :href="`/servers/${server._id}`">
              <span class="absolute inset-x-0 -top-px bottom-0" />
              {{ server.name }}
            </NuxtLink>
          </p>
          <p class="mt-1 flex text-xs leading-5 text-gray-500">
            {{ server._id }}
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
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  ChevronRightIcon,
  ExclamationTriangleIcon,
  ServerIcon,
} from "@heroicons/vue/24/outline";

const open = ref(false);
const serverName = ref("");

const router = useRouter();

async function createNewServer() {
  const response: { id: string } = await $fetch("/api/servers/new", {
    body: { name: serverName.value },
    method: "POST",
  });
  router.push(`/servers/${response.id}`);
}

const servers: Array<{
  _id: string;
  name: string;
  packs: Array<string>;
  accessId: string;
}> = await $fetch("/api/servers/fetch");

useHead({
  title: "Servers"
})
</script>
