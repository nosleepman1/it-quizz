<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AddSuccessFlag
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        /** @var Response $response */
        $response = $next($request);

        // Only modify JSON responses
        if (stripos($response->headers->get('Content-Type'), 'application/json') !== false) {
            $content = json_decode($response->getContent(), true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($content)) {
                // success is true for 2xx status codes
                $isSuccess = $response->isSuccessful();
                $content = array_merge(['success' => $isSuccess], $content);
                $response->setContent(json_encode($content, JSON_UNESCAPED_UNICODE));
            }
        }

        return $response;
    }
}
