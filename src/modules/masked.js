var masked = function (input, pattern) {
   function mask(event) {
      var sample = pattern;
      var val = this.value.replace(/\D/g, "");
      var i = 0;
      sample = sample.replace(/[_\d]/g, function () {
         return val.charAt(i++) || "_";
      });
      this.value = sample;
      if (sample.lastIndexOf("_") <= 0 && event.data !== null) return;
      i = sample.lastIndexOf(val.substr(-1));
      if (i < sample.length && sample != this.defaultValue) i++;
      else i = sample.indexOf("_");
      if (this.setSelectionRange) this.setSelectionRange(i, i);
   }

   input.addEventListener("input", mask);
   input.addEventListener("focus", function () {
      if (this.value.length === 0) this.value = pattern;
   });
   input.addEventListener("blur", function () {
      if (this.value.lastIndexOf("_") > 0) this.value = "";
   });
};
export default masked;