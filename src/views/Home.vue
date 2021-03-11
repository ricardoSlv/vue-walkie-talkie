<template>
  <div class="home">
    <h3>Home</h3>
    <User>
      <template v-slot:user="{ user }">
        <UserProfile v-if="user" :user="user" />
        <Login v-else />
      </template>
    </User>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import User from '@/components/User.vue'
import Login from '@/components/Login.vue'
import UserProfile from '@/components/UserProfile.vue'

export default Vue.extend({
  components: { Login, User, UserProfile },
})
</script>
