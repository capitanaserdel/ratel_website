<nav class="navbar navbar-expand-lg main-navbar sticky">
        <div class="form-inline mr-auto">
          <ul class="navbar-nav mr-3">
            <li><a href="#" data-toggle="sidebar" class="nav-link nav-link-lg
									collapse-btn"> <i data-feather="align-justify"></i></a></li>
            <li><a href="#" class="nav-link nav-link-lg fullscreen-btn">
                <i data-feather="maximize"></i>
              </a></li>
            <li>
              <form class="form-inline mr-auto">
                <div class="search-element">
                  <input class="form-control" type="search" placeholder="Search" aria-label="Search" data-width="200">
                  <button class="btn" type="submit">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </li>
          </ul>
        </div>
        <div title="<?php echo $row_staff_rec['position']; ?>" style="cursor: pointer;"><?php echo "Hi "."{".$row_staff_rec['fullname']."}"; ?></div>
        <ul class="navbar-nav navbar-right">
          <li class="dropdown dropdown-list-toggle"><a href="#" data-toggle="dropdown"
              class="nav-link nav-link-lg message-toggle"><i data-feather="mail"></i>
              <span class="badge headerBadge1" id="email_reg3">
                </span> </a>
            <div class="dropdown-menu dropdown-list dropdown-menu-right pullDown">
              <div class="dropdown-header">
                Notification
                <div class="float-right">
                 Registration
                </div>
              </div>
             <span id="notifi"></span>
              <div class="dropdown-footer text-center">
                <a href="registration.php">View All <i class="fas fa-chevron-right"></i></a>
              </div>
            </div>
          </li>
          
          <li class="dropdown"><a href="#" data-toggle="dropdown"
              class="nav-link dropdown-toggle nav-link-lg nav-link-user"> <img alt="image" src="assets/img/users/<?php echo $row_staff_rec['profPic']; ?>"
                class="user-img-radious-style" title="<?php echo $row_staff_rec['position']; ?>"> <span class="d-sm-none d-lg-inline-block"></span></a>
            <div class="dropdown-menu dropdown-menu-right pullDown">
              <div class="dropdown-title"><?php echo $row_staff_rec['fullname']; ?><br><font style="color:darkgreen;">(<?php echo $row_staff_rec['position']; ?>)</font></div>
              
              <div class="dropdown-divider"></div>
              <a href="register_admin.php" class="dropdown-item has-icon" <?php allow_access(1,1,0,$usergroup); ?> i class="fas fa-user-alt"></i>
                Register
              </a>
              <a href="admin_users.php" class="dropdown-item has-icon" <?php allow_access(1,1,0,$usergroup); ?> i class="fas fa-user"></i>
                Users
              </a>
              <a href="logout.php" class="dropdown-item has-icon text-danger"> <i class="fas fa-sign-out-alt"></i>
                Logout
              </a>
            </div>

          </li>
        </ul>
      </nav>