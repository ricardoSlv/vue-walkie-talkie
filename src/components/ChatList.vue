<template>
  <section>
    <ul>
      <li v-for="chat in chats" :key="chat.id">
        <router-link :to="`/chats/${uid}`">
          {{ chat.id }}
        </router-link>
      </li>
    </ul>
    <button class="button" @click="createChatRoom()">
      Create new Chat Room
    </button>
  </section>
</template>

<script lang="ts">
import firebase from 'firebase/app'
import { db } from '@/firebase'
import Vue from 'vue'

export default Vue.extend({
  props: ['uid'],
  data: (): { chats: { id: string }[] } => ({
    chats: []
  }),
  methods: {
    async createChatRoom() {
      try {
        const newChat = await db.collection('chats').add({
          createdAt: firebase.firestore.Timestamp.now(),
          owner: this.uid,
          members: [this.uid]
        })
        console.log('newChat', newChat)
      } catch (e) {
        console.log('e.message', e.message)
      }
    }
  },
  firestore() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chats: db.collection('chats').where('owner', '==', (this as any).uid)
    }
  }
})
</script>
