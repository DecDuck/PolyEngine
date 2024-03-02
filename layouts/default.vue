<template>
  <!--
      This example requires updating your template:
  
      ```
      <html class="h-full">
      <body class="h-full">
      ```
    -->
  <div class="min-h-full">
    <Disclosure
      as="nav"
      class="border-b border-gray-200 bg-white"
      v-slot="{ open }"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="flex flex-shrink-0 items-center">
              <Logo class="block h-8 w-auto text-emerald-600" />
            </div>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink
                v-for="(item, itemIdx) in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  currentRouteIdx == itemIdx
                    ? 'border-emerald-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                ]"
                :aria-current="currentRouteIdx == itemIdx ? 'page' : undefined"
                >{{ item.name }}</NuxtLink
              >
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                  class="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    :src="`https://gravatar.com/avatar/${hash}`"
                    alt=""
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active, close }"
                  >
                    <NuxtLink
                      v-if="!item.forceA"
                      :href="item.href"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      @click="() => close()"
                      >{{ item.name }}</NuxtLink
                    >
                    <a
                      v-else
                      :href="item.href"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                    >
                      {{ item.name }}
                    </a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
          <div class="-mr-2 flex items-center sm:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel
        class="sm:hidden fixed w-full bg-white border-b border-gray-200"
        v-slot="{ close }"
      >
        <div class="space-y-1 pb-3 pt-2">
          <NuxtLink
            v-for="(item, itemIdx) in navigation"
            :key="item.name"
            :href="item.href"
            @click="() => close()"
            :class="[
              currentRouteIdx == itemIdx
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
              'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
            ]"
            :aria-current="currentRouteIdx == itemIdx ? 'page' : undefined"
            >{{ item.name }}</NuxtLink
          >
        </div>
        <div class="border-t border-gray-200 pb-3 pt-4">
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                :src="`https://gravatar.com/avatar/${hash}`"
                alt=""
              />
            </div>
            <div class="ml-3">
              <div class="text-sm font-medium text-gray-500">
                {{ user.email }}
              </div>
            </div>
          </div>
          <div class="mt-3 space-y-1">
            <DisclosureButton
              v-for="item in userNavigation"
              :key="item.name"
              class="block w-full text-left"
            >
              <NuxtLink
                v-if="!item.forceA"
                :href="item.href"
                :class="[
                  'block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800',
                ]"
                @click="close"
                >{{ item.name }}</NuxtLink
              >
              <a
                v-else
                :href="item.href"
                :class="[
                  'block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800',
                ]"
              >
                {{ item.name }}
              </a></DisclosureButton
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <div class="py-10">
      <main>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>

    <div
      v-if="user.needsPasswordChange"
      class="pointer-events-none fixed inset-x-0 bottom-0 sm:px-6 sm:pb-5 lg:px-8"
    >
      <div
        class="pointer-events-auto flex items-center justify-between gap-x-6 bg-gray-900 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5"
      >
        <p class="text-sm leading-6 text-white">
          <NuxtLink to="/profile" class="inline-flex items-center gap-x-2">
            <strong class="font-semibold">Please update your password</strong>
            <div class="w-[2px] h-[2px] bg-white rounded-full" />
            Your password was set automatically, and needs to be updated. Click
            here to go to your profile. <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import {
  Bars3Icon,
  BellIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

const navigation = [
  { name: "Packs", href: "/packs" },
  { name: "Servers", href: "/servers" },
];

const route = useRoute();
const currentRouteIdx = computed(() =>
  navigation.findIndex((e) => route.fullPath.startsWith(e.href))
);

const user = await useState<{
  email: string;
  isAdmin: boolean;
  needsPasswordChange: boolean;
}>("user", () => ({
  email: "loading...",
  isAdmin: false,
  needsPasswordChange: false,
}));

user.value = await $fetch("/api/user");

async function sha256(message: string) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

const hash = ref();

function updateHash() {
  sha256(user.value.email).then((e) => {
    hash.value = e;
  });
}

updateHash();

watch(
  user,
  () => {
    updateHash();
  },
  { deep: true }
);

const userNavigation = computed(
  () =>
    [
      { name: "Your Profile", href: "/profile" },
      user.value.isAdmin ? { name: "Admin Panel", href: "/settings" } : false,
      { name: "Sign out", href: "/api/user/signout", forceA: true },
    ].filter((e) => e) as Array<{
      name: string;
      forceA?: boolean;
      href: string;
    }>
);

useHead({
  titleTemplate: (title) => (title ? `${title} - Polyengine` : `Polyengine`),
});
</script>
