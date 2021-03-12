<template>
  <div class="message" :class="{ 'from-user': owner }">
    {{ msg.text }}
    <br />
    <span class="sender"> from UID {{ msg.uid }}</span>
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
}

.from-user {
  background: #91bbff;
  margin-left: auto;
}

.sender {
  font-size: 0.5rem;
}
</style>