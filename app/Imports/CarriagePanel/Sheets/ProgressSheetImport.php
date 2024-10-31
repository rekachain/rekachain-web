<?php

namespace App\Imports\CarriagePanel\Sheets;

use App\Models\CarriagePanel;
use App\Models\Progress;
use App\Models\Step;
use App\Models\WorkAspect;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class ProgressSheetImport implements ToCollection 
{
    public function __construct(private CarriagePanel $carriagePanel) {}

    public function collection(Collection $rows) 
    {
        $header = $rows->first();

        $steps = collect();
        foreach ($rows->skip(1) as $row) {
            if ($row[$header->search('Nama Proses')] == null || $row[$header->search('Nama Proses')] == '') {
                return;
            }
            if ($row[$header->search('Deskripsi')] == null || $row[$header->search('Deskripsi')] == '') {
                $steps->add(Step::firstOrCreate([
                    'name' => $row[$header->search('Nama Proses')],
                ]));
            } else {
                $steps->add(Step::firstOrCreate([
                    'name' => $row[$header->search('Nama Proses')],
                    'process' => $row[$header->search('Deskripsi')],
                ]));
            }
        }

        $progress = Progress::whereWorkAspectId(WorkAspect::whereDivisionId(3)->first()->id)->whereHas('progress_steps.step', function ($query) use ($steps) {
            $query->whereIn('name', $steps->pluck('name')->toArray());
        })->whereHas('progress_steps', function ($query) use ($steps) {
            $query->groupBy('progress_id')->havingRaw('count(*) = ' . count($steps));
        })->first();

        if (!$progress) {
            $progress = Progress::create([
                'name' => 'Fitting & Koneksi - ' . $this->carriagePanel->panel->name,
                'work_aspect_id' => WorkAspect::whereDivisionId(3)->first()->id
            ]);
            $progress->progress_steps()->createMany($steps->map(fn ($step) => ['step_id' => $step->id])->toArray());
        }

        $this->carriagePanel->update(['progress_id' => $progress->id]);
    }


    public function model(array $row) 
    {
        $progress = Progress::whereWorkAspectId(WorkAspect::whereDivisionId(3)->first()->id)->get();

        if (count($progress) > 0) {
            
        } else {
            $progress = Progress::firstOrCreate([
                'name' => 'Fitting & Koneksi - ' . $this->carriagePanel->panel->name,
                'work_aspect_id' => WorkAspect::whereDivisionId(3)->first()->id
            ]);
            $step = Step::firstOrCreate([
                'name' => $row['nama_proses'],
                'process' => $row['deskripsi'],
            ]);
            $progress->progress_steps()->create([
                'step_id' => $step->id
            ]);
            $this->carriagePanel->update(['progress_id' => $progress->id]);
        }
    }
}
