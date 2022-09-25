<template>
  <q-item
    clickable
    tag="a"
    :to="link"
    class="text-grey-2 round-rigth"
    active-class="bg-green-gradient text-grey-10"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon
        :name="icon"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label
        caption
      >
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    link: {
      type: String,
      default: '',
    },

    icon: {
      type: String,
      default: '',
    },
  },
});
</script>
<style>
.round-rigth{
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
}
</style>
