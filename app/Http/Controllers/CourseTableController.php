<?php

namespace App\Http\Controllers;

use App\Model\CourseTableModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CourseTableController extends Controller
{
    function CourseList(){
        $result=CourseTableModel::all();
        return $result;
    }
    function CourseDelete(Request $request){
        $id=$request->input('id');

        $courseImage=CourseTableModel::where('id','=',$id)->get(['small_img']);

        $courseImageName=explode('/', $courseImage[0]['small_img'])[4];

        Storage::delete('public/'.$courseImageName);

        $result=CourseTableModel::where('id','=',$id)->delete();
        return $result;
    }
    function AddCourse(Request $request){

        $shortTitleCourse= $request->input('shortTitleCourse');
        $longTitleCourse= $request->input('longTitleCourse');
        $shortDesCourse= $request->input('shortDesCourse');
        $longDesCourse= $request->input('longDesCourse');
        $totalLectures= $request->input('totalLectures');
        $totalStudents= $request->input('totalStudents');
        $skillYouGet= $request->input('skillYouGet');
        $videoLinkCourse= $request->input('videoLinkCourse');
        $previewLinkCourse= $request->input('previewLinkCourse');

        $courseImagePath= $request->file('courseImage')->store('public');
        $courseImageName= explode('/',$courseImagePath)[1];
        $courseImageUrl="http://".$_SERVER['HTTP_HOST']."/storage/".$courseImageName;

        $result=CourseTableModel::insert([
            'short_title'=>$shortTitleCourse,
            'long_title'=>$longTitleCourse,
            'short_des'=>$shortDesCourse,
            'small_img'=>$courseImageUrl,
            'long_des'=>$longDesCourse,
            'totai_lecture'=>$totalLectures,
            'total_student'=>$totalStudents,
            'skill_all'=>$skillYouGet,
            'video_url'=>$videoLinkCourse,
            'course_link'=>$previewLinkCourse,
        ]);
        return $result;

    }
}
