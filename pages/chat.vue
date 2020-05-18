<template>
  <div class="chat-wrap">
    <div class="chat-chat" ref="block">

      <message
        v-for="m in messages" :key="m.text"
        :name="m.name"
        :text="m.text"
        :owner="m.id === user.id"
      />

    </div>
    <div class="chat-form">
      <chat-form/>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Message from "../components/Message";
  import ChatForm from "../components/ChatForm";
    export default {
      components: {ChatForm, Message},
      comments: {
        Message,
        ChatForm
      },

      middleware: ['chat'],

      head() {
        return {
          title: `Комната ${this.user.room}`
        }
      },
      computed: mapState(['user', 'messages']),

      watch: {
        messages() {
          this.$nextTick(() => {
            return this.$refs.block.scrollTop = this.$refs.block.scrollHeight
          })
        }
      }

    }
</script>

<style scoped>

  .chat-wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .chat-chat {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 80px;
    padding: 1rem;
    overflow-y: auto;
  }

  .chat-form {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: #212121;
  }
</style>
