var serialize = function (form) {
	var q = [];
	for (var i = 0; i < form.elements.length; i++) {
		var elem = form.elements[i];
		if (!elem.name || elem.type === 'file' || elem.type === 'reset' || elem.type === 'submit' || elem.type === 'button') continue;
		if (elem.type === 'select-multiple') {

			for (var n = 0; n < elem.options.length; n++) {
				if (elem.options[n].selected) q.push(elem.name + "=" + encodeURIComponent(elem.options[n].value));
			}

		} else if ((elem.type !== 'checkbox' && elem.type !== 'radio') || elem.checked) {
			q.push(elem.name + "=" + encodeURIComponent(elem.value));
		}
	}
	return q.join("&");
};
export default serialize;
