<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Theme extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'description',
        'is_active',
        'icon',
    ];

    public function categories(): HasMany
    { // Remarque : le champ 'slug' a été ajouté et est unique
        return $this->hasMany(Category::class);
    }
}
