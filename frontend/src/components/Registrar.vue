<template>
  <div>
    <form>
      <v-card flat>



        <div class="orange darken-1 text-center">
          <v-card-title>
          <span class="headline white--text">User Register</span>
        </v-card-title>
        </div>

        <!-- <v-card-text v-if="errors.length">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <p>Please correct the following error(s):</p>
                <ul>
                <li v-for="error in errors" class="red--text ">{{ error }}</li>
                </ul>
              </v-flex>
              
            </v-layout>
          </v-container>
        </v-card-text> -->


        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible style="margin: 25px; margin-right: 50%;">
              <p style="margin: 1px">Please correct the following <strong class="red--text">error(s)</strong>:</p>
              <ul>
              <li v-for="error in errors" class="red--text ">{{ error }}</li>
              </ul>
        </b-alert>





        <v-card-text >
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field color="orange" v-model="editedItem.name" label="Full Name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field color="orange" v-model="editedItem.email" label="Email" type="email"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field color="orange" v-model="editedItem.username" label="Username"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field color="orange" v-model="editedItem.password" label="Password"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>


        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange" flat @click="close">Cancel</v-btn>
          <v-btn color="orange" @click="checkForm">Register</v-btn>
        </v-card-actions>


      </v-card>
    </form>




  </div>
</template>

<script>
import UserService from "@/services/UserService";
export default {
  name: "Table",
  data: () => ({
    editedItem: {
      name: "",
      email: "",
      password: "",
      username: ""
    },
    errors: [],
    showDismissibleAlert: false //poner algo que cambia a true esto para que s emuestren los errores
  }),

  methods: {
    async agregarUsuario(datos) {
      await UserService.addUser(datos);
    },

    close() {
      this.$router.push("/");
    },

    async save() {
      await this.agregarUsuario(this.editedItem);
      confirm("User register complete.");
      this.$router.push("/");
    },


    checkForm: function (e) {
      this.errors = [];
      if (!this.editedItem.name) {
        this.errors.push("Full name required.");
      }
      if (!this.editedItem.username) {
        this.errors.push("Username required.");
      }
      if (!this.editedItem.email) {
        this.errors.push('Email required.');
      } else if (!this.validEmail(this.editedItem.email)) {
        this.errors.push('Valid email required.');
      }
      if (!this.editedItem.password) {
        this.errors.push("Password required.");
      }
      if (!this.errors.length) {
        return this.save();
      }
      this.showDismissibleAlert = true;
      e.preventDefault();

    },

    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }


  }
};
</script>

