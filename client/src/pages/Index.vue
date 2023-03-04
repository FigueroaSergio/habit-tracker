<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-12 col-lg-9 q-pa-xs">
        <div class="column full-height">
          <q-card class="col-12 q-pa-sm bg-grey-9">
            <today-habits />
          </q-card>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-3 q-pa-xs">
        <q-card class="q-pa-md bg-grey-9">
          <habit-editor />
        </q-card>
      </div>
      <div class="col-12 col-sm-6 q-pa-xs">
        <q-card
          class="col-12 q-pa-sm bg-grey-9 full-height"
          style="min-height: 40vh"
        >
          <display-habits />
        </q-card>
      </div>
      <div class="col-12 q-pa-xs">
        <q-card class="bg-grey-9">
          <q-card-section>
            <q-btn
              rounded
              icon="camera"
              outline
              color="green-13"
              label="camera"
              @click="accessCamera"
            />
          </q-card-section>
          <q-card-section>
            <div class="row">
              <div
                v-for="(url,i) in urls"
                :key="i"
                class="q-pa-sm col-12 col-md-4"
              >
                <q-img

                  :ratio="1"
                  :src="url"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <q-dialog
        v-model="cameraDialog"
        @update:model-value="stop"
      >
        <q-card
          class="camera-dialog bg-grey-9"
        >
          <q-card-section class="fit">
            <div class=" row justify-center">
              <video
                id="vid"
                ref="video"
                class="full-width webcam q-pb-lg"
                muted
                @loadedmetadata="play"
              />
              <div class="absolute-full column justify-end">
                <div class="row justify-center q-pb-sm">
                  <q-btn
                    round
                    color="green-13"
                    size="lg"
                    icon="camera"
                    @click="takePhoto"
                  />
                </div>
              </div>
            </div>
            <canvas
              ref="canva"
              class="hidden"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script lang="ts">
import TodayHabits from 'src/components/TodayHabits.vue';
import DisplayHabits from 'src/components/Habits/DisplayHabits.vue';

import HabitEditor from 'src/components/HabitEditor.vue';
import { defineComponent, ref } from 'vue';
import { useHabitStore } from '../stores/habits';

export default defineComponent({
  name: 'IndexPage',
  components: { HabitEditor, TodayHabits, DisplayHabits },
  setup() {
    const video = ref<HTMLVideoElement|null>(null);
    const stream = ref<MediaStream|null>(null);
    const canva = ref<HTMLCanvasElement|null>();
    const blobs = ref < Blob[] >([]);
    const urls = ref < string[] >([]);

    return {
      video, stream, canva, blobs, urls,
    };
  },
  data() {
    return {
      cameraDialog: false,
    };
  },
  mounted() {
    useHabitStore().getData();
  },
  methods: {
    async accessCamera() {
      this.cameraDialog = true;
      const { mediaDevices } = navigator;
      const stream = await mediaDevices.getUserMedia({
        video: { frameRate: { ideal: 10, max: 15 }, facingMode: 'environment' },
      });
      if (!this.video) {
        return;
      }
      this.video.srcObject = stream;
      this.stream = stream;
    },
    takePhoto() {
      if (this.video && this.canva) {
        const context = this.canva.getContext('2d');
        this.canva.width = this.video.videoWidth;
        this.canva.height = this.video.videoHeight;
        context?.translate(this.canva.width, 0);
        context?.scale(-1, 1);
        context?.drawImage(this.video, 0, 0);

        this.canva.toBlob((blob) => {
          if (blob) {
            this.blobs.push(blob);
            this.urls.push(URL.createObjectURL(blob));
          }
        });
      }
    },
    play() {
      if (this.video) {
        this.video.play();
      }
    },
    stop() {
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
      }
    },
  },
});
</script>
<style>
.q-dialog__inner--minimized > div.camera-dialog{
  max-width: 100vw;
  overflow: hidden;
}
.webcam{
  transform: rotateY(180deg);
    -webkit-transform:rotateY(180deg); /* Safari and Chrome */
    -moz-transform:rotateY(180deg); /* Firefox */
}
</style>
