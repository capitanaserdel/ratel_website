 <div class="main-sidebar sidebar-style-2">

        <aside id="sidebar-wrapper">

          <div class="sidebar-brand">

            <a href="dashboard.php"> <img alt="image" src="assets/img/logo.png" class="header-logo" />

            </a>

          </div>

          <ul class="sidebar-menu">

            <li class="menu-header">Main</li>

            <li class="dropdown active">

              <a href="dashboard.php" class="nav-link"><i data-feather="monitor"></i><span>Dashboard</span></a>

            </li>

             

            <li class="dropdown">

              <a href="#" class="menu-toggle nav-link has-dropdown"><i data-feather="command"></i><span >Requests (<span id="email_reg"></span>)</span></a>

              <ul class="dropdown-menu">

                

                <li><a class="nav-link" href="registration.php">Registration</a></li>

                

              </ul>

            </li>

            <li class="dropdown">

              <a href="#" class="menu-toggle nav-link has-dropdown"><i data-feather="mail"></i><span>Email</span></a>

              <ul class="dropdown-menu">

                <li><a class="nav-link" href="https://ratelplus.net:2096/" target="_blanck">Roundcube</a></li>

                <form name="readv" id="readv" method="post" action="registration.php">

                            <input type="hidden" name="readv" value="1">

                          </form>

                          <form name="readR" id="readR" method="post" action="registration.php">

                            <input type="hidden" name="readR" value="2">

                          </form>

                <li><a class="nav-link" href="javascript:document.getElementById('readv').submit();">Processed</a></li>

                <li><a class="nav-link" href="javascript:document.getElementById('readR').submit();">Rejected</a></li>

                </ul>
                <li class="dropdown">

              <a href="add_balance.php" class="nav-link"><i class="fas fa-coins"></i><span>Balance Top-up</span></a>

            </li>
             <li class="dropdown">

              <a href="account_delete_view.php" class="nav-link"><i class="fas fa-user-times"></i><span title="Request for Account Delete">Delete account</span></a>

            </li>
            <li class="dropdown">

              <a href="#" class="menu-toggle nav-link has-dropdown"><i data-feather="clock"></i><span >Cronjob (<span id="cronj"></span>)</span></a>

              <ul class="dropdown-menu">

                

                <li><a class="nav-link" href="cronjob_record.php">Record</a></li>

                

              </ul>

            </li>

            </li>
            <li class="menu-header">Ratel Customers</li>

           <li class="dropdown">

              <a href="#" class="menu-toggle nav-link has-dropdown"><i data-feather="database"></i><span>Ratel Number</span></a>

              <ul class="dropdown-menu">

                 <li><a href="kyc.php">KYC</a></li>

              </ul>

            </li>
            <li class="dropdown" <?php allow_access(0,0,1,$usergroup); ?>>
              <a href="#" class="menu-toggle nav-link has-dropdown"><i
                  data-feather="user-check"></i><span>Register</span></a>
              <ul class="dropdown-menu">
                <li><a href="personal-subscribers.php">Personal Subscriber</a></li>
                <li><a href="personal-subscribers.php">Business Subscriber</a></li>
                 
              </ul>
            </li>

            <li class="menu-header">Payments</li>

            <li class="dropdown">
              <a href="incomplete_registration.php" class="nav-link"> <i data-feather="users"></i>
               <span>Incomplete Reg.</span>
              </a>

                

              <a href="#" class="menu-toggle nav-link has-dropdown"><i data-feather="copy"></i><span>Api payment</span></a>

              <ul class="dropdown-menu">

                <li><a class="nav-link" href="registration_payment.php">Registration</a></li>

                <li><a class="nav-link" href="airtime_payment.php">Airtime</a></li>

                <li><a class="nav-link" href="error_airtime.php">Error on Payment</a></li>

              </ul>

            </li>

            <li class="dropdown">

              <a href="#" class="menu-toggle nav-link has-dropdown"><i

                  data-feather="shopping-bag"></i><span>Advanced</span></a>

              <ul class="dropdown-menu">

                <li><a class="nav-link" href="balance.php">Customer Balance</a></li>
                <li><a class="nav-link" href="transaction_status_opay.php">Transaction Status Opay</a></li>
                <li><a class="nav-link" href="transaction_status_stack.php">Transcation Status Paystack</a></li>
                <li><a class="nav-link" href="query_trans.php"><span>Query Transactions
                <li><a class="nav-link" href="live_calls.php"><span>View Live Calls

                </span> <span id="livecall_count2" class="badge rounded-pill bg-success"></span></a></li>
  
                <li <?php allow_access(0,1,0,$usergroup); ?>><a class="nav-link" href="addnumberscsv.php">Add Ratel Numbers</a></li>
             <li <?php allow_access(0,1,0,$usergroup); ?>><a class="nav-link" href="https://ratelplus.net/synchronize_cus_data.php" target="_blanck">Synchronize main Switch</a></li>
              </ul>
              <li class="dropdown">

              <a href="general_report.php" class="nav-link"><i data-feather="file"></i><span>Report</span></a>

            </li>
 <li class="menu-header">Account</li>
 <a href="logout.php" class="dropdown-item has-icon text-danger"> <i class="fas fa-sign-out-alt"></i>
                Logout
              </a>
            </li>

              

           

          </ul>

        </aside>

      </div>

