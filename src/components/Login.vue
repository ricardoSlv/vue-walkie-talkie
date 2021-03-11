<template>
  <aside>
    <h3>Sign in Anonymously</h3>
    <button @click="auth.signInAnonymously()" class="button">Sign In</button>

    <header>
      <div v-if="newUser">
        <h3>Sign Up for a New Account</h3>
        <a href="#" @click="newUser = false"> Returning User?</a>
      </div>
      <div v-else>
        <h3>Sign In with Email</h3>
        <a href="#" @click="newUser = true"> New User?</a>
      </div>
    </header>
    <form @submit.prevent="signInOrCreateUser()">
      <label class="label" for="email">Email</label>
      <input
        name="email"
        type="email"
        class="input"
        placeholder="Email"
        v-model="credentials.email"
      />
      <label class="label" for="password">Password</label>
      <input
        name="password"
        type="password"
        class="input"
        placeholder="Password"
        v-model="credentials.password"
      />
      <button
        class="button is-info"
        :class="{ 'is-loading': loading }"
        type="submit"
      >
        {{ newUser ? 'Sign Up' : 'Login' }}
      </button>
      {{ credentials.email + credentials.password }}
      <p class="has-text-danger" v-if="errorMessage">
        {{ errorMessage }}
      </p>
    </form>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue'
import { auth } from '@/firebase'

export default Vue.extend({
  data: () => ({
    auth,
    newUser: false,
    loading: false,
    errorMessage: '',
    credentials: { email: '', password: '' },
  }),
  methods: {
    async signInOrCreateUser() {
      const { email, password } = this.credentials
      this.loading = true
      try {
        if (this.newUser)
          await auth.createUserWithEmailAndPassword(email, password)
        else await auth.signInWithEmailAndPassword(email, password)
      } catch (error) {
        this.errorMessage = error.message
      }
      this.loading = false
    },
  },
})
</script>
