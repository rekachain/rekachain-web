<?php

namespace App\Traits\Enums;

trait Translatable {
    public function getLabel(): string {
        $key = sprintf('%s.%s', static::class, $this->value);

        return __('enums.' . $key);
    }

    public static function getLocalizedLabels(): array {
        return array_combine(
            array_column(self::cases(), 'value'),
            array_map(fn(self $case) => $case->getLabel(), self::cases())
        );
    }
}
