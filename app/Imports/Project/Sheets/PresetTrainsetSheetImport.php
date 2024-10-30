<?php

namespace App\Imports\Project\Sheets;

use App\Imports\Project\ProjectsImport;
use App\Models\Carriage;
use App\Models\CarriagePreset;
use App\Models\PresetTrainset;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Facades\Excel;

class PresetTrainsetSheetImport implements ToCollection
{
    private $parent;

    public function __construct(ProjectsImport $parent) 
    {
        $this->parent = $parent;
    }
    
    public function collection(Collection $rows)
    {
        // Retrieve the Project instance from the parent import class
        $project = $this->parent->getProject();
        logger($rows);
        // [
        //     ["=CONCATENATE(\"Preset Trainset Proyek  \", [1]Proyek!B1)",null,null,null,null,null,null],
        //     ["No.","Nama","Gerbong",null,null,null,null],
        //     [null,null,"C","K1","K3","M","P"],
        //     [1,"Custom",0,0,0,0,0],
        //     [2,"TSA",0,9,0,1,1],
        //     [3,"TSB",0,4,5,1,1],
        //     [4,"TSC",0,0,8,1,1],
        //     [5,"TSD",0,5,3,1,2],
        //     [6,"TSE",1,3,2,0,1],
        //     [null,null,null,null,null,null,null]
        // ]  
        
        $headers = $rows[2]->filter();
        $rows->skip(3)->each(function ($row) use ($project, $headers) {
            if ($row[1] == null || $row[1] == '') {
                return;
            }
            // logger($row[1]);
            // $preset = PresetTrainset::whereProjectId($project->id)->whereName($row[1])->first();
            // if (!$preset) {
            $preset = PresetTrainset::create([
                'project_id' => $project->id,
                'name' => $row[1],
            ]);
            // }
            $carriagePreset = [];
            foreach ($headers as $index => $header) {
                // logger('index: ' . $index . ' header: ' . $header);
                $carriagePreset[$header] = $row[$index];
            }
            foreach ($carriagePreset as $key => $value) {
                if ($value != 0) {
                    // logger($key.' '.$value);
                    CarriagePreset::create([
                        'preset_trainset_id' => $preset->id,
                        'carriage_id' => Carriage::whereType($key)->first()->id,
                        'qty' => $value
                    ]);
                }
            }
        });
    }
}
