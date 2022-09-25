<!-- eslint-disable max-len -->
<template>
  <div class="col-12">
    <div class="row q-pa-sm">
      <div class="col-12">
        <input
          v-model="val"
          :min="min"
          :max="360-min"
          :step="1"
          inner-track-color="transparent"
          selection-color="transparent"
          class="slider rainbow full-width"
          type="range"
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RainbowSlider',
  props: {
    value: {
      type: Number,
      required: true,
    },
    range: {
      type: Number,
      default: 10,
    },
  },
  emits: ['gradient', 'update'],
  data() {
    return { val: this.value };
  },
  computed: {
    min() {
      return ((360 * this.range) / 100);
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.val = val;
      },
    },
    val: {
      immediate: true,
      handler(value) {
        if (typeof value === 'string') { this.val = parseInt(value, 10); }
        const from = this.val - this.min;
        const to = this.val + this.min;

        const bg = `background: linear-gradient(45deg,hsl(${from},100%,50%), hsl(${to},100%,50%))`;
        this.$emit('gradient', bg);
        this.$emit('update', this.val);
      },
    },
  },
});
</script>
<style>
.slidecontainer {
  width: 100%;
  border-radius: 6px;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 50%;
  height: 8px;
  background: var(--rainbow);
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  border-radius: 6px;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10%;
  height: 11px;
  background: transparent;
  border: 2px solid grey;
  border-radius: 6px;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 10%;
  height: 12px;
  background: transparent;
  border: 1px solid grey;
  border-radius: 6px;
  cursor: pointer;
}
:root {
  --rainbow: linear-gradient(
    90deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
}
</style>
