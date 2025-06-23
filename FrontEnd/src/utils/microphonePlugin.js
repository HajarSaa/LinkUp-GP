// src/utils/microphonePlugin.js
export default {
  name: "microphone",
  deferInit: true,
  params: {},
  staticProps: {
    microphone: null
  },
  instance: {
    async init() {
      this.microphone = this.registerPlugin(
        await import("wavesurfer.js/src/plugin/microphone/index.js")
      );
    }
  }
};
