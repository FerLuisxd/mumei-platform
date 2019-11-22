<template>
  <div class="e-nuxt-container">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12" color="primary lighten-4">
          <v-toolbar dark color="primary darken-1">
            <v-toolbar-title>Chat</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-list class="overflow-y-auto" style="max-height: 300px" color="primary lighten-4" 
              ref="chat" id="logs">
              <template v-for="(item, index) in logs">
                <v-list-item v-if="item" :key="index">{{ item }}</v-list-item>
              </template>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-form @submit.prevent="submit">
              <v-text-field v-model="msg" label="Message" single-line solo-inverted></v-text-field>
              <v-btn fab dark small color="primary" type="submit">
                <v-icon dark>mdi-send</v-icon>
              </v-btn>
            </v-form>
          </v-card-actions>
        </v-card>
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
      logs: [],
      msg: null,
      commands: [],
    };
  },
  created() {
    let me = this;
    me.$axios.get(`/user-chat`).then(function(response) {
        for (const prop in response.data) {
          me.logs.push(response.data[prop].message)
        }
      });
  },
  methods: {
    async list() {
      //TODO
        //TODO
      let me = this;
      me.$axios.get(`/user-command/${me.userID}`).then(function(response) {
      
        for (let i = 0; i < response.data.length; i++) {
          const element = response.data[i];
          me.commands.push(element.command)
          
        }
        console.log("me",me.commands )
      });

    },
    executeItem(item){
      
      this.$store.dispatch('execute',item)
    },
    save(m) {
      let me = this;
      console.log('hi', me.commands)
          for (let i = 0; i < me.commands.length; i++) {
          
        const element = me.commands[i];
        
        if(me.commands[i].name==m)
        {
          console.log('command ', me.commands[i]);
        this.$store.dispatch('execute',me.commands[i]); 
        break
        }
        else if(me.commands[i].shortcut==m)
        { 
                    console.log('command short ', me.commands[i]);

          this.$store.dispatch('execute',me.commands[i]);
          break 
        }     
      }
        me.$axios
          .post(`/user-chat`, {
            message: m,
            registerDate: "1-1-1111"
          })
    },
    submit() {
      this.save(this.msg)
      console.log("Guarde")
      this.logs.push(this.msg);
      console.log("Pushee")
      // this.executeItem(this.msg)
      console.log(this.msg)
      // console.log("Ejecute")
      this.msg = "";
    }
  },

  async mounted() {
    await this.list()
  },
  watch: {
    logs() {
      setTimeout(() => {
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      }, 0);
    }
  },
  computed: {
    btnDisabled1() {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return !pattern.test(this.email) || this.password.length < 3;
    },
    username() {
      return this.$auth.user.username;
    },
    userID() {
      return this.$auth.user.id;
    },
    logged() {
      return this.$auth.loggedIn;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Command" : "Update Command";
    }
  }
};
</script>

<style lang="sass">
  .e-nuxt-container 
    min-height: calc(100vh - 50px) 
    background: #414141
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
