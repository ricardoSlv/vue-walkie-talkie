<template>
  <section>
    Logged in as {{ user.uid }}
    <button @click="auth.signOut()" class="button">Sign Out</button>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { auth } from '@/firebase'

export default Vue.extend({
  props: ['user'],
  data: () => ({ auth }),
})
</script>
