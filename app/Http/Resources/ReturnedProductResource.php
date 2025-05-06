<?php

namespace App\Http\Resources;

use App\Models\Component;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\PermissionEnum;
use App\Support\Enums\RoleEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReturnedProductResource extends JsonResource {
    public function toArray(Request $request): array {
        $intent = $request->get('intent');

        switch ($intent) {
            case IntentEnum::WEB_RETURNED_PRODUCT_GET_PRODUCT_PROBLEM_COMPONENTS->value:
                return $this->product_problems->map(fn ($productProblem) => [
                    ...ComponentResource::make($productProblem->component)->toArray($request),
                ])->toArray();
            case IntentEnum::WEB_RETURNED_PRODUCT_GET_RETURNED_PRODUCT_COMPONENTS->value:
                if ($this->product_returnable_type === Component::class) {
                    return ComponentResource::make($this->product_returnable)->toArray($request);
                }
                $serialPanel = $this->serial_panel;
                if ($serialPanel) {
                    $carrPanelComponents = $serialPanel->panel_attachment->carriage_panel->carriage_panel_components;
                } else {
                    $carriagePanelComponents = $this->product_returnable->carriage_panel_components()->distinct()->get()->groupBy('component_id')->map(fn ($group) => $group->first());
                    $carrPanelComponents = $carriagePanelComponents ? $carriagePanelComponents : [];
                }

                return $carrPanelComponents->map(fn ($carPanelComponent) => [
                    ...ComponentResource::make($carPanelComponent->component)->toArray($request),
                ])->toArray();
        }

        return [
            'id' => $this->id,
            'product_returnable_id' => $this->product_returnable_id,
            'product_returnable_type' => $this->product_returnable_type,
            'product_return' => $this->whenLoaded('product_returnable'),
            'buyer_id' => $this->buyer_id,
            'buyer' => $this->whenLoaded('buyer', function () {
                return checkPermissionsAndRoles([PermissionEnum::RETURNED_PRODUCT_READ], [RoleEnum::WORKER_AFTERSALES, RoleEnum::MANAGER_AFTERSALES, RoleEnum::MANAGER_AFTERSALES], true) ?
                    UserResource::make($this->buyer) : [
                        'name' => $this->buyer->name,
                        'phone_number' => $this->buyer->phone_number,
                    ];
            }),
            'qty' => $this->qty,
            'serial_panel_id' => $this->serial_panel_id,
            'serial_panel' => $this->whenLoaded('serial_panel'),
            'project_sub' => $this->whenLoaded('serial_panel', function () {
                return $this->serial_panel->project->name . ' - ' . $this->serial_panel->trainset->name . ' - ' . $this->serial_panel->carriage->type;
            }),
            'serial_number' => $this->serial_number,
            'status' => $this->status,
            'localized_status' => $this->status->getLabel(),
            'image_path' => $this->image_path,
            'image' => $this->image,
            'product_problems' => ProductProblemResource::collection($this->whenLoaded('product_problems')),
            'returned_product_notes' => ReturnedProductNoteResource::collection(
                $this->whenLoaded('returned_product_notes', function () {
                    return $this->returned_product_notes->sortByDesc('updated_at');
                })
            ),
            'latest_returned_product_note' => ReturnedProductNoteResource::make($this->returned_product_notes->last()),
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
