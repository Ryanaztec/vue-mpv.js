"use strict";

const Vue = require("vue/dist/vue");
const path = require("path");
const {remote} = require("electron");
const {VueMPV} = require("../index");


const app = new Vue({
  data() {
    return {
      fullscreen: false,
      pause: true,
      "time-pos": 0,
      duration: 0,
      styles: {
        backgroundColor: "red",
      },
    };
  },
  el: "#main",
  template: `#content`,
  components: {
    "vue-mpv": VueMPV,
  },

  mounted() {
    document.addEventListener(
      "keydown",
      this.handleKeyDown,
      false
    );
  },

  beforeDestroy() {
    document.removeEventListener(
      "keydown",
      this.handleKeyDown,
      false
    );
  },

  methods: {
    handleKeyDown(e) {
      e.preventDefault();
      if (e.key === "f" || (e.key === "Escape" && this.$data.fullscreen)) {
        this.toggleFullscreen();
      } else if (this.$data.duration) {
        this.mpv.keypress(e);
      }
    },

    handleMPVReady(mpv) {
      this.mpv = mpv;
      const observe = mpv.observe.bind(mpv);
      ["pause", "time-pos", "duration", "eof-reached"].forEach(observe);
      this.mpv.property("hwdec", "auto");
      this.mpv.command("loadfile", path.join(__dirname, "tos.mkv"));
    },

    onReady(mpv) {
      this.mpv = mpv;
      const observe = mpv.observe.bind(mpv);
      ["pause", "time-pos", "duration", "eof-reached"].forEach(observe);
      this.mpv.property("hwdec", "auto");
      this.mpv.command("loadfile", path.join(__dirname, "tos.mkv"));
    },

    handlePropertyChange(name, value) {
      if (name === "time-pos" && this.seeking) {
        return;
      } else if (name === "eof-reached" && value) {
        this.mpv.property("time-pos", 0);
      } else {
        this.$data[name] = value;
      }
    },

    toggleFullscreen() {
      if (this.$data.fullscreen) {
        document.webkitExitFullscreen();
      } else {
        this.mpv.fullscreen();
      }
      this.$data.fullscreen = !this.$data.fullscreen;
    },

    togglePause(e) {
      e.target.blur();
      if (!this.$data.duration) return;
      this.mpv.property("pause", !this.$data.pause);
    },

    handleStop(e) {
      e.target.blur();
      this.mpv.property("pause", true);
      this.mpv.command("stop");
      this.$data["time-pos"] = 0;
      this.$data.duration = 0;
    },

    handleSeekMouseDown() {
      this.seeking = true;
    },

    handleSeek(e) {
      e.target.blur();
      const timePos = +e.target.value;
      this.$data["time-pos"] = timePos;
      this.mpv.property("time-pos", timePos);
    },

    handleSeekMouseUp() {
      this.seeking = false;
    },

    handleLoad(e) {
      e.target.blur();
      const items = remote.dialog.showOpenDialog({filters: [
        {name: "Videos", extensions: ["mkv", "webm", "mp4", "mov", "avi"]},
        {name: "All files", extensions: ["*"]},
      ]});
      if (items) {
        this.mpv.command("loadfile", items[0]);
      }
    },
  },


  computed: {
    timePos() {
      return this.$data["time-pos"];
    },
  },
});


console.info(app);
