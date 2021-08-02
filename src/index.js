import { ContainerSchema, ISharedMap, SharedMap } from "@fluid-experimental/fluid-framework";
import { FrsClient, FrsConnectionConfig, FrsContainerConfig, InsecureTokenProvider } from "@fluid-experimental/frs-client";
import { getContainerId } from "./getContainerId.js";
import { reactRenderView as renderView } from "./view.js";

async function start() {

    const { id, isNew } = getContainerId();

    const localConfig = {
        tenantId: "local",
        tokenProvider: new InsecureTokenProvider("anyValue", { id: "userId" }),
        orderer: "http://localhost:7070",
        storage: "http://localhost:7070", 
    };

    const client = new FrsClient(localConfig);

    const containerConfig = { id };
    const containerSchema = {
        name: "hello-world-demo-container",
        initialObjects: { coin : SharedMap }
    };

    const { fluidContainer } = isNew
        ? await client.createContainer(containerConfig, containerSchema)
        : await client.getContainer(containerConfig, containerSchema);

    renderView(
        fluidContainer.initialObjects.coin,
        document.getElementById("content") 
    );
}

start().catch((error) => console.error(error));
