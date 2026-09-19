import { defineCassiopeiaPlugin, defineCassiopeiaService } from "@haneoka/cassiopeia/plugin";
import ChartPlayer from "./vue/ChartPlayer.vue";
import ChartOverview from "./vue/ChartOverview.vue";
export const VUE_PLAYER = defineCassiopeiaService<{
  ChartPlayer: typeof ChartPlayer;
  ChartOverview: typeof ChartOverview;
}>("cassiopeia.ui-vue.v1");
export function createVuePlayerPlugin() {
  return defineCassiopeiaPlugin({
    manifest: {
      id: "cassiopeia.ui-vue",
      version: "0.1.0",
      apiVersion: 1,
      requires: ["cassiopeia.renderer-three", "cassiopeia.host-web"],
      provides: [VUE_PLAYER.id],
    },
    setup(context) {
      context.provide(VUE_PLAYER, { ChartPlayer, ChartOverview });
    },
  });
}
