<template>
  <section>
    <slot name="user" :user="user"> </slot>
  </section>
</template>

<script lang="ts">
import firebase from 'firebase/app'
import { ref, defineComponent } from '@vue/composition-api'
import { auth } from '@/firebase'

export default defineComponent({
  setup() {
    const user = ref<firebase.User | null>(null)
    const unsubscribe = auth.onAuthStateChanged(
      (firebaseUser) => (user.value = firebaseUser)
    )
    return { user, unsubscribe }
  },
  destroyed() {
    this.unsubscribe()
  },
})
</script>
