<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DetailWorkerTrainsetResource;
use App\Http\Resources\TrainsetAttachmentResource;
use App\Http\Resources\SerialPanelResource;
use App\Models\DetailWorkerPanel;
use App\Models\TrainsetAttachment;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\TrainsetAttachmentStatusEnum;

use App\Support\Interfaces\Services\TrainsetAttachmentServiceInterface;
// use App\Support\Interfaces\Services\SerialPanelServiceInterface;
use Illuminate\Http\Request;

class ApiTrainsetAttachmentController extends Controller {
    public function __construct(
        protected TrainsetAttachmentServiceInterface $trainsetAttachmentService,
        // protected SerialPanelServiceInterface $serialPanelService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $perPage = request()->get('perPage', 5);
        $intent = request()->get('intent');
        
        if ($intent === IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_PROCESS->value) {
            $request->merge(['intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS->value]);

            return TrainsetAttachmentResource::collection($this->trainsetAttachmentService->find(['supervisor_id'=> $request->user()->id,
            'status' => TrainsetAttachmentStatusEnum::IN_PROGRESS->value]));
        } else if ($intent === IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_DONE->value) {
            $request->merge(['intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS->value]);

            return TrainsetAttachmentResource::collection($this->trainsetAttachmentService->find(['supervisor_id'=> $request->user()->id,
            'status' => TrainsetAttachmentStatusEnum::DONE->value]));
        } else {
            $request->merge(['intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS->value]);

            return TrainsetAttachmentResource::collection($this->trainsetAttachmentService->find(['supervisor_id'=> $request->user()->id]));
        }
        
        

        // return PanelAttachmentResource::collection($this->panelAttachmentService->getAllPaginated($request->query(), $perPage));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(TrainsetAttachment $trainsetAttachment, Request $request) {
        $intent = request()->get('intent');

        switch ($intent) {
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS->value:
                return TrainsetAttachmentResource::collection($this->trainsetAttachmentService->find(['supervisor_id'=> $request->user()->id, 
                'id' => $trainsetAttachment->id]));
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_QR->value:
                $qr = request()->get('qr_code');
                if ($qr) {
                    if ($trainsetAttachment->qr_code == $qr) {
                        $request->merge(['intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS->value]);
                        return new TrainsetAttachmentResource($trainsetAttachment);
                    }
                    abort(400, 'Invalid KPM QR code');
                } else {
                    abort(400, 'QR code not identified');
                }

            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBERS->value:
                $request->merge(['intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBERS->value]);

                return SerialPanelResource::collection($this->serialPanelService->find([
                    'panel_attachment_id' => $panelAttachment->id,
                ]));
            case IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS_WITH_QR->value:
                $qr = request()->get('qr_code');
                if ($qr) {
                    $serialPanel = $this->serialPanelService->find([
                        'panel_attachment_id' => $panelAttachment->id,
                        'qr_code' => $qr,
                    ])->first();

                    if ($serialPanel) {
                        $request->merge(['intent' => IntentEnum::API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS->value]);

                        return new SerialPanelResource($serialPanel);
                    }
                    abort(400, 'Invalid SN QR code');
                }
                abort(400, 'QR code not identified');
        }
        abort(404, 'NOTHING TO SHOW🗿');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}