<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ tab | titleCase }} to access your Todos anywhere!
      </q-banner>
    </div>

    <div class="row q-mb-md">
      <q-input
        outlined
        v-model="formData.email"
        label="Email Address"
        ref="email"
        class="col"
        :rules="[
          val =>
            isValidEmailAddress(val) || 'Please enter a valid email address'
        ]"
        lazy-rules
      />
    </div>

    <div class="row q-mb-md">
      <q-input
        outlined
        v-model="formData.password"
        ref="password"
        type="password"
        label="Password"
        class="col"
        :rules="[
          val => val.length >= 6 || 'Password must be at least 6 characters. '
        ]"
        lazy-rules
      />
    </div>

    <div v-if="tab == 'register'" class="row q-mb-md">
      <q-input
        outlined
        v-model="formData.confirmPassword"
        ref="confirmPassword"
        type="password"
        label="Confirm Password"
        class="col"
        :rules="[val => isPasswordsMatch(val) || 'Passwords didn\'t match ']"
        lazy-rules
      />
    </div>

    <div class="row">
      <q-space></q-space>
      <q-btn color="primary" :label="tab" type="submit" />
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        email: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    ...mapActions('auth', ['registerUser', 'loginUser']),
    submitForm: function() {
      if (this.tab == "login") {
        this.$refs.email.validate();
        this.$refs.password.validate();
        if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
          this.loginUser(this.formData)
        }
      } else if (this.tab == "register") {
        this.$refs.email.validate();
        this.$refs.password.validate();
        this.$refs.confirmPassword.validate();
        if (
          !this.$refs.email.hasError &&
          !this.$refs.password.hasError &&
          !this.$refs.confirmPassword.hasError
        ) {
          this.registerUser(this.formData)
        }
      }
    },
    isValidEmailAddress: function(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    isPasswordsMatch: function(password) {
      return this.formData.password === password;
    }
  },
  filters: {
    titleCase: function(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style></style>
