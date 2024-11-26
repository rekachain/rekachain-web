<!-- ATTACHMENT NOTE WEB ROUTE NOT READY -->
<?php

beforeEach(function () {
    $this->dummy->createSupervisorElektrik();
    $this->dummy->createSupervisorMekanik();
    $this->dummy->createSupervisorAssembly();
});

test('index returns attachment notes', function () {
    $this->dummy->createTrainsetAttachment()->attachment_notes()->create([
        'note' => 'Test note',
        'status' => 'Test status',
    ]);
    actAsSuperAdmin()->getJson('/attachment-notes')
        ->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'note',
                    'status',
                    'created_at',
                    'updated_at'
                ]
            ],
            'meta'
        ]);
});

test('create attachment notes', function () {
    $this->dummy->createTrainsetAttachment()->attachment_notes()->create([
        'note' => 'Test note',
        'status' => 'Test status',
    ]);
    actAsSuperAdmin()->get('/attachment-notes/create')
        ->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('AttachmentNote/Create'));
});

test('store attachment notes', function () {
    actAsSuperAdmin()->postJson('/attachment-notes', [
        'note' => 'Test note',
        'status' => 'Test status',
    ])->assertStatus(201);

    $this->assertDatabaseHas('attachment_notes', [
        'note' => 'Test note',
        'status' => 'Test status',
    ]);
});

test('show attachment notes', function () {
    $attachmentNote = $this->dummy->createTrainsetAttachment()->attachment_notes()->create([
        'note' => 'Test note',
        'status' => 'Test status',
    ]);
    actAsSuperAdmin()->getJson('attachment-notes/' . $attachmentNote->id)
        ->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('AttachmentNote/Show'));
});

test('edit attachment notes', function () {
    $attachmentNote = $this->dummy->createTrainsetAttachment()->attachment_notes()->create([
        'note' => 'Test note',
        'status' => 'Test status',
    ]);
    actAsSuperAdmin()->get("/attachment-notes/{$attachmentNote->id}/edit")
        ->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert->component('AttachmentNote/Edit'));
});

test('update attachment notes', function () {
    $attachmentNote = $this->dummy->createTrainsetAttachment()->attachment_notes()->create([
        'note' => 'Test note',
        'status' => 'Test status',
    ]);
    actAsSuperAdmin()->put('/attachment-notes/' . $attachmentNote->id, [
        'note' => 'Test update note',
        'status' => 'Test update status',
    ])->assertStatus(200);

    $this->assertDatabaseHas('attachment_notes', [
        'id' => $attachmentNote->id,
        'note' => 'Test update note',
        'status' => 'Test update status',
    ]);
});

test('destroy attachment notes', function () {
    $attachmentNote = $this->dummy->createTrainsetAttachment()->attachment_notes()->create([
        'note' => 'Test note',
        'status' => 'Test status',
    ]);
    actAsSuperAdmin()->delete('/attachment-notes/' . $attachmentNote->id)
        ->assertStatus(204);

    $this->assertDatabaseMissing('attachment_notes', [
        'id' => $attachmentNote->id,
    ]);
});
