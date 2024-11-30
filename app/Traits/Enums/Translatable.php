<?php

namespace App\Traits\Enums;

trait Translatable {
    public function getLabel(): string {
        $key = sprintf('%s.%s', static::class, $this->value);

        return __('enums.' . $key);
    }
}
