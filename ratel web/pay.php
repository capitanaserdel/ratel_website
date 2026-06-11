<?php
if(isset($_GET['number'])){
$number=$_GET['number'];
header('location:airtime.php?number='.$number);
}else{
header('location:airtime.php');
}
//header("location:airtime.php?number=$number");
// Trailing splash is mistakly added after .php extension from Android/IOS Application
if( ($_SERVER['REQUEST_URI'] != "/") and preg_match('{/$}',$_SERVER['REQUEST_URI']) ) {
    header ('Location: '.preg_replace('{/$}', '', $_SERVER['REQUEST_URI']));
    exit();
}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Online Airtime</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- MATERIAL DESIGN ICONIC FONT -->
    <link rel="stylesheet" href="ratelcss/fonts/material-design-iconic-font/css/material-design-iconic-font.min.css">
    
    <!-- STYLE CSS -->
    <link rel="stylesheet" href="ratelcss/css/style.css">


  </head>

  <body>

    <div class="wrapper">
      <div class="inner">
        <form action="payer.php" method="post">
          <h3><img src="https://ratelplus.net/wp-content/uploads/2022/07/rATEL-LOGO.png"  width="50%" style="cursor:pointer;" onclick="window.location='http://ratelplus.net/'"><br><span style="font-size: 18px;font-style: italic;
    font-weight: normal;
    margin: 20px auto 0;
    width: 80%;
    line-height: 1.3;">Online Airtime</span><hr></h3>
          <div class="form-group">
            <div class="form-wrapper">
              <label for="">First Name</label>
              <input type="text" class="form-control" name="fname" required>
            </div>
            <div class="form-wrapper">
              <label for="">Last Name</label>
              <input type="text" class="form-control" name="lname" required>
            </div>
          </div>
          <div class="form-wrapper">
            <label for="">Email</label>
            <input type="email" class="form-control" name="email" required>
          </div>
                                            
          <div class="form-group">
            <div class="form-wrapper">
              <label for="">Currency</label>
              <input type="text" class="form-control" placeholder="NGN" disabled>
            </div>
            <div class="form-wrapper">
              <label for="">Amount to charge</label>
              <input type="number" class="form-control" name="amount" required>
            </div>
          </div>
                                                 
          <div class="form-wrapper">
            <label for="">Ratel Number</label>
            <input type="text" minlength="9" class="form-control" name="ratelnumber" required autocomplete="off" value="<?= (empty($_GET['number']) || ! is_numeric($_GET['number'])) ? '' : $_GET['number'] ?>">
          </div>
          <div class="checkbox">
             
          </div>
          <center><table border="0">
              <tr>
             <td>
        <button name="opay" style="
        
  padding: 15px 25px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #44d7b6;
  text-transform: capitalize;
  border: none;
 " formtarget="_blank">Pay with Opay</button></td>
 <td><button name="paystack" style="text-transform: capitalize">Pay with Paystack</button></td>
              </tr>
              
          </table></center>
        </form>
       
      </div>
      
    </div>
    
  </body> 
</html>