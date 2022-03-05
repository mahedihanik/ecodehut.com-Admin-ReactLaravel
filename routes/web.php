<?php
namespace App\Model;

use Illuminate\Support\Facades\Route;




Route::get('/ContactList','ContactTableController@ContactList')->middleware('loginCheck');
Route::post('/ContactDelete','ContactTableController@ContactDelete')->middleware('loginCheck');


Route::get('/ReviewList','ClientReviewController@ClientReviewList')->middleware('loginCheck');
Route::post('/ReviewDelete','ClientReviewController@ClientReviewDelete')->middleware('loginCheck');
Route::post('/AddReview','ClientReviewController@AddReview')->middleware('loginCheck');



Route::get('/ServiceList','ServiceTableController@ServiceList')->middleware('loginCheck');
Route::post('/ServiceDelete','ServiceTableController@ServiceDelete')->middleware('loginCheck');
Route::post('/AddService','ServiceTableController@AddService')->middleware('loginCheck');

Route::get('/ProjectList','ProjectTableController@ProjectList')->middleware('loginCheck');
Route::post('/ProjectDelete','ProjectTableController@ProjectDelete')->middleware('loginCheck');
Route::post('/AddProject','ProjectTableController@AddProject')->middleware('loginCheck');



Route::get('/CourseList','CourseTableController@CourseList')->middleware('loginCheck');
Route::post('/CourseDelete','CourseTableController@CourseDelete')->middleware('loginCheck');
Route::post('/AddCourse','CourseTableController@AddCourse')->middleware('loginCheck');




Route::get('/LoginPage','AdminLoginController@LoginPage');
Route::get('/Logout','AdminLoginController@onLogout');
Route::get('/onLogin/{UserName}/{PassWord}','AdminLoginController@onLogin');


// Home Data Manage....
Route::get('/CountSummary','HomeEtcController@CountSummary')->middleware('loginCheck');



Route::get('/', function () {
    return view('index');
})->middleware('loginCheck');
Route::get('{AnyRoute}', function () {
    return view('index');
})->where('AnyRoute','.*')->middleware('loginCheck');
