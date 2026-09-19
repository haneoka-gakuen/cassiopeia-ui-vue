# Cassiopeia Vue UI

Vue `ChartPlayer` and `ChartOverview`, separated from the kernel and renderer.
Use the root entry or the narrower `/player` and `/overview` exports.

`createVuePlayerPlugin()` registers `VUE_PLAYER` for runtime-based composition.
A player's optional `runtime` prop accepts a host-owned plugin runtime. Without
one, the player creates the standard kernel + Our Notes + Three + browser-host
composition through `createOurNotesWebRuntime()`. The player disposes its own
composition on unmount, never a caller's shared runtime.

```sh
pnpm --filter @haneoka/cassiopeia-ui-vue check
```

Source parsing, judgement, rendering and physical audio/input implementations
are peer plugins rather than duplicate implementations in this package.
The existing player lifecycle checks moved here with the UI. License: MPL-2.0.
