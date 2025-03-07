<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService as AdobrovolskyBaseCrudService;
use App\Support\Interfaces\Services\CarriagePanelComponentServiceInterface;
use App\Support\Interfaces\Services\CarriagePanelServiceInterface;
use App\Support\Interfaces\Services\CarriageServiceInterface;
use App\Support\Interfaces\Services\CarriageTrainsetServiceInterface;
use App\Support\Interfaces\Services\ComponentServiceInterface;
use App\Support\Interfaces\Services\DetailWorkerPanelServiceInterface;
use App\Support\Interfaces\Services\DetailWorkerTrainsetServiceInterface;
use App\Support\Interfaces\Services\FailedComponentManufactureServiceInterface;
use App\Support\Interfaces\Services\PanelAttachmentHandlerServiceInterface;
use App\Support\Interfaces\Services\PanelAttachmentServiceInterface;
use App\Support\Interfaces\Services\PanelMaterialServiceInterface;
use App\Support\Interfaces\Services\PanelServiceInterface;
use App\Support\Interfaces\Services\PresetTrainsetServiceInterface;
use App\Support\Interfaces\Services\ProgressServiceInterface;
use App\Support\Interfaces\Services\ProgressStepServiceInterface;
use App\Support\Interfaces\Services\ProjectServiceInterface;
use App\Support\Interfaces\Services\RawMaterialServiceInterface;
use App\Support\Interfaces\Services\ReturnedProductServiceInterface;
use App\Support\Interfaces\Services\SerialPanelServiceInterface;
use App\Support\Interfaces\Services\TrainsetAttachmentComponentServiceInterface;
use App\Support\Interfaces\Services\TrainsetAttachmentHandlerServiceInterface;
use App\Support\Interfaces\Services\TrainsetAttachmentServiceInterface;
use App\Support\Interfaces\Services\TrainsetServiceInterface;
use App\Support\Interfaces\Services\UserServiceInterface;
use Psr\Container\ContainerInterface;

abstract class BaseCrudService extends AdobrovolskyBaseCrudService {
    public function __construct(
        protected ContainerInterface $container
    ) {
        parent::__construct();
    }

    /**
     * Get service instance by interface
     *
     *
     * @return mixed
     */
    protected function getService(string $interface) {
        return $this->container->get($interface);
    }

    /**
     * Get TrainsetAttachment service instance
     */
    protected function trainsetAttachmentService(): TrainsetAttachmentServiceInterface {
        return $this->getService(TrainsetAttachmentServiceInterface::class);
    }

    /**
     * Get TrainsetAttachmentComponent service instance
     */
    protected function trainsetAttachmentComponentService(): TrainsetAttachmentComponentServiceInterface {
        return $this->getService(TrainsetAttachmentComponentServiceInterface::class);
    }

    /**
     * Get DetailWorkerTrainset service instance
     */
    protected function detailWorkerTrainsetService(): DetailWorkerTrainsetServiceInterface {
        return $this->getService(DetailWorkerTrainsetServiceInterface::class);
    }

    /**
     * Get TrainsetAttachmentHandler service instance
     */
    protected function trainsetAttachmentHandlerService(): TrainsetAttachmentHandlerServiceInterface {
        return $this->getService(TrainsetAttachmentHandlerServiceInterface::class);
    }

    /**
     * Get FailedComponentManufacture service instance
     */
    protected function failedComponentManufactureService(): FailedComponentManufactureServiceInterface {
        return $this->getService(FailedComponentManufactureServiceInterface::class);
    }

    /**
     * Get PresetTrainset service instance
     */
    protected function presetTrainsetService(): PresetTrainsetServiceInterface {
        return $this->getService(PresetTrainsetServiceInterface::class);
    }

    /**
     * Get Carriage service instance
     */
    protected function carriageService(): CarriageServiceInterface {
        return $this->getService(CarriageServiceInterface::class);
    }

    /**
     * Get CarriageTrainset service instance
     */
    protected function carriageTrainsetService(): CarriageTrainsetServiceInterface {
        return $this->getService(CarriageTrainsetServiceInterface::class);
    }

    /**
     * Get PanelAttachment service instance
     */
    protected function panelAttachmentService(): PanelAttachmentServiceInterface {
        return $this->getService(PanelAttachmentServiceInterface::class);
    }

    /**
     * Get PanelAttachmentHandler service instance
     */
    protected function panelAttachmentHandlerService(): PanelAttachmentHandlerServiceInterface {
        return $this->getService(PanelAttachmentHandlerServiceInterface::class);
    }

    /**
     * Get SerialPanel service instance
     */
    protected function serialPanelService(): SerialPanelServiceInterface {
        return $this->getService(SerialPanelServiceInterface::class);
    }

    /**
     * Get CarriagePanel service instance
     */
    protected function carriagePanelService(): CarriagePanelServiceInterface {
        return $this->getService(CarriagePanelServiceInterface::class);
    }

    /**
     * Get DetailWorkerPanel service instance
     */
    protected function detailWorkerPanelService(): DetailWorkerPanelServiceInterface {
        return $this->getService(DetailWorkerPanelServiceInterface::class);
    }

    /**
     * Get User service instance
     */
    protected function userService(): UserServiceInterface {
        return $this->getService(UserServiceInterface::class);
    }

    /**
     * Get Project service instance
     */
    protected function projectService(): ProjectServiceInterface {
        return $this->getService(ProjectServiceInterface::class);
    }

    /**
     * Get Trainset service instance
     */
    protected function trainsetService(): TrainsetServiceInterface {
        return $this->getService(TrainsetServiceInterface::class);
    }

    /**
     * Get Panel service instance
     */
    protected function panelService(): PanelServiceInterface {
        return $this->getService(PanelServiceInterface::class);
    }

    /**
     * Get Component service instance
     */
    protected function componentService(): ComponentServiceInterface {
        return $this->getService(ComponentServiceInterface::class);
    }

    /**
     * Get RawMaterial service instance
     */
    protected function rawMaterialService(): RawMaterialServiceInterface {
        return $this->getService(RawMaterialServiceInterface::class);
    }

    /**
     * Get RawMaterial service instance
     */
    protected function progressService(): ProgressServiceInterface {
        return $this->getService(ProgressServiceInterface::class);
    }

    protected function progressStepService(): ProgressStepServiceInterface {
        return $this->getService(ProgressStepServiceInterface::class);
    }

    /**
     * Get RawMaterial service instance
     */
    protected function carriagePanelComponentService(): CarriagePanelComponentServiceInterface {
        return $this->getService(CarriagePanelComponentServiceInterface::class);
    }

    /**
     * Get RawMaterial service instance
     */
    protected function panelMaterialService(): PanelMaterialServiceInterface {
        return $this->getService(PanelMaterialServiceInterface::class);
    }

    /**
     * Get ReturnedProduct service instance
     */
    protected function returnedProductService(): ReturnedProductServiceInterface {
        return $this->getService(ReturnedProductServiceInterface::class);
    }
}
