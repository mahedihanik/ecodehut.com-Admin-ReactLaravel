<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\ContactTableModel;
class ContactTableController extends Controller
{
    function ContactList(){
        $result=ContactTableModel::all();
        return $result;
    }
    function ContactDelete(Request $request){
        $id=$request->input('id');
        $result=ContactTableModel::where('id','=',$id)->delete();
        return $result;
    }
}
