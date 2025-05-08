<?php

namespace App\Http\Resources;

use App\Support\Enums\IntentEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DashboardResource extends JsonResource {
    public function toArray(Request $request): array {
        $intent = $request->get('intent');
        switch ($intent) {
            case IntentEnum::WEB_DASHBOARD_GET_RETURNED_PRODUCT_TIME_DIFFERENCE->value:
                return [
                    'year_month' => $this->year_month,
                    'avg_duration' => $this->avg_duration,
                    'total_returned' => $this->total_returned
                ];
            default:
                return [];
        }
    }
}
