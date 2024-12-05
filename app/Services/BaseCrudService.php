<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService as AdobrovolskyBaseCrudService;
use App\Support\Interfaces\Services\DetailWorkerTrainsetServiceInterface;
use App\Support\Interfaces\Services\FailedComponentManufactureServiceInterface;
use App\Support\Interfaces\Services\TrainsetAttachmentComponentServiceInterface;
use App\Support\Interfaces\Services\TrainsetAttachmentHandlerServiceInterface;
use App\Support\Interfaces\Services\TrainsetAttachmentServiceInterface;
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
     * @return TrainsetAttachmentServiceInterface
     */
    protected function trainsetAttachmentService(): TrainsetAttachmentServiceInterface {
        return $this->getService(TrainsetAttachmentServiceInterface::class);
    }
    
    /**
     * Get TrainsetAttachmentComponent service instance
     *
     * @return TrainsetAttachmentComponentServiceInterface
     */
    protected function trainsetAttachmentComponentService(): TrainsetAttachmentComponentServiceInterface {
        return $this->getService(TrainsetAttachmentComponentServiceInterface::class);
    }
    
    /**
     * Get DetailWorkerTrainset service instance
     *
     * @return DetailWorkerTrainsetServiceInterface
     */
    protected function detailWorkerTrainsetService(): DetailWorkerTrainsetServiceInterface {
        return $this->getService(DetailWorkerTrainsetServiceInterface::class);
    }
    
    /**
     * Get TrainsetAttachmentHandler service instance
     *
     * @return TrainsetAttachmentHandlerServiceInterface
     */
    protected function trainsetAttachmentHandlerService(): TrainsetAttachmentHandlerServiceInterface {
        return $this->getService(TrainsetAttachmentHandlerServiceInterface::class);
    }
    
    /**
     * Get FailedComponentManufacture service instance
     *
     * @return FailedComponentManufactureServiceInterface
     */
    protected function failedComponentManufactureService(): FailedComponentManufactureServiceInterface {
        return $this->getService(FailedComponentManufactureServiceInterface::class);
    }

}

