<?php

namespace App\Http\Controllers;
use App\Model\ServiceTableModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceTableController extends Controller
{
    function ServiceList(){
        $result=ServiceTableModel::all();
        return $result;
    }
    function ServiceDelete(Request $request){
        $id=$request->input('id');

        $serviceImage=ServiceTableModel::where('id','=',$id)->get(['service_img']);
        $serviceImageName=explode('/', $serviceImage[0]['service_img'])[4];
        Storage::delete('public/'.$serviceImageName);

        $result=ServiceTableModel::where('id','=',$id)->delete();
        return $result;
    }

    function AddService(Request $request){

        $serviceName= $request->input('serviceName');
        $serviceDes= $request->input('serviceDes');

        $serviceImgPath= $request->file('serviceImg')->store('public');
        $serviceImgName= explode('/',$serviceImgPath)[1];
        $serviceImgUrl="http://".$_SERVER['HTTP_HOST']."/storage/".$serviceImgName;

        $result=ServiceTableModel::insert([
            'service_name'=>$serviceName,
            'service_des'=> $serviceDes,
            'service_img'=>$serviceImgUrl
        ]);
        return $result;
    }
}
