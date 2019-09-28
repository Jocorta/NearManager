<template>
  <v-container fluid fill-height >
    <v-layout align-center justify-center >
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="orange darken-1">
            <v-toolbar-title>Near Manager</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form autocomplete="off">
              <v-text-field
                color="orange"
                prepend-icon="person"
                name="login"
                label="Username"
                v-model="username"
              ></v-text-field>
              <v-text-field
                color="orange"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                @click:append="show = !show"
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                :type="show ? 'text' : 'password'"
                v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="orange" dark @click="registrar">Register</v-btn>
            <v-btn color="orange" dark @keyup.enter.native="login" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LoginService from "@/services/LoginService";
import AuthenticateService from "@/services/AuthenticateService";
export default {
  data: () => ({
    show: false,
    username: "",
    password: ""
  }),
  methods: {
    async login() {
      let response = await LoginService.login({
        username: this.username,
        password: this.password
      });
      if (response.data.logged) {
        if (!localStorage.getItem("token")) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.user);
        }
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.username);
        let res = await AuthenticateService.authenticate({
          token: localStorage.getItem("token"),
          user: localStorage.getItem("user")
        });
        
        this.$router.push("home");
      }
    },
    registrar() {
      this.$router.push("registrar");
    }
  }
};
</script>


