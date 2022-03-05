<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\ClientReviewModel;
use App\Model\ContactTableModel;
use App\Model\CourseTableModel;
use App\Model\ProjectsTableModel;
use App\Model\ServiceTableModel;

class HomeEtcController extends Controller
{
    function CountSummary(){
        $review= ClientReviewModel::count();
        $contact=ContactTableModel::count();
        $course=CourseTableModel::count();
        $project=ProjectsTableModel::count();
        $service=ServiceTableModel::count();
        $totalCount=array('review'=>$review,'contact'=>$contact,'course'=>$course,'project'=>$project,'service'=>$service);
        return json_encode($totalCount);
    }
}
