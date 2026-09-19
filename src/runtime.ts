import { CassiopeiaRuntime, createKernelPlugin, type CassiopeiaPlugin } from "@haneoka/cassiopeia/plugin";
import { createOurNotesPlugin } from "@haneoka/cassiopeia-plugin-our-notes";
import { createThreeRendererPlugin } from "@haneoka/cassiopeia-renderer-three";
import { createWebHostPlugin } from "@haneoka/cassiopeia-host-web";
/** Default web composition. Hosts can instead pass an explicitly assembled runtime to ChartPlayer. */
export function createOurNotesWebRuntime(plugins: readonly CassiopeiaPlugin[] = []): CassiopeiaRuntime {
  return new CassiopeiaRuntime([
    createKernelPlugin(),
    createOurNotesPlugin(),
    createThreeRendererPlugin(),
    createWebHostPlugin(),
    ...plugins,
  ]);
}
