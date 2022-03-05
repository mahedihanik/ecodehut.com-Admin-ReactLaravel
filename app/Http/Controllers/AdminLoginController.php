<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\AdminLoginModel;


class AdminLoginController extends Controller
{
    function LoginPage(){
        return view('login');
    }
    function onLogin(Request $request){
        $UserName=$request->UserName;
        $PassWord=$request->PassWord;

        $count=AdminLoginModel::where('username',$UserName)->where('password',$PassWord)->count();
        if($count==1)
        {
            $request->session()->put('userNameKey',$UserName);
            return "1";

        }
        else{
            return "0";

        }
    }
    function onLogout(Request $request){
        $request->session()->flash('userNameKey');
        return redirect('/LoginPage');
    }
}
