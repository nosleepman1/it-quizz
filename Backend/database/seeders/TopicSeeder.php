<?php

namespace Database\Seeders;

use App\Models\Subcategory;
use App\Models\Topic;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TopicSeeder extends Seeder
{
    public function run(): void
    {
        $subcategories = Subcategory::all();
        foreach ($subcategories as $sub) {
            for ($i = 1; $i <= 3; $i++) {
                Topic::create([
                    'name' => $sub->name . ' Topic ' . $i,
                    'subcategory_id' => $sub->id,
                    'slug' => Str::slug($sub->name . '-topic-' . $i),
                    'description' => 'Description for ' . $sub->name . ' topic ' . $i,
                    'icon' => 'fa-solid fa-book',
                    'is_active' => true,
                ]);
            }
        }
    }
}
