<template>
  <main>
    <h3>Welcome to ChatRoom {{ chatId }}</h3>
    <User>
      <template v-slot:user="{ user }">
        <ul>
          <li v-for="msg in messages" :key="msg.id">
            <ChatMessage :msg="msg" :owner="user.uid == msg.sender" />
          </li>
        </ul>

        <form @submit.prevent="addMessage(user.uid)">
          <input v-model="newMessageText" class="input" />
          <button
            :disabled="!newMessageText || loading"
            type="submit"
            class="button is-success"
          >
            Send
          </button>
        </form>
      </template>
    </User>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase/app';
import { db } from '@/firebase';
import User from '@/components/User.vue';
import ChatMessage from '@/components/ChatMessage.vue';

export default Vue.extend({
  components: { User, ChatMessage },
  data: (): {
    newMessageText: string;
    loading: boolean;
    messages: { id: string; sender: string; text: string }[];
  } => ({
    newMessageText: '',
    loading: false,
    messages: []
  }),
  computed: {
    chatId(): string {
      return this.$route.params.uid;
    },
    messagesCollection() {
      const chat = db.doc(`chats/${this.chatId}`);
      const msgs = chat.collection('messages');
      return msgs;
    }
  },
  methods: {
    async addMessage(uid: string) {
      try {
        this.loading = true;

        const { id: msgId } = this.messagesCollection.doc();

        await this.messagesCollection.doc(msgId).set({
          text: this.newMessageText,
          sender: uid,
          createdAt: firebase.firestore.Timestamp.now()
        });

        this.loading = false;
        this.newMessageText = '';
      } catch (e) {
        console.log('e.message', e.message);
      }
    }
  },
  firestore() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messages: (this as any).messagesCollection.orderBy('createdAt').limit(10)
    };
  }
});
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  min-width: 500px;
  background: #efefef;
  border-radius: 0;
}

li {
  display: flex;
}
</style>