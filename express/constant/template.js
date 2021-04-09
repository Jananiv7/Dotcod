template = {};
template.invitation = "<center>\
<h2>Wokforce Management</h2>\
    </center>\
    <hr>\
    <p>\
        <b>\
            Hi ${newEmployee.firstName} ${newEmployee.lastName},\
        </b>\
    </p>\
        <p>You are receiving this mail because you(or someone else) have requested.</p>\
        <p>Click the following button for create your password.</p>\
        <br>\
        <center>\
        <a href='http://localhost:4200/resetPassword/${newEmployee.resetToken}' style='font-size:16pt;background-color:#4CAF50;'>\
        <button style='cursor:pointer;font-size:16pt;background-color:#4CAF50;border:2px;height: 70%; width: 20%;color: white;text-align center;'>Activation Link\
            </button>\
        </center>\
        <p>This link will expire in 24 hours,so be sure to use it in right way</p>\
        <p>If you are having trouble clicking the button,copy and paste the URL below into your browser.</p>\
        <a href='http://localhost:4200/resetPassword/${newEmployee.resetToken}'>http://localhost:4200/resetPassword/ ${newEmployee.resetToken}</a> "


template.forgotPassword = "<center>\
<h2>Wokforce Management</h2>\
</center>\
<hr>\
<p>\
<b>\
    Hi ${fp.firstName} ${fp.lastName},\
</b>\
</p>\
<p>You are receiving this mail because you(or someone else) have requested that you have forgotten your password</p>\
<p>Click the following button for creating  your new password.</p>\
<br>\
<center>\
<a href='http://localhost:4200/forgotPassword/${fp.resetToken}' style='font-size:16pt;background-color:#4CAF50;'>\
<button style='font-size:16pt;background-color:#4CAF50;border:2px;height: 70%; width: 20%;color: white;text-align: center;'>Forgot Password\
    </button>\
</center>\
<p>This link will expire in 24 hours,so be sure to use it in right way</p>\
<p>If you are having trouble clicking the button,copy and paste the URL below into your browser.</p>\
<a href='http://localhost:4200/forgotPassword/${fp.resetToken}'>http://localhost:4200/forgotPassword/${fp.resetToken}</a> "


module.exports.template = this.template;