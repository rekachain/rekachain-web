<?php

namespace App\Imports\CarriagePanelComponent\Sheets;

use App\Models\CarriagePanelComponent;
use App\Models\Progress;
use App\Models\Step;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class ProgressSheetImport implements ToCollection 
{
    public function __construct(
        private CarriagePanelComponent $carriagePanelComponent,
        private int $workAspectId
    ) {}

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
        logger(count($steps));

        $progress = Progress::whereWorkAspectId($this->workAspectId)
            ->whereHas('progress_steps', function ($query) use ($steps) {
                $query->whereIn('step_id', $steps->pluck('id')->toArray())
                    ->groupBy('progress_id')
                    ->havingRaw('COUNT(*) = ?', [count($steps)]);
            })
            ->whereDoesntHave('progress_steps', function ($query) use ($steps) {
                $query->whereNotIn('step_id', $steps->pluck('id')->toArray());
            })
            ->first();
        logger($progress ? $progress->progress_steps : 'No matching progress found');

        if (!$progress) {
            $progress = Progress::create([
                'name' => 'Fitting & Koneksi - ' . $this->carriagePanelComponent->carriage_panel->panel->name,
                'work_aspect_id' => $this->workAspectId,
            ]);
            $progress->progress_steps()->createMany($steps->map(fn ($step) => ['step_id' => $step->id])->toArray());
        }

        $this->carriagePanelComponent->update(['progress_id' => $progress->id]);
    }

}
