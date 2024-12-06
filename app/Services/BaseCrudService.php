<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService as AdobrovolskyBaseCrudService;
use App\Services\TrainsetAttachmentComponent\TrainsetAttachmentComponentGenerator;
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
use App\Support\Interfaces\Services\RawMaterialServiceInterface;
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
     * @param string $interface
     *
     * @return mixed
     */
    protected function getService(string $interface) {
        return $this->container->get($interface);
    }
    
    /**
     * Get TrainsetAttachment service instance
     *
     * @return \App\Support\Interfaces\Services\TrainsetAttachmentServiceInterface
     */
    protected function trainsetAttachmentService(): TrainsetAttachmentServiceInterface {
        return $this->getService(TrainsetAttachmentServiceInterface::class);
    }
    
    /**
     * Get TrainsetAttachmentComponent service instance
     *
     * @return \App\Support\Interfaces\Services\TrainsetAttachmentComponentServiceInterface
     */
    protected function trainsetAttachmentComponentService(): TrainsetAttachmentComponentServiceInterface {
        return $this->getService(TrainsetAttachmentComponentServiceInterface::class);
    }
    
    /**
     * Get DetailWorkerTrainset service instance
     *
     * @return \App\Support\Interfaces\Services\DetailWorkerTrainsetServiceInterface
     */
    protected function detailWorkerTrainsetService(): DetailWorkerTrainsetServiceInterface {
        return $this->getService(DetailWorkerTrainsetServiceInterface::class);
    }
    
    /**
     * Get TrainsetAttachmentHandler service instance
     *
     * @return \App\Support\Interfaces\Services\TrainsetAttachmentHandlerServiceInterface
     */
    protected function trainsetAttachmentHandlerService(): TrainsetAttachmentHandlerServiceInterface {
        return $this->getService(TrainsetAttachmentHandlerServiceInterface::class);
    }
    
    /**
     * Get FailedComponentManufacture service instance
     *
     * @return \App\Support\Interfaces\Services\FailedComponentManufactureServiceInterface
     */
    protected function failedComponentManufactureService(): FailedComponentManufactureServiceInterface {
        return $this->getService(FailedComponentManufactureServiceInterface::class);
    }

    /**
     * Get PresetTrainset service instance
     *
     * @return \App\Support\Interfaces\Services\PresetTrainsetServiceInterface
     */
    protected function presetTrainsetService(): PresetTrainsetServiceInterface {
        return $this->getService(PresetTrainsetServiceInterface::class);
    }

    /**
     * Get Carriage service instance
     *
     * @return \App\Support\Interfaces\Services\CarriageServiceInterface
     */
    protected function carriageService(): CarriageServiceInterface {
        return $this->getService(CarriageServiceInterface::class);
    }

    /**
     * Get CarriageTrainset service instance
     *
     * @return \App\Support\Interfaces\Services\CarriageTrainsetServiceInterface
     */
    protected function carriageTrainsetService(): CarriageTrainsetServiceInterface {
        return $this->getService(CarriageTrainsetServiceInterface::class);
    }

    /**
     * Get PanelAttachment service instance
     *
     * @return \App\Support\Interfaces\Services\PanelAttachmentServiceInterface
     */
    protected function panelAttachmentService(): PanelAttachmentServiceInterface {
        return $this->getService(PanelAttachmentServiceInterface::class);
    }

    /**
     * Get PanelAttachmentHandler service instance
     *
     * @return \App\Support\Interfaces\Services\PanelAttachmentHandlerServiceInterface
     */
    protected function panelAttachmentHandlerService(): PanelAttachmentHandlerServiceInterface {
        return $this->getService(PanelAttachmentHandlerServiceInterface::class);
    }

    /**
     * Get SerialPanel service instance
     *
     * @return \App\Support\Interfaces\Services\SerialPanelServiceInterface
     */
    protected function serialPanelService(): SerialPanelServiceInterface {
        return $this->getService(SerialPanelServiceInterface::class);
    }

    /**
     * Get TrainsetAttachmentComponentGenerator service instance
     *
     * @return \App\Services\TrainsetAttachmentComponent\TrainsetAttachmentComponentGenerator
     */
    protected function trainsetAttachmentComponentGenerator(): TrainsetAttachmentComponentGenerator {
        return $this->getService(TrainsetAttachmentComponentGenerator::class);
    }

    /**
     * Get CarriagePanel service instance
     *
     * @return \App\Support\Interfaces\Services\CarriagePanelServiceInterface
     */
    protected function carriagePanelService(): CarriagePanelServiceInterface {
        return $this->getService(CarriagePanelServiceInterface::class);
    }

    /**
     * Get DetailWorkerPanel service instance
     *
     * @return \App\Support\Interfaces\Services\DetailWorkerPanelServiceInterface
     */
    protected function detailWorkerPanelService(): DetailWorkerPanelServiceInterface {
        return $this->getService(DetailWorkerPanelServiceInterface::class);
    }

    /**
     * Get User service instance
     *
     * @return \App\Support\Interfaces\Services\UserServiceInterface
     */
    protected function userService(): UserServiceInterface {
        return $this->getService(UserServiceInterface::class);
    }

    /**
     * Get Trainset service instance
     *
     * @return \App\Support\Interfaces\Services\TrainsetServiceInterface
     */
    protected function trainsetService(): TrainsetServiceInterface {
        return $this->getService(TrainsetServiceInterface::class);
    }

    /**
     * Get Panel service instance
     *
     * @return \App\Support\Interfaces\Services\PanelServiceInterface
     */
    protected function panelService(): PanelServiceInterface {
        return $this->getService(PanelServiceInterface::class);
    }

    /**
     * Get Component service instance
     *
     * @return \App\Support\Interfaces\Services\ComponentServiceInterface
     */
    protected function componentService(): ComponentServiceInterface {
        return $this->getService(ComponentServiceInterface::class);
    }

    /**
     * Get RawMaterial service instance
     *
     * @return \App\Support\Interfaces\Services\RawMaterialServiceInterface
     */
    protected function rawMaterialService(): RawMaterialServiceInterface {
        return $this->getService(RawMaterialServiceInterface::class);
    }

    /**
     * Get RawMaterial service instance
     *
     * @return \App\Support\Interfaces\Services\ProgressServiceInterface
     */
    protected function progressService(): ProgressServiceInterface {
        return $this->getService(ProgressServiceInterface::class);
    }

    /**
     * Get RawMaterial service instance
     *
     * @return \App\Support\Interfaces\Services\CarriagePanelComponentServiceInterface
     */
    protected function carriagePanelComponentService(): CarriagePanelComponentServiceInterface {
        return $this->getService(CarriagePanelComponentServiceInterface::class);
    }

    /**
     * Get RawMaterial service instance
     *
     * @return \App\Support\Interfaces\Services\PanelMaterialServiceInterface
     */
    protected function panelMaterialService(): PanelMaterialServiceInterface {
        return $this->getService(PanelMaterialServiceInterface::class);
    }
}

