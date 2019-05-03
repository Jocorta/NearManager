<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="indigo">
            <v-toolbar-title>Iniciar Sesion</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form autocomplete="off">
              <v-text-field
                color="indigo"
                prepend-icon="person"
                name="login"
                label="Usuario"
                v-model="user"
              ></v-text-field>
              <v-text-field
                color="indigo"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                @click:append="show = !show"
                id="password"
                prepend-icon="lock"
                name="password"
                label="Contraseña"
                :type="show ? 'text' : 'password'"
                v-model="pass"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="indigo" dark @click="login">Acceder</v-btn>
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
    user: "",
    pass: ""
  }),
  methods: {
    async login() {
      let response = await LoginService.login({
        usuario: this.user,
        password: this.pass
      });
      if (response.data.logged) {
        if (!localStorage.getItem("token")) {
          localStorage.setItem("token", response.data.token);
        }
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        let res = await AuthenticateService.authenticate({
          token: localStorage.getItem("token")
        });
        if (res.data.tipo === "Administrador") {
          this.$router.push("home");
        } else {
          this.$router.push("asistencia");
        }
      }
    }
  }
};
</script>

<style>
</style>
