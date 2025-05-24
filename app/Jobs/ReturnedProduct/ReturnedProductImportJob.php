<?php

namespace App\Jobs\ReturnedProduct;

use App\Imports\ReturnedProduct\ReturnedProductImport;
use App\Imports\ReturnedProduct\Sheets\ReturnedProductProblemSheetImport;
use App\Models\ReturnedProduct;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Maatwebsite\Excel\Exceptions\SheetNotFoundException;
use Maatwebsite\Excel\Facades\Excel;

class ReturnedProductImportJob implements ShouldQueue {
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        private string $filePath,
        protected string $userId,
        private ?ReturnedProduct $returnedProduct = null
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void {
        try {
            Excel::import(new ReturnedProductImport($this->userId, $this->returnedProduct), $this->filePath);
        } catch (SheetNotFoundException $e) {
            logger()->error($e->getMessage());
            try {
                Excel::import(new ReturnedProductProblemSheetImport($this->userId), $this->filePath);
            } catch (\Throwable $e) {
                logger()->error($e->getMessage());
                throw $e;
            }
        }
    }
}
