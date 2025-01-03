# 📚 Documentation complète de l'API IT‑Quiz (v1)

---

## 🔐 Authentification
### `POST /api/login`
```json
{
  "email": "user@example.com",
  "password": "secret",
  "device_name": "postman"
}
```
*`device_name`* est uniquement une étiquette pour identifier le token.

**Réponse**
```json
{
  "token": "<plain‑text‑token>"
}
```
Utilisez ce token dans le header `Authorization: Bearer <token>` pour toutes les routes protégées.

---

## 📦 Ressources CRUD
> Toutes les routes suivantes sont protégées par le middleware `auth:sanctum`.
>
> **Base URL** : `http://<votre-domaine>/api/`
>
> **En‑tête requis** : `Authorization: Bearer <token>`
>
> **Pagination** : les collections utilisent la pagination Laravel (`links`, `meta`).

### 1️⃣ Thèmes (`Theme`)
| Méthode | URI | Description |
|--------|-----|-------------|
| `GET` | `/themes` | Liste paginée des thèmes |
| `POST` | `/themes` | Crée un thème |
| `GET` | `/themes/{id}` | Détails d’un thème |
| `PUT/PATCH` | `/themes/{id}` | Met à jour un thème |
| `DELETE` | `/themes/{id}` | Supprime un thème |

**Payload `POST /themes`** (`StoreThemeRequest`)
```json
{
  "name": "Technologie & Innovation",
  "slug": "technologie-innovation",
  "description": "Thème dédié aux nouvelles tech",
  "icon": "fa-solid fa-rocket",
  "is_active": true
}
```
**Payload `PUT /themes/{id}`** (`UpdateThemeRequest`) – tous les champs sont `sometimes`:
```json
{
  "slug": "nouveau-slug",
  "name": "Nouveau nom",
  "description": "Nouvelle description",
  "icon": "fa-solid fa-new-icon",
  "is_active": false
}
```
---

### 2️⃣ Catégories (`Category`)
| Méthode | URI | Description |
|--------|-----|-------------|
| `GET` | `/categories` | Liste paginée |
| `POST` | `/categories` | Crée une catégorie |
| `GET` | `/categories/{id}` | Détails |
| `PUT/PATCH` | `/categories/{id}` | Met à jour |
| `DELETE` | `/categories/{id}` | Supprime |

**Payload `POST /categories`** (`StoreCategoryRequest`)
```json
{
  "name": "Science",
  "theme_id": 1,
  "slug": "science",
  "description": "Articles scientifiques",
  "is_active": true,
  "icon": "fa-solid fa-flask"
}
```
---

### 3️⃣ Sous‑catégories (`Subcategory`)
| Méthode | URI | Description |
|--------|-----|-------------|
| `GET` | `/subcategories` | Liste |
| `POST` | `/subcategories` | Crée |
| `GET` | `/subcategories/{id}` | Détails |
| `PUT/PATCH` | `/subcategories/{id}` | Met à jour |
| `DELETE` | `/subcategories/{id}` | Supprime |

**Payload `POST /subcategories`** (`StoreSubcategoryRequest`)
```json
{
  "name": "Algorithmes",
  "category_id": 2,
  "slug": "algorithmes",
  "description": "Sous‑catégorie d'algorithmes",
  "is_active": true,
  "icon": "fa-solid fa-code"
}
```
---

### 4️⃣ Topics (`Topic`)
| Méthode | URI | Description |
|--------|-----|-------------|
| `GET` | `/topics` | Liste |
| `POST` | `/topics` | Crée |
| `GET` | `/topics/{id}` | Détails |
| `PUT/PATCH` | `/topics/{id}` | Met à jour |
| `DELETE` | `/topics/{id}` | Supprime |

**Payload `POST /topics`** (`StoreTopicRequest`)
```json
{
  "subcategory_id": 3,
  "theme_id": 1,
  "name": "Machine Learning",
  "slug": "machine-learning",
  "description": "Topic about ML",
  "is_active": true
}
```
---

