<template>
  <div id="app">
    <header>
      <h1>Vue Walkie Talkie</h1>
      <p>Realtime Voice Chat</p>
    </header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { auth } from '@/firebase'
console.log('auth', auth)

export default Vue.extend({
  name: 'App',
  components: {},
})
</script>

<style>
</style>
