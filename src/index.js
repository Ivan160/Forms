'use strict';
import validator from './modules/validator';
import masked from './modules/masked.js';
import sendForm from './modules/sendForm';

addEventListener('DOMContentLoaded', function () {
   var forms = document.querySelectorAll('form');
   for (var i = 0; i < forms.length; i++) {
      validator(forms[i]);
   }

   var phone = document.querySelectorAll('[name="phone"]');
   for (var i = 0; i < phone.length; i++) {
      masked(phone[i], "+7 (___) ___-__-__");
   }
   
   sendForm('./server.php');
});