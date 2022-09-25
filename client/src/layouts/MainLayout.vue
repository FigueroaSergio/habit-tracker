<template>
  <q-layout
    view="lHh Lpr lFf"
    class="bg-grey-10"
  >
    <q-header
      class="bg-grey-10 text-grey-2"
    >
      <q-toolbar class="q-py-sm">
        <template v-if="$q.screen.lt.md">
          <q-btn
            icon="menu"
            size="md"
            flat
            rounded
            @click="toggleLeftDrawer"
          />
        </template>
        <q-input
          v-model="search"
          rounded
          outlined
          label="Search"
          color="green-13"
          standout
          dense
          dark
          @focus="searchIcon=true"
          @blur="searchIcon=false"
        >
          <template #prepend>
            <q-icon
              name="search"
              :color="searchIcon?'green-13':''"
            />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-grey-10"
    >
      <q-list>
        <q-item
          clickable
          class="q-pb-lg text-grey-2 text-h5 text-bold"
          to="/"
        >
          <q-item-section avatar>
            <q-icon
              name="img:icons/logo.svg"
              size="lg"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Work Habit
            </q-item-label>
          </q-item-section>
        </q-item>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Dashboard',
    icon: 'o_pie_chart',
    to: '/',
  },
  {
    title: 'Perfil',
    icon: 'o_settings',
    to: '/hello',
  },

];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref('');
    const searchIcon = ref(false);
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      drawer: ref(false),
      miniState: ref(true),
      search,
      searchIcon,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
