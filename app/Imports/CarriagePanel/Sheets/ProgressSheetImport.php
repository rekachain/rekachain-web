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
    public function __construct(private CarriagePanel $carriagePanel, protected ?bool $override = null) {}

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
        $progresses = Progress::whereWorkAspectId($workAspectId)
            ->whereHas('progress_steps', function ($query) use ($steps) {
                $query->whereIn('step_id', $steps->pluck('id')->toArray())
                    ->groupBy('progress_id')
                    ->havingRaw('COUNT(*) = ?', [count($steps)]);
            })
            ->whereDoesntHave('progress_steps', function ($query) use ($steps) {
                $query->whereNotIn('step_id', $steps->pluck('id')->toArray());
            });

        $progress = null;
        foreach ($progresses->get() as $foundedProgress) {
            if ($foundedProgress->progress_steps->pluck('step_id')->values() == $steps->pluck('id')->values()) {
                $progress = $foundedProgress;
                break;
            }
        }
        logger($progress ? $progress->progress_steps : 'No matching progress found');

        if (is_null($progress)) {
            $progress = Progress::create([
                'name' => 'Fitting & Koneksi - ' . $this->carriagePanel->panel->name,
                'work_aspect_id' => $workAspectId,
            ]);
            $progress->progress_steps()->createMany($steps->map(fn ($step) => ['step_id' => $step->id])->toArray());
        }

        if (is_null($this->carriagePanel->panel->progress)) {
            $this->carriagePanel->panel->update(['progress_id' => $progress->id]);
        }
        if (is_null($this->override) || $this->override) {
            // update progress no matter what🗿
            return $this->carriagePanel->update(['progress_id' => $progress->id]);
        } else {
            // update progress only if carriage panel progress is null
            return $this->carriagePanel->update(['progress_id' => $this->carriagePanel->progress_id ?? $progress->id]);
        }
    }

}
