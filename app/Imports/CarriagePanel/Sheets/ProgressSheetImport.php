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
            if (empty($row[$header->search('Nama Proses')])) {
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
        
        $workAspectId = WorkAspect::whereDivisionId(3)->first()->id;
        $progress = Progress::whereWorkAspectId($workAspectId)
            ->whereHas('progress_steps', function ($query) use ($steps) {
                $query->whereIn('step_id', $steps->pluck('id')->toArray())
                    ->groupBy('progress_id')
                    ->havingRaw('COUNT(*) = ?', [count($steps)]);
            })
            ->first();

        if (!$progress) {
            $progress = Progress::create([
                'name' => 'Fitting & Koneksi - ' . $this->carriagePanel->panel->name,
                'work_aspect_id' => $workAspectId,
            ]);
            $progress->progress_steps()->createMany($steps->map(fn ($step) => ['step_id' => $step->id])->toArray());
        }

        $this->carriagePanel->update(['progress_id' => $progress->id]);
    }

}
