<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Tests\Feature\Http\Controllers\Helpers\Dummy;

abstract class TestCase extends BaseTestCase {
    use CreatesApplication;

    protected Dummy $dummy;

    protected function setUp(): void {
        parent::setUp();
        $this->dummy = new Dummy();
    }
}
