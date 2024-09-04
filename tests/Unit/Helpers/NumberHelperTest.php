<?php

use App\Helpers\NumberHelper;

it('should return correct roman number', function () {
    $this->assertEquals('I', NumberHelper::intToRoman(1));
    $this->assertEquals('II', NumberHelper::intToRoman(2));
    $this->assertEquals('III', NumberHelper::intToRoman(3));
    $this->assertEquals('IV', NumberHelper::intToRoman(4));
    $this->assertEquals('V', NumberHelper::intToRoman(5));
    $this->assertEquals('VI', NumberHelper::intToRoman(6));
    $this->assertEquals('VII', NumberHelper::intToRoman(7));
    $this->assertEquals('VIII', NumberHelper::intToRoman(8));
    $this->assertEquals('IX', NumberHelper::intToRoman(9));
    $this->assertEquals('X', NumberHelper::intToRoman(10));
    $this->assertEquals('XI', NumberHelper::intToRoman(11));
    $this->assertEquals('XII', NumberHelper::intToRoman(12));
    $this->assertEquals('XIII', NumberHelper::intToRoman(13));
    $this->assertEquals('XIV', NumberHelper::intToRoman(14));
    $this->assertEquals('XV', NumberHelper::intToRoman(15));
    $this->assertEquals('XVI', NumberHelper::intToRoman(16));
    $this->assertEquals('XVII', NumberHelper::intToRoman(17));
    $this->assertEquals('XVIII', NumberHelper::intToRoman(18));
    $this->assertEquals('XIX', NumberHelper::intToRoman(19));
    $this->assertEquals('XX', NumberHelper::intToRoman(20));
    $this->assertEquals('XXI', NumberHelper::intToRoman(21));
    $this->assertEquals('XXII', NumberHelper::intToRoman(22));
    $this->assertEquals('XXIII', NumberHelper::intToRoman(23));
    $this->assertEquals('XXIV', NumberHelper::intToRoman(24));
    $this->assertEquals('XXV', NumberHelper::intToRoman(25));
    $this->assertEquals('XXVI', NumberHelper::intToRoman(26));
    $this->assertEquals('XXVII', NumberHelper::intToRoman(27));
    $this->assertEquals('XXVIII', NumberHelper::intToRoman(28));
});
