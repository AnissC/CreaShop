<?php
if ( isAjax() ) {
    
    
    $responseSuccess = [ 
        'status' => true,
        'msg'   => '<i class="icon-star"></i> Thank you! This is a demo success message'
    ];
    $responseFailed = [ 
        'status' => false,
        'msg'   => '<i class="icon-star"></i> Error! Could not send mail'
    ];
    $responseError = [ 
        'status' => false,
        'msg'   => '<i class="icon-star"></i> Error! Maybe an invalid submission'
    ];

	
	//if atleast, these 2 info available, we can send a mail
	if ( isset($_POST) && !empty($_POST['name']) && !empty($_POST['email']) ) { //Checks if action value exists
	    $name 		= $_POST["name"];
	    $email 		= $_POST["email"];
	    $date 		= !empty( $_POST["date"] ) ? $_POST["date"] : null;
        $phone  	= !empty( $_POST["phone"] ) ? $_POST["phone"] : null;
	    $message 	= !empty( $_POST["message"] ) ? $_POST["message"] : null;

	    //prepare and send mail
		$to 	= "somebody@example.com";
		$subject= "Form submisson";
		$txt 	= $message;
		$headers= "From: {$email}" . "\r\n";

		$sent = mail($to,$subject,$txt,$headers);
		if($sent){
			return respond( $responseSuccess );
		}
        //else
        return respond( $responseFailed );
	    
	}
    return respond( $responseError );

} else{ //when not an ajax request
	die('Oops: direct access not allowed');
}

function respond($response){
    //convert data-to-be-sent to json
    $json = json_encode($response);
    //prepare json response header
    header('Content-type: application/json');
    // return json data
    return exit($json);
}

function isAjax(){
	return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}
