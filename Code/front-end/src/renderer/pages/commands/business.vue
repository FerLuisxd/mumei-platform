<template>
  <div class="e-nuxt-container">
    <div v-if="logged">
      <v-layout align-start>
        <v-flex>
          <v-toolbar flat color="#414141">
            <v-toolbar-title>Business Commands</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              class="text-xs-center"
              v-model="search"
              append-icon="mdi-anchor"
              label="Search"
              single-line
              hide-details
              color="#ec625f"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" color="#525252" dark class="mb-2">New</v-btn>
                               <v-spacer></v-spacer>
                <v-btn @click="clean" color="#525252" dark class="mb-2">Clear Output</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm12 md12>
                        <v-text-field color='white' v-model="name" label="Name"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field color='white' v-model="description" label="Description"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field color='white' v-model="command" label="Command"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field color='white' v-model="shortcut" label="shortcut"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <input type="file" webkitdirectory @change="handleFileChange" />
                        <v-text-field color='white' v-model="location" label="location"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field color='white'  v-model="keymap" label="keymap"></v-text-field>
                      </v-flex>
                      <v-flex v-if="editedIndex>-1" sm12 md12>
                        <v-checkbox color="#ec625f" v-model="usable" :label="`Enabled`"></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="white" text @click.native="close">Cancel</v-btn>
                  <v-btn color="white" text @click.native="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="commands "
            :search="search"
            class="elevation-1"
            color="primary lighten-4"
          >
            <template v-slot:item.usable="{ item }">
              <v-icon>{{ item.command.usable ? "mdi-checkbox-marked" : "mdi-checkbox-blank-outline" }}</v-icon>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2" @click="executeItem(item.command)">exec</v-icon>
              <v-icon small class="mr-2" @click="editItem(item.command)">edit</v-icon>
              <v-icon small @click="deleteItem(item.command)">delete</v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click.native="initialize">Reset</v-btn>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
         <v-divider  inset vertical></v-divider>
      <v-layout align start>
    <v-card  class="mx-2" max-width="344" outlined   v-for="(item, i) in commandRes" :key="i">
          <v-card-text>
      <div>{{item.command}}</div>
      <p class="display-1 text--primary">
        {{item.name}}
      </p>
      <p>Error</p>
      <div class="text--primary" style="font-family:monospace">
       {{item.e}}
      </div>
            <p>Error CLI</p>
      <div class="text--primary" style="font-family:monospace">
       {{item.stderr}}
      </div>
            <p>Output</p>
      <div class="text--primary" style="font-family:monospace">
       {{item.stdout}}
      </div>
    </v-card-text>
  </v-card>
      </v-layout>
    </div>
    <div v-else>
      <label class="file-select">
        <!-- We can't use a normal button element here, as it would become the target of the label. -->
        <div class="select-button">
          <!-- Display the filename if a file has been selected. -->
          <span v-if="value">Selected File: {{value.name}}</span>
          <span v-else>Select File</span>
        </div>
        <!-- Now, the file input that we hide. -->
        <!-- <input type="file" webkitdirectory    @change="handleFileChange"/> -->
      </label>
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
      backgroundcolor: "#525252",
      externalContent: "",
      audio_stream: null,
      audio_context: null,
      recorder: null,
      loginLoading: false,
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
      commands: [{
	"id": 1,
	"registerDate": "2019-11-10T04:59:59.000Z",
	"deletedDate": null,
	"user": {
		"id": 1,
		"username": "ferluis",
		"email": "ferluisxd@gmail.com",
		"password": "0000",
		"role": "1"
	},
	"category": "Development",
	"command": {
		"id": 1,
		"shortcut": "dsad",
		"location": "dasdas",
		"keymap": "dsad",
		"command": "git pull",
		"description": "git pullea",
		"name": "pull",
		"usable": true
	}
}, {
	"id": 2,
	"registerDate": "2019-11-16T04:36:13.000Z",
	"deletedDate": null,
	"user": {
		"id": 1,
		"username": "ferluis",
		"email": "ferluisxd@gmail.com",
		"password": "0000",
		"role": "1"
	},
	"category": "Administration",
	"command": {
		"id": 7,
		"shortcut": "d",
		"location": "C:\\Users\\FerLuis\\AppData\\Local\\Google\\Chrome\\Application",
		"keymap": "ALT + 5",
		"command": "chrome --incognito",
		"description": "this shows directory files",
		"name": "showDirectory",
		"usable": true
	}
}],
      dialog: false,
      headers: [
        { text: "Name", value: "category", sortable: true },
        { text: "Name", value: "command.name", sortable: false },
        { text: "Command", value: "command.command", sortable: false },
        { text: "Shortcut", value: "command.shortcut", sortable: false }, ///CAMPOS
        { text: "KeyMap", value: "command.keymap", sortable: false }, ///CAMPOS
        { text: "Enabled", value: "usable", sortable: true },
        { text: "Actions", value: "action", sortable: false }
      ],
      search: "",
      editedInde: -1,
      id: "",
      description: "",
      name: "",
      command: "",
      commandRes:[],
      shortcut: "",
      keymap: "",
      location: "",
      usable: null,
      editedIndex: -1
    };
  },
  created() {},
  methods: {
    async executeItem(item) {
       let index = this.commandRes.length
       console.log(index)
      this.commandRes.push({
            
          command: item.command,
          name: item.name,
          e:"Running...",
          stderr:"Running...",
          stdout:"Running...",
      }
      )

      let res = await this.$store.dispatch("execute", item);
      console.log(res)
        this.commandRes.splice(index, 1);

      this.commandRes.push(res)
    },
    handleFileChange(e) {
      // Whenever the file changes, emit the 'input' event with the file data.
      try {
        // console.log(e.target.files[0].path)
        this.location = e.target.files.length > 0 ? e.target.files[0].path : "";
      } catch (e) {
        console.error(e);
      }

      // this.$emit('input', e.target.files[0])
    },
    close() {
      this.dialog = false;
      this.editedIndex = -1;
    },
    editItem(item) {
      this.id = item.id;
      this.name = item.name;
      this.description = item.description;
      this.command = item.command;
      this.usable = item.usable;
      this.shortcut = item.shortcut;
      this.keymap = item.keymap;
      this.location = item.location;
      this.editedIndex = 1;
      this.dialog = true;
    },
    save() {
      if (this.editedIndex > -1) {
        //Código para editar

        let me = this;
        console.log(me.id);
        me.$axios
          .put(`/command/${me.id}`, {
            command: {
              name: me.name,
              description: me.description,
              command: me.command,
              usable: me.usable,
              shortcut: me.shortcut,
              keymap: me.keymap,
              location: me.location
            },
            id: me.id
          })
          .then(function(response) {
            console.log(response);
            if (response.data != true) {
            }
            me.close();
            me.list();
            me.clean();
          });
      } else {
        //Código para guardar
        let me = this;
        me.$axios
          .post("/command", {
            name: me.name,
            description: me.description,
            command: me.command,
            shortcut: me.shortcut,
            keymap: me.keymap,
            location: me.location
          })
          .then(function(response) {
            console.log(response);
            if (response.data != true) {
            }
            me.close();
            me.list();
            me.clean();
          });
      }
    },
    clean() {
      this.id = "";
      this.commandRes =[]
      this.name = "";
      this.command = "";
      this.usable = null;
      this.description = "";
      (this.shortcut = ""), (this.keymap = ""), (this.location = "");
      //this.direccion = "";
      //this.telefono = "";
    },
    list() {
      //TODO
    //   let me = this;
    //   me.$axios.get(`/user-command/${me.userID}`).then(function(response) {
    //     me.commands = response.data;
    //   });
    },
    openURL(url) {
      remote.shell.openExternal(url);
    }
  },
  async mounted() {
    if (this.logged) {
      this.list();
    }
  },
  watch: {
    email: function() {},
    dialog(val) {
      val || this.close();
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
    background: #525252
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
