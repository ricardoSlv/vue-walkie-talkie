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
            :disabled="(!newMessageText && !newAudio) || loading"
            type="submit"
            class="button is-success"
          >
            Send
          </button>
        </form>

        <hr />
        <h5>Record Audio</h5>
        <button v-if="!recorder" @click="record()" class="button is-primary">
          Record
        </button>
        <button v-else @click="stop()" class="button is-danger">Stop</button>
        <audio v-if="newAudio" :src="newAudioURL" controls></audio>
        <hr />
      </template>
    </User>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase/app';
import { db, storage } from '@/firebase';
import User from '@/components/User.vue';
import ChatMessage from '@/components/ChatMessage.vue';

export default Vue.extend({
  components: { User, ChatMessage },
  data: (): {
    newMessageText: string;
    loading: boolean;
    messages: { id: string; sender: string; text: string }[];
    newAudio: Blob | null;
    recorder: MediaRecorder | null;
  } => ({
    newMessageText: '',
    loading: false,
    messages: [],
    newAudio: null,
    recorder: null
  }),
  computed: {
    chatId(): string {
      return this.$route.params.uid;
    },
    messagesCollection() {
      const chat = db.doc(`chats/${this.chatId}`);
      const msgs = chat.collection('messages');
      return msgs;
    },
    newAudioURL() {
      return URL.createObjectURL(this.newAudio);
    }
  },
  methods: {
    async addMessage(uid: string) {
      try {
        this.loading = true;

        let audioURL = null;

        const { id: msgId } = this.messagesCollection.doc();

        if (this.newAudio) {
          const storageRef = storage
            .ref('chats')
            .child(this.chatId)
            .child(`${msgId}.wav`);

          await storageRef.put(this.newAudio);

          audioURL = await storageRef.getDownloadURL();
        }

        await this.messagesCollection.doc(msgId).set({
          text: this.newMessageText,
          sender: uid,
          createdAt: firebase.firestore.Timestamp.now(),
          audioURL: audioURL
        });

        this.loading = false;
        this.newMessageText = '';
        this.newAudio = null;
      } catch (e) {
        console.log('e.message', e.message);
      }
    },
    async record() {
      this.newAudio = null;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });

      const options = { mimeType: 'audio/webm' };
      const recordedChunks: Blob[] = [];
      this.recorder = new MediaRecorder(stream, options);
      this.recorder?.addEventListener('dataavailable', (e: BlobEvent) => {
        if (e.data.size > 0) recordedChunks.push(e.data);
      });
      this.recorder.addEventListener('stop', () => {
        this.newAudio = new Blob(recordedChunks);
        console.log(this.newAudio);
      });
      this.recorder.start();
    },
    async stop() {
      this.recorder?.stop();
      this.recorder = null;
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