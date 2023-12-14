<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .lai-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2.5rem;
            font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            line-height: 1.5rem;
            font-size: .9rem;
        }

        .lai-content {
            background: #fff;
            border-radius: 6px;
            padding: 2rem 3rem;
            max-width: 30rem;
            margin: auto;
            border: 1px solid #f6f6f7;
        }

        .lai-header {
            padding: 0 0 2rem 0;
        }

        .lai-header h2 {
            font-size: 1.3rem;
            font-weight: 600;
            margin: .5rem 0 0 0;
            line-height: 1.3;
        }

        .lai-body .lai-review-header .avatar-thumbnail img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 50%;
        }



        .text-center {
            text-align: center;
        }rgin: auto auto 2.5rem;
        }

        a {
            font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }

        p {
            margin: 0;
        }

        .photos img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 5px;
            margin-right: 5px;
            display: inline-block;
        }

        .lai-warning-banner .photos img {
            opacity: 0.5;
        }
        .w-100{
            width: 100%;
        }

        @media screen and (max-width: 768px) {
            .lai-wrapper, .lai-content {
                padding: .5rem
            }

            .lai-btn {
                width: 100%;
                display: block;
            }
        }
    </style>
</head>
<body>
<div class="lai-wrapper">
    <div class="lai-content">
        <div class="lai-header">
            <h2 class="text-center">Thank you for your request. Unfortunately, the integration request has been {{ $status }}.</h2>
        </div>
    </div>
</div>
</body>
</html>
