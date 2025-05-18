<?php

namespace App\Imports\ReturnedProduct\Sheets;

use App\Models\Component;
use App\Models\Panel;
use App\Models\ProductProblem;
use App\Models\ReturnedProduct;
use App\Support\Enums\ProductProblemCauseEnum;
use App\Support\Enums\ProductProblemStatusEnum;
use App\Support\Enums\ReturnedProductStatusEnum;
use DB;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class ReturnedProductProblemSheetImport implements ToCollection {
    public function collection(Collection $rows) {
        $headers = $rows[0];
        $carNumbers = [];
        DB::beginTransaction();
        try {
            $rows->skip(1)->take($rows->count() - 1)->each(function ($row) use ($headers, &$carNumbers) {
                if (empty($row[$headers->search('Timestamp')])) {
                    return;
                }
                $timestamp = Date::excelToTimestamp($row[$headers->search('Timestamp')]);
                $date = date('Y-m-d', $timestamp);
                $tsName = $row[$headers->search('Train Set')];
                $changeComponent = $row[$headers->search('Pergantian Komponen')];
                $fixedComponent = $row[$headers->search('Perbaikan Koneksi')];
                $settingComponent = $row[$headers->search('Setting')];
                $problemComponent = ($changeComponent ?? $fixedComponent ?? $settingComponent) ? Component::firstOrCreate([
                    'name' => $changeComponent ?? $fixedComponent ?? $settingComponent,
                ]) : null;
                if ($changeComponent != null || $changeComponent != '') {
                    $problemStatus = ProductProblemStatusEnum::CHANGED->value;
                } elseif ($fixedComponent != null || $fixedComponent != '') {
                    $problemStatus = ProductProblemStatusEnum::FIXED->value;
                } elseif ($settingComponent != null || $settingComponent != '') {
                    $problemStatus = ProductProblemStatusEnum::RE_SET->value;
                } else {
                    $problemStatus = ProductProblemStatusEnum::DRAFT->value;
                };
                $returStatus = ($row[$headers->search('Status')] == 'Closed') ? ReturnedProductStatusEnum::DONE->value : ReturnedProductStatusEnum::DRAFT->value;
                $finding = $row[$headers->search('Temuan')];
                $qty = $row[$headers->search('Jumlah')];
                $problemCause = $row[$headers->search('Gangguan Karena')];
                switch ($problemCause) {
                    case 'Workman Ship':
                        $problemCause = ProductProblemCauseEnum::WORKMAN_SHIP->value;
                    case 'Operational':
                        $problemCause = ProductProblemCauseEnum::OPERATIONAL->value;
                    default:
                        $problemCause = ProductProblemCauseEnum::QUALITY->value;
                }
                $carriageNumberHead = $headers->search('Nomor Kereta');
                $carriageNumberValue = trim($row[$carriageNumberHead]);
                $carriageNumberValue = str_replace(["\r\n", "\r", "\n"], ',', $carriageNumberValue);
                
                collect(explode(',', $carriageNumberValue))
                    ->each(function ($carNumber) use ($timestamp, $date, $tsName, $finding, $qty, $problemComponent, $problemStatus, $problemCause, $returStatus, &$carNumbers) {
                    if ($carNumber == null || $carNumber == '') return;
                    
                    $carNumber = strtoupper($carNumber);
                    
                    switch (true) {
                        case strpos($carNumber, 'K1') !== false:
                            $carType = 'K1';
                            break;
                        case strpos($carNumber, 'K3') !== false:
                            $carType = 'K3';
                            break;
                        case strpos($carNumber, 'M') !== false:
                            $carType = 'M';
                            break;
                        case strpos($carNumber, 'P') !== false:
                            $carType = 'P';
                            break;
                        default:
                            $carType = 'C';
                            break;
                    }
                    if (!isset($carNumbers[$carNumber."_".$date])) {
                        $carNumbers[$carNumber."_".$date] = 1;
                        $returnedProduct = ReturnedProduct::create([
                            'product_returnable_id' => ($problemComponent != null) 
                                ? $problemComponent->id 
                                : Panel::firstOrCreate([
                                    'name' => 'Grup Retur ' . $carNumber,
                                ]),
                            'product_returnable_type' => Component::class,
                            'qty' => $qty,
                            'serial_number' => $carNumber,
                            'trainset_name' => $tsName,
                            'carriage_type' => $carType,
                            'status' => $returStatus,
                            'created_at' => $timestamp,
                            'updated_at' => ($problemComponent != null) ? $timestamp + (rand(4, 9) * 60) : $timestamp,
                        ]);
                        $returnedProduct->returned_product_notes()->create([
                            'user_id' => auth()->id(),
                            'note' => $finding,
                            'applied_status' => $returnedProduct->status,
                            'created_at' => $timestamp,
                            'updated_at' => $timestamp,
                        ]);
                    } else {
                        $product = Panel::firstOrCreate([
                            'name' => 'Grup Retur ' . $carNumber,
                        ]);
                        $returnedProduct = ReturnedProduct::whereSerialNumber($carNumber)->get()->last();
                        $productProblemCount = $returnedProduct->product_problems()->count();
                        $returnedProduct->update([
                            'product_returnable_id' => $product->id,
                            'product_returnable_type' => Panel::class,
                            'qty' => 1,
                            'updated_at' => $timestamp + ($productProblemCount * 10 * 60),
                        ]);

                        $carNumbers[$carNumber."_".$date]++;
                    }
                    
                    $productProblem = ProductProblem::create([
                        'returned_product_id' => $returnedProduct->id,
                        'component_id' => $problemComponent->id,
                        'qty' => $qty,
                        'cause' => $problemCause,
                        'status' => $problemStatus,
                        'created_at' => $timestamp,
                        'updated_at' => $timestamp + (5 * 60),
                    ]);
                    $productProblem->product_problem_notes()->create([
                        'user_id' => auth()->id(),
                        'note' => $finding,
                        'applied_status' => $productProblem->status,
                        'created_at' => $timestamp,
                        'updated_at' => $timestamp,
                    ]);
                });
            });
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return $carNumbers;
    }
}
