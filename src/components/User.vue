<template>
  <section>
    <slot name="user" :user="user" :loading="loading"> </slot>
  </section>
</template>

<script lang="ts">
import firebase from 'firebase/app';
import { ref, defineComponent } from '@vue/composition-api';
import { auth } from '@/firebase';

export default defineComponent({
  setup() {
    const user = ref<firebase.User | null>(null);
    const loading = ref<boolean>(true);
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      user.value = firebaseUser;
      loading.value = false;
    });
    return { user, loading, unsubscribe };
  },
  destroyed() {
    this.unsubscribe();
  }
});
</script>
