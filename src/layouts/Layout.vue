<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center"> Todolisa </q-toolbar-title>
        <q-btn
          v-if="!loggedIn"
          to="/auth"
          flat
          icon-right="account_circle"
          label="Login"
          class="absolute-right"
        />

        <q-btn
          v-else
          @click="logoutUser"
          to="/auth"
          flat
          icon-right="account_circle"
          label="Logout"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label header class="text-grey-4"> Navigation </q-item-label>
        <Nav
          class="text-grey-5"
          v-for="link in links"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-footer>
      <q-tabs>
        <Tabs v-for="link in links" :key="link.title" v-bind="link" />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Nav from "components/Nav.vue";

const links = [
  {
    title: "Todo",
    icon: "list",
    link: "/",
  },
  {
    title: "Settings",
    icon: "settings",
    link: "/settings",
  },
];

export default {
  name: "MainLayout",
  data: function () {
    return {
      leftDrawerOpen: false,
      links,
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn"]),
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
  },
  components: { Nav, Tabs: require("components/Tabs").default },
};
</script>

<style lang="scss">
.q-drawer {
  .q-router-link--exact-active {
    color: #fff !important;
  }
}

@media screen and (min-width: 1007px) {
  .q-footer {
    display: none;
  }
}
</style>
