<template>
  <vx-card no-shadow>
    <!-- Img Row -->
    <div class="flex flex-wrap items-center mb-base">
      <vs-avatar :src="activeUserInfo.photoURL" size="70px" class="mr-4 mb-4" />
      <div>
        <vs-button class="mr-4 sm:mb-0 mb-2">Upload photo</vs-button>
        <vs-button type="border" color="danger">Remove</vs-button>
        <p class="text-sm mt-2">Allowed JPG, GIF or PNG. Max size of 800kB</p>
      </div>
    </div>

    <!-- Info -->
    <div class="vx-row">
      <div class="vx-col w-full md:w-6/12 mb-8">
        <span class="text-base">Card Type : </span>
        <span class="text-base font-bold">NIP</span>
      </div>
      <div class="vx-col w-full md:w-6/12 mb-8">
       <span class="text-base">Card Number : </span>
        <span class="text-base font-bold">248328847438</span>
      </div>
      <div class="vx-col w-full">
        <vs-input
          class="w-full mb-base"
          label-placeholder="Username"
          v-model="username"
        ></vs-input>
      </div>
      <div class="vx-col w-full">
        <vs-input
          class="w-full mb-base"
          label-placeholder="Name"
          v-model="name"
        ></vs-input>
      </div>
      <div class="vx-col w-full">
        <span class="block mb-1 text-xs">Phone Number</span>
        <vs-input
          class="w-full mb-base"
          v-model="phone_number"
        ></vs-input>
      </div>
      <div class="vx-col w-full">
        <span class="block text-xs mb-1">Address</span>
        <vs-textarea v-model="address" />
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2">Save Changes</vs-button>
      <vs-button class="ml-4 mt-2" type="border" color="warning"
        >Reset</vs-button
      >
    </div>
  </vx-card>
</template>

<script>
export default {
  data() {
    return {
      username: "johny_01",
      name: this.$store.state.AppActiveUser.displayName,
      email: "john@admin.com",
      company: "SnowMash Technologies Pvt Ltd",
    };
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
};
</script>
