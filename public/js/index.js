'use strict';

$('#answer-box').focus();

$('#AplicantForm').validator().on('submit', function (e) {
  // event.preventDefault();
  // debugger;
  if (! e.isDefaultPrevented()) {
    var btn = $(this).find('.submit');

    if( ! $(btn).hasClass('active') ){
        var hash = $(btn).data('popup');
        $(btn).addClass('active').text( $(btn).data('wait') );

        var parent = $(btn).parents('.form-container');
        $(btn).parents('form').find('input, select').attr('disabled','disabled');

        var form_data = document.applicantForm;

        var json_obj = {
          fullname: form_data.fullname.value,
          email: form_data.email.value,
          phoneNumber: form_data.phoneNumber.value,
          techStack: form_data.techStack.value,
          experience: form_data.experience.value
      }

      console.log(json_obj);
        $.post("/send-email", json_obj, function(data, status){
            $(parent).find('.hide-onSubmit').addClass('hide-this');
            status_msg(hash);
        });


    }
    return false;
  }
})

// Showing and hiding the status message
function status_msg(obj) {
  $(obj).fadeIn();
  $('html,body').animate({ scrollTop: $(obj).offset().top }, 300);

}
