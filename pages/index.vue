<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex xs12 sm8></v-flex>
    <v-card min-width="30%">
      <v-card-title>
        <h3>Nuxt чат</h3>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="name"
            :counter="16"
            :rules="nameRules"
            label="Ваше имя"
            required
          ></v-text-field>

          <v-text-field
            v-model="room"
            :rules="roomRules"
            label="Введите комнату"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="submit"
          >
            Войти
          </v-btn>

        </v-form>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {

    layout: 'empty',

    head: {
      title: "Добро пожаловать в чат"
    },

    sockets: {
      connect: function () {
        console.log('socket connected')
      }
    },
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Введите имя',
        v => (v && v.length <= 16) || 'Имя не долдно превышать 16 символов',
      ],
      room: '',
      roomRules: [
        v => !!v || 'Введите комнату',
      ],
    }),

    methods: {
      ...mapMutations(['setUser']),
      submit() {
        if (this.$refs.form.validate()) {
          const user = {
            name: this.name,
            room: this.room
          };

          this.setUser(user);
          this.$router.push('/chat')
        }
      },
    }

  }
</script>
