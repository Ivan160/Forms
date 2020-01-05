import serialize from './serialize';
var sendForm = function (url) {
   var forms = document.querySelectorAll('form');
   for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', function (event) {
         event.preventDefault();
         var target = event.target;
         target.querySelector('[type="submit"]').setAttribute('disabled', 'true');

         if (!document.querySelector('#sendForm')) {
            var style = document.createElement('style');
            style.id = 'sendForm';
            style.textContent = `
            .messageLoad {position: relative; padding: .75rem 1.25rem; margin: 1rem 0; border: 1px solid transparent; border-radius: .25rem; color: #007bff; background-color: #C9E0F9; border-color: #90BAE7;}
            .messageSuccess {position: relative; padding: .75rem 1.25rem; margin: 1rem 0; border: 1px solid transparent; border-radius: .25rem; color: #155724; background-color: #d4edda; border-color: #c3e6cb;}
            .messageError {position: relative; padding: .75rem 1.25rem; margin: 1rem 0; border: 1px solid transparent; border-radius: .25rem; color: #721c24; background-color: #f8d7da; border-color: #f5c6cb;}
            `;
            document.head.appendChild(style);
         }

         var messageStatus = document.createElement('div');
         messageStatus.className = 'messageLoad';
         messageStatus.innerText = 'Отправка...';
         target.appendChild(messageStatus);

         var data = serialize(target);

         var request = new XMLHttpRequest();
         request.open('POST', url, true);
         request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
         request.send(data);
         request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE && request.status !== 200) {
               messageStatus.innerText = 'Упс, что-то пошло не так...';
               messageStatus.className = 'messageError';
               setTimeout(function () {
                  messageStatus.style.display = 'none';
               }, 10000);
            }

            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
               messageStatus.innerText = 'Форма успешно отправлена!';
               messageStatus.className = 'messageSuccess';
               setTimeout(function () {
                  messageStatus.style.display = 'none';
               }, 10000);
            }
         };
         target.reset();
      });
   }
};
export default sendForm;
