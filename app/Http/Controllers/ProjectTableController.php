<?php

namespace App\Http\Controllers;

use App\Model\ProjectsTableModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectTableController extends Controller
{
    function ProjectList(){
        $result=ProjectsTableModel::all();
        return $result;
    }
    function ProjectDelete(Request $request){

        $id=$request->input('id');

        $small_image=ProjectsTableModel::where('id','=',$id)->get(['small_image']);
        $big_image=ProjectsTableModel::where('id','=',$id)->get(['big_image']);

        $cardImageName=explode('/', $small_image[0]['small_image'])[4];
        $detailsImageName=explode('/',$big_image[0]['big_image'])[4];

        Storage::delete('public/'.$cardImageName);
        Storage::delete('public/'.$detailsImageName);


        $result=ProjectsTableModel::where('id','=',$id)->delete();
        return $result;
    }
    function AddProject(Request $request){

       $projectName= $request->input('projectName');
       $projectDes= $request->input('projectDes');
       $projectFeatures= $request->input('projectFeatures');
       $projectPreviewUrl= $request->input('projectPreviewUrl');

       $cardImgPath= $request->file('projectCardImg')->store('public');
       $cardImgName= explode('/',$cardImgPath)[1];
       $cardImgUrl="http://".$_SERVER['HTTP_HOST']."/storage/".$cardImgName;

       $detailsImgPath= $request->file('projectDetailImg')->store('public');
       $detailsImgName= explode('/',$detailsImgPath)[1];
       $detailsImgUrl="http://".$_SERVER['HTTP_HOST']."/storage/".$detailsImgName;

       $result=ProjectsTableModel::insert([
           'project_name'=>$projectName,
           'short_description'=>$projectDes,
           'project_features'=>$projectFeatures,
           'live_preview_url'=>$projectPreviewUrl,
           'small_image'=>$cardImgUrl,
           'big_image'=>$detailsImgUrl
       ]);
       return $result;

    }
}
