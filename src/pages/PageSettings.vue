<template>
  <q-page padding>
    <q-list bordered padding class="q-mb-md">
      <q-item-label header>Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 12 hour time format</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="show12HourTimeFormat" color="blue" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show Tasks in one list</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="showTasksInOneList" color="blue" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-list bordered padding>
      <q-item-label header>More</q-item-label>

      <q-item to="/settings/help" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Help</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>

      <q-item @click="visitOurWebsite" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Visit our Website</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>

      <q-item @click="contactUs" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Contact Us</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>


    </q-list>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { openURL } from 'quasar'

export default {
  methods: {
    ...mapActions("settings", ["setShow12HourFormat", "setShowTasksInOneList"]),
    visitOurWebsite: function () {
      openURL('http://duckduckgo.com')
    },
    contactUs: function () {
      window.location.href = 'mailto:hello@awesometodo.com?subject=Awesome Todo Feedback'
    }
  },
  computed: {
    ...mapGetters("settings", ["settings"]),
    show12HourTimeFormat: {
      get: function() {
        return this.settings.show12HourTimeFormat;
      },
      set: function(value) {
        // trigger an action
        this.setShow12HourFormat(value);
      }
    },
    showTasksInOneList: {
      get: function() {
        return this.settings.showTasksInOneList;
      },
      set: function(value) {
        // trigger an action
        this.setShowTasksInOneList(value);
      }
    }
  }
};
</script>

<style></style>
