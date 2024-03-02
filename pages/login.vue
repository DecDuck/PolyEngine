<template>
  <div
    class="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-sm space-y-10">
      <div>
        <Logo class="mx-auto h-10 w-auto text-emerald-600" />
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Sign in to your account
        </h2>
      </div>
      <form @submit.prevent="action" class="space-y-6">
        <div class="relative -space-y-px rounded-md shadow-sm">
          <div
            class="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300"
          />
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
              placeholder="Email address"
              v-model="email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
              placeholder="Password"
              v-model="password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full h-9 justify-center items-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <span v-if="!loading">Sign in</span>

            <div v-else role="status">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-transparent animate-spin fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </button>

          <div v-if="error" class="mt-3 rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  Invalid email, password or other credential.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </form>

      <p class="text-center text-sm leading-6 text-gray-500">
        Don't have an account?
        {{ " " }}
        <a
          href="#"
          class="font-semibold text-emerald-600 hover:text-emerald-500"
          >Sign up here &rarr;</a
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XCircleIcon } from "@heroicons/vue/20/solid";
definePageMeta({
  layout: false,
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/packs",
  },
});

const email = ref();
const password = ref();
const loading = ref(false);
const error = ref(false);

const router = useRouter();

async function action() {
  error.value = false;
  loading.value = true;
  if (await signIn()) {
    router.push("/packs");
  } else {
    error.value = true;
  }
  loading.value = false;
}

async function signIn() {
  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: { email: email.value, password: password.value },
    });
    return true;
  } catch (e) {
    return false;
  }
}
</script>
