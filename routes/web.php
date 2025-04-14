<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\pages\HomeController;
use App\Http\Controllers\admin\PostController; //pridane
//Routes
Route::get('/',HomeController::class);
Route::resource('admin/posts', PostController::class);//pridane
