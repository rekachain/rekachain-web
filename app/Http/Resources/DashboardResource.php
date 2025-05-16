<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DashboardResource extends JsonResource {
    public function toArray(Request $request): array {
        $intent = $this->intent ?? $request->get('intent');
        switch ($intent) {
            case IntentEnum::WEB_DASHBOARD_GET_RETURNED_PRODUCT_TIME_DIFFERENCE->value:
                return [
                    'year_month' => $this->year_month,
                    'avg_duration' => $this->avg_duration,
                    'total_returned' => $this->total_returned,
                    'total_problem' => $this->total_problem
                ];
            case IntentEnum::WEB_DASHBOARD_GET_RETURNED_PRODUCT_TIME_MIN_MAX->value:
                return [
                    'year_month' => $this->year_month,
                    'min_duration' => $this->min_duration??0,
                    'min_duration_formatted' => $this->min_duration_formatted??'',
                    'max_duration' => $this->max_duration??0,
                    'max_duration_formatted' => $this->max_duration_formatted??'',
                ];
            case IntentEnum::WEB_DASHBOARD_GET_PRODUCT_PROBLEM->value:
                return [
                    'component_name' => $this->component_name ?? '',
                    'notes' => $this->notes ?? '',
                    'date_range' => $this->date_range ?? '',
                    'total_problem' => $this->total_problem ?? 0,
                ];
            case IntentEnum::WEB_DASHBOARD_GET_VENDOR_PROBLEM_COMPONENTS->value:
                return [
                    'vendor_name' => $this->vendor_name,
                    'total_component' => $this->total_component,
                    'total_sent' => $this->total_sent,
                    'total_problem' => $this->total_problem,
                    'problem_percent' => number_format($this->problem_percent, 2),
                ];
            default:
                return [];
        }
    }
}
