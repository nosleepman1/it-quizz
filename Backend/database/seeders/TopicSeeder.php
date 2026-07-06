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
        $topics = [];

        foreach ($subcategories as $sub) {
            for ($i = 1; $i <= 5; $i++) {
                $topics[] = [
                    'name' => 'Topic ' . $i . ' - ' . $sub->name,
                    'subcategory_id' => $sub->id,
                    'slug' => Str::slug($sub->name . '-topic-' . $i),
                    'description' => 'Description pour le topic ' . $i . ' de la sous-catégorie ' . $sub->name,
                    'icon' => 'fa-solid fa-book',
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        foreach (array_chunk($topics, 500) as $chunk) {
            Topic::insert($chunk);
        }
    }
}
