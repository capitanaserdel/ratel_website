<header id="header" class="header d-flex align-items-center sticky-top">
    <div class="container position-relative d-flex align-items-center">

      <a href="/" class="logo d-flex align-items-center me-auto">
      <img src="/assets/img/rATEL-LOGO.png" alt="Ratel Logo"> 
      </a>
 
      <nav id="navmenu" class="navmenu"> 
        <ul>
          <li><a href="/" class="active">Home</a></li>
           <li class="dropdown"><a href="<?php echo $services ?>"><span>Our Services</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
            <ul>
              <li><a href="voice-service-details.php">Voice Services</a></li>
              <li><a href="ip-wholesale.php">IP Wholesale</a></li>
              <li><a href="backhaul-services.php">Backhaul Services</a></li>
              <li><a href="our-training-portfolio.php">Our Training Portfolio</a></li>
              
            </ul>
          </li>
              <li><a href="<?php echo $devices; ?>">Devices</a></li>
            <?php $need=0;if($need){?>
<li><a href="<?php echo $pricing; ?>">Calling Card</a></li><?php }?>
         
          
         <li class="dropdown"><a href="#"><span>About</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
            <ul>
              <li><a href="aboutus.php">About us</a></li>
              <li><a href="message-from-ceo.php">Message from CEO</a></li>
              <li><a href="board-structure.php">Board Structure</a></li>
              <li><a href="<?php echo $teams; ?>">Management Team</a></li>
              <li><a href="/privacy-policy/">Privacy Policy</a></li>
            </ul>
          </li>

          <li><a href="<?php echo $contact; ?>">Contact</a></li>
          <li><a href="<?php echo $devices; ?>">Download App</a></li>
           <a class="btn-getstarted" href="/airtime.php">Buy Airtime</a>
           <a class="btn-getstarted" href="/reg-options.php">Register Now</a>
         
 
        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>
 

    </div>

  </header>
