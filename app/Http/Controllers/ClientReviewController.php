<?php

namespace App\Http\Controllers;

use App\Model\ClientReviewModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ClientReviewController extends Controller
{
    function ClientReviewList(){
        $result=ClientReviewModel::all();
        return $result;
    }
    function ClientReviewDelete(Request $request){
        $id=$request->input('id');

        $clientImage=ClientReviewModel::where('id','=',$id)->get(['client_img']);
        $clientImageName=explode('/', $clientImage[0]['client_img'])[4];
        Storage::delete('public/'.$clientImageName);

        $result=ClientReviewModel::where('id','=',$id)->delete();
        return $result;
    }
    function AddReview(Request $request){

        $clientName= $request->input('clientName');
        $clientDes= $request->input('clientDes');

        $clientImgPath= $request->file('clientImg')->store('public');
        $clientImgName= explode('/',$clientImgPath)[1];
        $clientImgUrl="http://".$_SERVER['HTTP_HOST']."/storage/".$clientImgName;

        $result=ClientReviewModel::insert([
            'client_title'=>$clientName,
            'client_des'=> $clientDes,
            'client_img'=>$clientImgUrl
        ]);
        return $result;

    }
}
