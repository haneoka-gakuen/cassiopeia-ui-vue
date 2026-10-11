# Cassiopeia Vue UI

Two Vue 3 components that put a [Cassiopeia](https://github.com/haneoka-gakuen/cassiopeia)
chart on a page with a few lines of code:

- **`ChartPlayer`** — the full 3D play view: notes, effects, combo and HUD
  rendered with WebGL, the music and note sounds in sync, touch and mouse
  input, the song's opening title card and the finishing direction. Use it to
  watch a chart auto-play, or let the reader play it.
- **`ChartOverview`** — the whole chart on one tall canvas, the way chart
  viewers show it: lanes, notes and long notes, combo counts, fever sections,
  BPM changes, time and beat markers and skill timing.

They are built from the Cassiopeia packages, not copies of them: the kernel
judges, the [Our Notes plugin](https://github.com/haneoka-gakuen/cassiopeia-plugin-our-notes)
reads the chart and supplies the skin, the
[Three.js renderer](https://github.com/haneoka-gakuen/cassiopeia-renderer-three)
draws, and the [web host](https://github.com/haneoka-gakuen/cassiopeia-host-web)
handles audio and input.

## Install

```sh
pnpm add vue @haneoka/cassiopeia @haneoka/cassiopeia-plugin-our-notes \
  @haneoka/cassiopeia-renderer-three @haneoka/cassiopeia-host-web @haneoka/cassiopeia-ui-vue
```

Vue 3.5 or newer. Import only one component with `@haneoka/cassiopeia-ui-vue/player`
or `@haneoka/cassiopeia-ui-vue/overview`.

## ChartPlayer

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ChartPlayer, type ChartPlayerExpose } from "@haneoka/cassiopeia-ui-vue/player";

const player = ref<ChartPlayerExpose>();
</script>

<template>
  <ChartPlayer
    ref="player"
    :chart="chart"
    :assets="assets"
    audio-url="/songs/101/full.mp3"
    background-url="/stage/live.png"
    mode="watch"
    :title-introduction="{ title: 'Haruhikage', artist: 'MyGO!!!!!' }"
    @ready="player?.play()"
    @judgement="onJudgement"
  />
</template>
```

`chart` is a parsed chart (from the Our Notes plugin) and `assets` is the
skin's asset manifest.

### Props

| Prop | Meaning | Default |
| --- | --- | --- |
| `chart`, `assets` | The chart and the skin assets. Required. | |
| `mode` | `"watch"` (auto-play), `"play"` or `"chart"` | `"watch"` |
| `audioUrl` | The song. | none |
| `volume`, `noteSoundEnabled`, `noteSoundVolume` | Music and note-sound levels. | 0.8, on, 0.7 |
| `rate`, `loop` | Playback speed and looping. | 1, off |
| `settings` | Render settings (note speed, size, effects quality…) and `judgementOffsetMs`. | `{}` |
| `backgroundUrl`, `backgroundVideoUrl`, `backgroundCanvas` | Stage background: an image, a muted video kept in sync with the music, or your own canvas. | none |
| `titleIntroduction`, `titleIntroductionEnabled`, `titleIntroductionTheme` | The opening title card. | shown when given |
| `bgmOffsetMs` | Offset between chart and music, as used by Sonolus/USC charts. | 0 |
| `externalTimeMs`, `externalPlaying` | Drive the player from your own clock instead of its audio. | off |
| `haptics` | A device-feedback port for native hosts. | silent |
| `effectSeed` | Fixed seed for identical effects on every run. | random |
| `runtime` | Your own Cassiopeia runtime. | the player builds one |
| `visualProfiles` | Per-chart visual profiles from the game data. | none |
| `ariaLabel`, `pauseLabel`, `loadingLabel` | Accessible labels, already translated. | English |

### Methods (via `ref`)

`play()`, `pause()`, `seek(seconds)`, `restart()`, `resize()`, and
`getPresentation()` for screen-space projection and picking of what is on
stage.

### Events

| Event | When |
| --- | --- |
| `ready` | Assets are loaded and the first frame is drawn. |
| `playing`, `media-playing` | Playback state; `media-playing` excludes the title card. |
| `timeupdate`, `duration` | Position and length in seconds. |
| `frame` | After every rendered frame, with chart time, combo and progress. |
| `judgement`, `skill`, `fever`, `callchange` | Kernel events. |
| `introduction-started` / `-timeupdate` / `-completed` | The title card. |
| `finish-direction-started` / `-timeupdate` / `-completed` / `-cancelled` | The ending direction. |
| `external-playback-requested` | With an external clock: the title card is done, start your clock now. |
| `error`, `perf` | Failures and optional performance summaries. |

### Driving it from your own clock

Pass `externalTimeMs` and `externalPlaying` and the player stops managing
audio and time. It renders whatever time you give it, which is how an editor
or a video exporter keeps it in step. If a title card is shown first, the
player emits `external-playback-requested` when you should start advancing.

### Runtimes

Without a `runtime` prop the player creates the standard composition — kernel,
Our Notes rules, Three.js renderer and browser host — with
`createOurNotesWebRuntime()`, and disposes it on unmount. Pass your own
runtime to share it between players or to add plugins; the player then never
disposes it. `createVuePlayerPlugin()` registers the `VUE_PLAYER` service for
hosts that compose everything through a runtime.

## ChartOverview

```vue
<ChartOverview :chart="chart" :assets="assets" :scale="1" show-fever show-bpm :skill-marker-seconds="8" />
```

| Prop | Meaning | Default |
| --- | --- | --- |
| `scale`, `verticalScale` | Overall and vertical zoom. | 1, 1 |
| `noteSize`, `longAlpha` | Note size and long-note opacity. | 1, 0.8 |
| `mirror` | Mirror left and right. | off |
| `showCombo`, `showFever`, `showBpm` | Overlays. | on |
| `timeMarkerSeconds`, `beatSubdivision` | Grid density. | 5 s, 1 |
| `skillMarkerSeconds` | Length of the marked skill window. | 8 |
| `graphicsQuality` | Canvas resolution factor. | 1 |

## License

MPL-2.0. See [LICENSE](LICENSE).
