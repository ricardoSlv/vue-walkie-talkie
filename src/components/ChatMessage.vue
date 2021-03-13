<template>
  <div class="message" :class="{ 'from-user': owner }">
    <p v-if="msg.text" class="pl-2">
      {{ msg.text }}
    </p>
    <audio v-if="msg.audioURL" :src="msg.audioURL" controls></audio>
    <span class="sender"> from UID {{ msg.sender }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: ['msg', 'owner']
});
</script>

<style>
.message {
  background: #dddddd;
  color: black;
  border-radius: 5px;
  padding: 12px;
  min-width: 330px;
  max-width: 50%;
}

.from-user {
  background: #91bbff;
  margin-left: auto;
}

.sender {
  font-size: 0.5rem;
  margin-left: auto;
  text-align: end;
  display: block;
  padding: 1em 0px;
  width: 100%;
}
</style>