### 5️⃣ Questions (`Question`)
| Méthode | URI | Description |
|--------|-----|-------------|
| `GET` | `/questions` | Liste |
| `POST` | `/questions` | Crée |
| `GET` | `/questions/{id}` | Détails |
| `PUT/PATCH` | `/questions/{id}` | Met à jour |
| `DELETE` | `/questions/{id}` | Supprime |

**Payload `POST /questions`** (`StoreQuestionRequest`)
```json
{
  "topic_id": 4,
  "text": "Quelle est la complexité de quicksort ?",
  "question_type": "multiple",
  "difficulty": "facile",
  "time_limit": 60,
  "points": 10,
  "is_active": true
}
```
---

### 6️⃣ Choix (`Choice`)
| Méthode | URI | Description |
|--------|-----|-------------|
| `GET` | `/choices` | Liste |
| `POST` | `/choices` | Crée |
| `GET` | `/choices/{id}` | Détails |
| `PUT/PATCH` | `/choices/{id}` | Met à jour |
| `DELETE` | `/choices/{id}` | Supprime |

**Payload `POST /choices`** (`StoreChoiceRequest`)
```json
{
  "question_id": 5,
  "choice_text": "O(N log N)",
  "is_correct": true
}
```
---

### 7️⃣ Quizzes (`Quiz`)
| Méthode | URI | Description |
|--------|-----|-------------|
| `GET` | `/quizzes` | Liste des quizzes de l'utilisateur |
| `POST` | `/quizzes` | Crée un quiz (store) |
| `GET` | `/quizzes/{id}` | Détails du quiz |
| `PUT/PATCH` | `/quizzes/{id}` | Met à jour |
| `DELETE` | `/quizzes/{id}` | Supprime |
| `POST` | `/quizzes/{quiz}/complete` | Marque le quiz comme terminé (custom) |

**Payload `POST /quizzes`** (`StoreQuizRequest`)
```json
{
  "user_id": 1,
  "topic_id": 4,
  "difficulty": "moyen",
  "status": "inachevé",
  "total_questions": 20,
  "total_correct_answers": 0
}
```
**Payload `POST /quizzes/{quiz}/complete`**
```json
{
  "total_correct_answers": 15,
  "accuracy": 75,
  "time_taken": 300,
  "difficulty": "moyen"
}
```
---
### 🧪 Tester le Quiz (`Quiz`)

#### Étapes rapides avec `curl`

1️⃣ **Créer un quiz**
```bash
curl -X POST http://localhost/api/quizzes \
 -H "Authorization: Bearer $TOKEN" \
 -H "Content-Type: application/json" \
 -d '{"user_id":1,"topic_id":4,"difficulty":"facile"}'
```

2️⃣ **Récupérer les questions du quiz**
```bash
curl -X GET "http://localhost/api/quizzes/$QUIZ_ID/questions" \
 -H "Authorization: Bearer $TOKEN"
```

3️⃣ **Soumettre les réponses**
```bash
curl -X POST http://localhost/api/quizzes/$QUIZ_ID/complete \
 -H "Authorization: Bearer $TOKEN" \
 -H "Content-Type: application/json" \
 -d '{"answers":[{"question_id":1,"choice_id":5},{"question_id":2,"choice_id":12}]}'
```

4️⃣ **Vérifier le résultat**
La réponse du dernier appel contient `total_correct_answers`, `accuracy` et le `difficulty`.

#### Tests automatisés (Laravel)

```php
public function test_user_can_complete_quiz()
{
    $user = User::factory()->create();
    $topic = Topic::factory()->create();

    $quiz = Quiz::factory()->create(['user_id' => $user->id, 'topic_id' => $topic->id]);

    $response = $this->actingAs($user, 'sanctum')
        ->postJson("/api/quizzes/{$quiz->id}/complete", [
            'answers' => [
                ['question_id' => 1, 'choice_id' => 5],
                ['question_id' => 2, 'choice_id' => 12],
            ],
        ]);

    $response->assertStatus(200)
             ->assertJsonStructure(['total_correct_answers','accuracy','difficulty']);
}
```

Exécutez :

```bash
php artisan test --filter QuizTest
```


