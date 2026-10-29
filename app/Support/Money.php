<?php

namespace App\Support;

use InvalidArgumentException;

final class Money
{
    public static function decimals(string $currency): int
    {
        return match (strtoupper($currency)) {
            'BIF', 'CLP', 'DJF', 'GNF', 'JPY', 'KMF', 'KRW', 'MGA', 'PYG', 'RWF', 'UGX', 'VND', 'VUV', 'XAF', 'XOF', 'XPF' => 0,
            'BHD', 'IQD', 'JOD', 'KWD', 'LYD', 'OMR', 'TND' => 3,
            default => 2,
        };
    }

    public static function toMinor(string $amount, string $currency): int
    {
        $decimals = self::decimals($currency);

        if (! preg_match('/^\d{1,12}(?:\.\d{1,3})?$/', $amount)) {
            throw new InvalidArgumentException('Invalid monetary amount.');
        }

        [$whole, $fraction] = array_pad(explode('.', $amount, 2), 2, '');

        if (strlen($fraction) > $decimals) {
            throw new InvalidArgumentException('Too many decimal places for currency.');
        }

        return ((int) $whole * (10 ** $decimals)) + (int) str_pad($fraction, $decimals, '0');
    }
}
