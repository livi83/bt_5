<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\pages\HomeController;

//Routes
Route::get('/',HomeController::class);
