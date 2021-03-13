<template>
  <main class="home">
    <h3>Home</h3>
    <User>
      <template v-slot:user="{ user, loading }">
        <template v-if="loading"> Loading ... </template>
        <template v-else-if="user">
          <UserProfile :user="user" />
          <ChatList :uid="user.uid" />
        </template>
        <Login v-else />
      </template>
    </User>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import User from '@/components/User.vue';
import Login from '@/components/Login.vue';
import ChatList from '@/components/ChatList.vue';
import UserProfile from '@/components/UserProfile.vue';

export default Vue.extend({
  components: { Login, User, UserProfile, ChatList }
});
</script>
