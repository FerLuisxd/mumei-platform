<template>
  <div class="e-nuxt-container">
    <h2>Bienvenidos</h2>
       <div v-if="logged">
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
           <template v-slot:activator="{ on }">
          <v-btn  v-on="on" color="green" dark class="mb-2">New</v-btn>
           </template>
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
                    <v-text-field  v-model="description" label="Description"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field  v-model="command" label="Command"></v-text-field>
                  </v-flex>
                    <v-flex v-if="editedIndex>-1" sm12 md12>
                    <v-text-field  v-model="command" label="Command"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green" text @click.native="close">Cancel</v-btn>
              <v-btn color="green" text @click.native="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>  
      <v-data-table :headers="headers" :items="commands" :search="search" class="elevation-1">
      <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item.command)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item.command)"
      >
        delete
      </v-icon>
    </template>
          <template v-slot:no-data>
      <v-btn color="primary" @click.native="initialize">Reset</v-btn>
    </template>
      </v-data-table>
    </v-flex>
  </v-layout>
      </div>
      <div v-else>
       
      </div>

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
      ],
      commands: [],
      dialog: false,
      headers:[
        {text: "Name",value: "command.name", sortable: false},
        { text: "Description", value: "command.description", sortable: false },           ///CAMPOS
        { text: "Command", value: "command.command", sortable: false },  
        { text: "Enabled", value: "command.usable", sortable: true },
        { text: 'Actions', value: 'action', sortable: false }            
      ],
      search: "",
      editedInde:-1,
      id:"",
      description:'',
      name:'',
      command:'',
      usable:null,
      editedIndex:-1
    };
  },
  created(){
    this.list();
  },
  methods: {
    close() {
      this.dialog = false;
      this.editedIndex=-1;
    },
    editItem(item) {
      this.id = item.id;
      this.name = item.name;
      this.description = item.description;
      this.command = item.command;
      this.usable = item.usable;
      this.game = item.game;
      this.editedIndex = 1;
      this.dialog = true;
    },
    save(){
            if (this.editedIndex > -1) {
        //Código para editar

        let me = this;
        me.$axios
          .put("/command", {
            command:{name: me.name,
            description: me.description,
            command: me.command},
            id:me.id
          })
          .then(function(response) {
            console.log(response);
             if (response.data != true) {
          }
            me.close();
            me.listar();
            me.limpiar();
          })
        
      } else {
        //Código para guardar
        let me = this;
        me.$axios
          .post("/command", {
            name: me.name,
            description: me.description,
            command: me.command
      
          })
          .then(function(response) {
            console.log(response);
                        if (response.data != true) {
          }
            me.close();
            me.list();
            me.clean();
          })
          
      }
    },
    clean() {
      this.id = "";
      this.name = "";
      this.command = "";
      this.usable= null;
      this.description='';
      //this.direccion = "";
      //this.telefono = "";
    },
    list() {
      //TODO
      let me= this;
      me.$axios
        .get(`/user-command/${me.userID}`)
        .then(function(response){
            me.commands = response.data;
        })

    },
    openURL(url) {
      remote.shell.openExternal(url);
    },

  },
  async mounted() {
  this.list()
  },
  watch: {
    email: function() {

    },
        dialog(val) {
      val || this.close();
    }
  },
  computed:{
    btnDisabled1() {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return  (!pattern.test(this.email) || this.password.length < 3)
    },
    username(){
      return this.$auth.user.username
    },
    userID(){
      return this.$auth.user.id
    },
    logged(){
      return this.$auth.loggedIn
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
