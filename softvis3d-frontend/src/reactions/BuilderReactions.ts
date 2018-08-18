import { CityBuilderStore } from "../stores/CityBuilderStore";
import { reaction } from "mobx";
import VisualizationOptions from "../classes/VisualizationOptions";
import SonarQubeMeasuresService from "../services/sonarqube/measures/SonarQubeMeasuresService";
import AutoReloadService from "../services/AutoReloadService";

export default class BuilderReactions {
    private cityBuilderStore: CityBuilderStore;
    private measuresService: SonarQubeMeasuresService;
    private autoReloadService: AutoReloadService;

    constructor(cityBuilderStore: CityBuilderStore, measuresService: SonarQubeMeasuresService,
                autoReloadService: AutoReloadService) {
        this.cityBuilderStore = cityBuilderStore;
        this.measuresService = measuresService;
        this.autoReloadService = autoReloadService;
        this.prepareReactions();
    }

    private prepareReactions() {
        reaction(
            () => this.cityBuilderStore.initiateBuildProcess,
            () => {
                if (this.cityBuilderStore.initiateBuildProcess) {
                    this.cityBuilderStore.initiateBuildProcess = false;

                    let options: VisualizationOptions = new VisualizationOptions(
                        this.cityBuilderStore.layout, this.cityBuilderStore.footprintMetric,
                        this.cityBuilderStore.heightMetric, this.cityBuilderStore.metricColor, this.cityBuilderStore.profile.scale);

                    this.measuresService.loadMeasures(options);
                    this.autoReloadService.startAutoReload();
                }
            },
            {
                name: "Transfer all required data to the scene"
            }
        );
    }
}