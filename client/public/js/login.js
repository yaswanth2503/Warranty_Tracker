
const submitBtn = document.getElementById('submit');
const empId = document.getElementById('empid').value;
const password = document.getElementById('password').value;

document.addEventListener("DOMContentLoaded", function () {
   if(empId.length>0 && password.length>0){
    empId.style.border = '1px solid linear-gradient(-90deg, #22bfb2, #37cab5, #47d3b7, #4dd6b8)';
    password.style.border = '1px solid linear-gradient(-90deg, #22bfb2, #37cab5, #47d3b7, #4dd6b8)';
   }
});