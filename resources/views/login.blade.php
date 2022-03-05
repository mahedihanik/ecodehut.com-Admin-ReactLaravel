<!DOCTYPE html>
<html lang="en">
<head>
    <title>Admin Login</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" type="image/png" href="{{asset('loginassets/images/icons/favicon.ico')}}"/>

    <link rel="stylesheet" type="text/css" href="{{asset('loginassets/vendor/bootstrap/css/bootstrap.min.css')}}">

    <link rel="stylesheet" type="text/css" href="{{asset('loginassets/fonts/font-awesome-4.7.0/css/font-awesome.min.css')}}">

    <link rel="stylesheet" type="text/css" href="{{asset('loginassets/vendor/animate/animate.css')}}">

    <link rel="stylesheet" type="text/css" href="{{asset('loginassets/vendor/css-hamburgers/hamburgers.min.css')}}">

    <link rel="stylesheet" type="text/css" href="{{asset('loginassets/vendor/select2/select2.min.css')}}">

    <link rel="stylesheet" type="text/css" href="{{asset('loginassets/css/util.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('loginassets/css/main.css')}}">

</head>
<body>

<div class="limiter">
    <div class="container-login100">
        <div class="wrap-login100">
            <div class="login100-pic js-tilt" data-tilt>
                <img src="{{asset('loginassets/images/img-01.png')}}" alt="IMG">
            </div>

            <form class="login100-form validate-form">
					<span class="login100-form-title">
						Admin Login
					</span>

                <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                    <input id="username" class="input100" type="text"  placeholder="Username">
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
                </div>

                <div class="wrap-input100 validate-input" data-validate = "Password is required">
                    <input id="password" class="input100" type="password"  placeholder="Password">
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
                </div>

                <div class="container-login100-form-btn">
                    <button onclick="AdminLogin()" class="login100-form-btn">
                        Login
                    </button>
                </div>

                <div class="text-center p-t-12">
						<span class="txt1">
							Forgot
						</span>
                    <a class="txt2" href="#">
                        Password?
                    </a>
                </div>
                <div class="text-center p-t-50">
                    <a class="txt2" href="#">
                        Demo Admin Login
                        <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                    </a>
                </div>

            </form>
        </div>
    </div>
</div>

<script type="text/javascript">
    function AdminLogin() {
        var UserName= document.getElementById('username').value;
        var PassWord= document.getElementById('password').value;
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function () {
            if (this.status==200 && this.readyState==4)
            {
                if(this.responseText=="1")
                {
                    window.location="/";
                }
                else
                {
                    alert("logging failed");
                }
            }
        }
        xhttp.open("GET","/onLogin/"+UserName+"/"+PassWord,true);
        xhttp.send();

    }

</script>
<script src="{{asset('loginassets/vendor/jquery/jquery-3.2.1.min.js')}}"></script>
<script src="{{asset('loginassets/vendor/tilt/tilt.jquery.min.js')}}"></script>
<script >
    $('.js-tilt').tilt({
        scale: 1.1
    })
</script>
</body>
</html>
