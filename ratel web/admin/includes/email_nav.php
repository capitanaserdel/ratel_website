<div id="mail-nav"> <?php if($num_rows['rnAllocated']=="Not Assign"){?>
                      <button type="button" class="btn btn-danger waves-effect btn-compose m-b-15" id="replyme">REPLY</button>
                    <?php }else{?>
                      <button type="button" class="btn btn-danger waves-effect btn-compose m-b-15" id="replyme" disabled><?php echo $num_rows['rnAllocated']; ?></button>
                    <?php }?>
                      <ul class="" id="mail-folders">
                        <li>
                          <a href="registration.php" title="Inbox">Inbox <span id="email_reg2"></span>
                          </a>
                        </li>
                        <li>
                          <form name="readv" id="readv" method="post" action="registration.php">
                            <input type="hidden" name="readv" value="1">
                          </form>
                          <a href="javascript:document.getElementById('readv').submit();" title="Read">Processed <span id="email_reg_read"></span></a>
                        </li>
                        <li>
                          <a href="javascript:document.getElementById('readR').submit();" title="Rejected">Rejected <span id="email_reg_reject"></a>
                        </li>

                        
                        </li>
                      </ul>
                      <h5 class="b-b p-10 text-strong" id="action">Actions</h5>
                      <ul class="" id="mail-labels">
                        <li id="process">
                          <a href="javascript:confirmP();">
                            <i class="material-icons col-blue">local_offer</i>Process</a>
                        </li>
                        <li id="reject">
                          <a href="javascript:confirmD();">
                            <i class="material-icons col-red" id="swal-6">local_offer</i>Reject</a>
                        </li>
                        <li id="reject">
                          <a href="javascript:var ref='<?php echo $num_rows['reference']; ?>';window.location='personal-subscribers-update.php?reference='+ref;">
                            <i class="material-icons col-cyan" id="swal-6">local_offer</i>Update Record</a>
                        </li>
                        
                         
                      </ul>
                      
                    </div>