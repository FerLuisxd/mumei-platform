<template>
  <div class="e-nuxt-container">
    <h2>Bienvenidos</h2>
    <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Commands</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="mdi-anchor"
          label="Search"
          single-line
          hide-details
          color="green"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-btn slot="activator" color="green" dark class="mb-2">New</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="name" label="Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-date-picker v-model="date" label="Date"></v-date-picker>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-select v-model="playerId" :items="players" label="Creator"></v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-select v-model="modeId" :items="modes" label="Mode"></v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="game" label="game"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click.native="guardar">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table :headers="headers" :items="tournaments" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-content-start layout px-5">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small class="mr-2" @click="generar(props.item.id)">gavel</v-icon>
            <v-btn @click="toMatch(props.item.id)">Matches</v-btn>
          </td>

          <td>{{ props.item.name }}</td>
          <td>{{ props.item.date }}</td>
          <td>{{ props.item.winner }}</td>
          <td>{{ props.item.playerName }}</td>
          <td>{{ props.item.nTeams }}</td>
          <td>{{ props.item.modeFormat }}</td>
          <td>{{ props.item.game }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
import { remote } from "electron";
import SystemInformation from "@/components/SystemInformation.vue";
import { watch } from "fs";

export default {
  components: {
    SystemInformation
  },
  data() {
    return {
      externalContent: "",
      audio_stream: null,
      audio_context: null,
      recorder: null,
      loginLoading:false,
      email: "",
      password: "",
      emailRules: [
        value => !!value || "Required.",
        value => (value || "").length <= 50 || "Max 50 characters",
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      ]
    };
  },
  methods: {
     async login() {
        // let loader = Loading.service({ fullscreen: true })
        try {
          console.log('entro')
          // this.handleClickStart()
          // this.loginLoading = true
          // await this.delay(4000)
          // this.loginLoading = false

     
          //et user = await this.$store.dispatch('login/postLogin',{email:this.email, password:this.password})
          await this.$auth
            .loginWith('local', {
              data: {
                email: this.email,
                password: this.password
              }
            })
            .then(res => {
              console.log('res', res, this.$auth.user)
              console.log('he',this.$auth.loggedIn,this.$auth)
            })
            .catch(e=> console.log("Err",e))
          console.log('response ', this.$auth.user)
          // this.$router.push({ name: 'index' })
          this.$axios.$get('/command/')
          this.$router.push()
          //this.$store.commit('login/setUserData',user.data)
          //this.$auth.redirect('/documents')
          //this.$router.push('/documents/')
        } catch (err) {
          console.log('ERROR') //si funciona cuando no encuentra
          console.log(err)
          // this.$showAlert({ title: 'Credenciales/ Inválidas', message: `Correo electrónico y/o contraseña incorrecta.` })
          //   this.$refs.alertDialog.open('Error Verifica crediedenciales')
        }
        // loader.close()s
      },
    openURL(url) {
      remote.shell.openExternal(url);
    },

  },
  async mounted() {
  
  },
  watch: {
    email: function() {
      console.log(this.email);
    }
  },
  computed:{
     btnDisabled1() {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return  (!pattern.test(this.email) || this.password.length < 3)
      }
  }
};
</script>

<style lang="sass">
  .e-nuxt-container 
    min-height: calc(100vh - 50px) 
    background: linear-gradient(to right, #ece9e6, #ffffff) 
    font-family: Helvetica, sans-serif 
    padding: 30px
  .mt-2 
      margin-top: 14px 
  .mb-2 
      margin-bottom: 14px 
  .e-nuxt-content 
      display: flex 
      justify-content: space-around 
      padding-top: 100px 
      align-items: flex-start 
      flex-wrap: wrap 
  .e-nuxt-logo 
      width: 400px 
  .e-nuxt-system-info 
      padding: 20px 
      border-top: 1px solid #397c6d 
      border-bottom: 1px solid #397c6d 
  .e-nuxt-links 
      padding: 100px 0 
      display: flex 
      justify-content: center 
  .e-nuxt-button 
      color: #364758 
      padding: 5px 20px 
      border: 1px solid #397c6d 
      margin: 0 20px 
      border-radius: 15px 
      font-size: 1rem 
      &:hover 
          cursor: pointer 
          color: white 
          background-color: #397c6d 



</style>
