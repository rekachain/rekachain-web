<?php

namespace App\Imports\ReturnedProduct\Sheets;

use App\Models\Component;
use App\Models\Panel;
use App\Models\ProductProblem;
use App\Models\ReturnedProduct;
use App\Models\User;
use App\Support\Enums\ProductProblemCauseEnum;
use App\Support\Enums\ProductProblemStatusEnum;
use App\Support\Enums\ReturnedProductStatusEnum;
use DB;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ReturnedProductProblemSheetImport implements ToCollection {
    public function collection(Collection $rows) {
        $headers = $rows[0];
        $carNumbers = [];
        DB::beginTransaction();
        try {
            $rows->skip(1)->each(function ($row) use ($headers, &$carNumbers) {
                $timestamp = $row[$headers->search('Timestamp')];
                logger($timestamp);
                $tsName = $headers->search('Train Set');
                $changeComponent = $row[$headers->search('Pergantian Komponen')];
                $fixedComponent = $row[$headers->search('Perbaikan Koneksi')];
                $settingComponent = $row[$headers->search('Setting')];
                $problemComponent = Component::firstOrCreate([
                    'name' => $changeComponent ?? $fixedComponent ?? $settingComponent,
                ]);
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
                collect(explode(',', $carriageNumberValue))
                    ->each(function ($carNumber) use ($timestamp, $tsName, $finding, $qty, $problemComponent, $problemStatus, $problemCause, $returStatus, &$carNumbers) {
                    switch (true) {
                        case strpos(strtoupper($carNumber), 'K1') !== false:
                            $carType = 'K1';
                            break;
                        case strpos(strtoupper($carNumber), 'K3') !== false:
                            $carType = 'K3';
                            break;
                        case strpos(strtoupper($carNumber), 'M') !== false:
                            $carType = 'M';
                            break;
                        case strpos(strtoupper($carNumber), 'P') !== false:
                            $carType = 'P';
                            break;
                        default:
                            $carType = 'C';
                            break;
                    }
                    $serialNumber = str_replace($carType,'', $carNumber);
                    logger($serialNumber);
                    if (!isset($carNumbers[strtoupper($carNumber)])) {
                        $carNumbers[$carNumber] = 1;
                        $returnedProduct = ReturnedProduct::create([
                            'product_returnable_id' => $problemComponent->id,
                            'product_returnable_type' => Component::class,
                            'qty' => $qty,
                            'serial_number' => $serialNumber,
                            'trainset_name' => $tsName,
                            'carriage_type' => $carType,
                            'status' => $returStatus,
                            'created_at' => $timestamp,
                            'updated_at' => $timestamp,
                        ]);
                    } else {
                        $product = Panel::firstOrCreate([
                            'name' => 'Grup Retur ' . $carNumber,
                        ]);
                        $returnedProduct = ReturnedProduct::whereSerialNumber($serialNumber)->update([
                            'product_returnable_id' => $product->id,
                            'product_returnable_type' => Panel::class,
                            'updated_at' => $timestamp,
                        ]);
                        $carNumbers[$carNumber]++;
                    }
                    logger($returnedProduct);
                    
                    $productProblem = ProductProblem::create([
                        'returned_product_id' => $returnedProduct->id,
                        'component_id' => $problemComponent->id,
                        'cause' => $problemCause,
                        'status' => $problemStatus,
                    ]);
                    $returnedProduct->returned_product_notes()->create([
                        'user_id' => auth()->id(),
                        'note' => $finding,
                        'applied_status' => $returnedProduct->status,
                    ]);
                    $productProblem->product_problem_notes()->create([
                        'user_id' => auth()->id(),
                        'note' => $finding,
                        'applied_status' => $productProblem->status,
                    ]);
                    logger('asd');
                    logger()->info($returnedProduct);
                });
                // DB::commit();
            });
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
        logger()->info('asd',$carNumbers);
        // $product = $row['product_type'] == 'Panel' ? Panel::firstOrCreate([
        //     'name' => $row['product_name'],
        // ]) : Component::firstOrCreate([
        //     'name' => $row['product_name'],
        // ]);

        // $returnedProduct = ReturnedProduct::create([
        //     'product_returnable_id' => $product->id,
        //     'product_returnable_type' => $row['product_type'] == 'Panel' ? Panel::class : Component::class,
        //     'buyer_id' => User::firstOrCreate([
        //         'name' => $row['customer_optional'],
        //     ], ['password' => Hash::make('password')])->id,
        //     'serial_number' => $row['serial_number'],
        // ]);

        // $returnedProduct->returned_product_notes()->create([
        //     'user_id' => auth()->id(),
        //     'note' => $row['note'],
        // ]);

        return $carNumbers;
    }
}