### 8️⃣ Scores (`Score`)
| Méthode | URI | Description |
|--------|-----|-------------|
| `GET` | `/scores` | Liste |
| `POST` | `/scores` | Crée |
| `GET` | `/scores/{id}` | Détails |
| `PUT/PATCH` | `/scores/{id}` | Met à jour |
| `DELETE` | `/scores/{id}` | Supprime |

**Payload `POST /scores`** (`StoreScoreRequest`)
```json
{
  "user_id": 1,
  "topic_id": 4,
  "score": 85,
  "rank": 12
}
```
---

### 9️⃣ Leaderboards (`Leaderboard`)
| Méthode | URI | Description |
|--------|-----|-------------|
| `GET` | `/leaderboards` | Liste |
| `POST` | `/leaderboards` | Crée |
| `GET` | `/leaderboards/{id}` | Détails |
| `PUT/PATCH` | `/leaderboards/{id}` | Met à jour |
| `DELETE` | `/leaderboards/{id}` | Supprime |

**Payload `POST /leaderboards`** (`StoreLeaderboardRequest`)
```json
{
  "user_id": 1,
  "topic_id": 4,
  "total_points": 1500,
  "rank": 5
}
```
---

### 🔢 Progression utilisateur (`UserProgress`)
| Méthode | URI | Description |
|--------|-----|-------------|
| `GET` | `/user-progress` | Liste |
| `POST` | `/user-progress` | Crée |
| `GET` | `/user-progress/{id}` | Détails |
| `PUT/PATCH` | `/user-progress/{id}` | Met à jour |
| `DELETE` | `/user-progress/{id}` | Supprime |

**Payload `POST /user-progress`** (`StoreUserProgressRequest`)
```json
{
  "user_id": 1,
  "topic_id": 4,
  "total_questions": 20,
  "total_correct_answers": 15,
  "mastery_level": "intermédiaire",
  "last_practice_at": "2026-06-12T19:30:00Z"
}
```
---

### 🏅 Badges (`Badge`)
| Méthode | URI | Description |
|--------|-----|-------------|
| `GET` | `/badges` | Liste |
| `POST` | `/badges` | Crée |
| `GET` | `/badges/{id}` | Détails |
| `PUT/PATCH` | `/badges/{id}` | Met à jour |
| `DELETE` | `/badges/{id}` | Supprime |

**Payload `POST /badges`** (`StoreBadgeRequest`)
```json
{
  "name": "Champion du Quiz",
  "description": "Réussir 100 quizzes",
  "icon": "fa-solid fa-trophy",
  "condition_type": "score",
  "condition_value": 100
}
```
---

### 👤 Utilisateurs (`User`)
| Méthode | URI | Description |
|--------|-----|-------------|
| `GET` | `/users` | Liste des utilisateurs |
| `POST` | `/users` | Crée un utilisateur |
| `GET` | `/users/{id}` | Détails d’un utilisateur |
| `PUT/PATCH` | `/users/{id}` | Met à jour |
| `DELETE` | `/users/{id}` | Supprime |

**Payload `POST /users`** (`StoreUserRequest`)
```json
{
  "username": "jane.doe",
  "email": "jane@example.com",
  "password": "Secret123",
  "role": "admin",
  "is_active": true,
  "avatar": "https://example.com/avatar.jpg"
}
```
---

## 📌 Remarques supplémentaires
- **Gestion des erreurs** : en cas d’erreur de validation, Laravel renvoie un statut `422` avec les messages personnalisés définis dans chaque `FormRequest` (ex. : « Le nom d'utilisateur est déjà pris. »).
- **Pagination** : les collections renvoient `data`, `links` et `meta`. Utilisez les paramètres `page` et `per_page` pour contrôler la pagination.
- **Token** : le token généré est un plain‑text token ; il doit être stocké côté client de façon sécurisée (ex. : stockage `localStorage` ou `httpOnly cookie`).
- **Refresh** : aucune route de rafraîchissement n’est implémentée ; il faut simplement créer un nouveau token via `/login`.

---

*Document généré automatiquement le 2026‑06‑12.*
