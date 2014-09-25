function showHide() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("mainNav")) return false;


    var section = document.getElementsByTagName("section");
    for (i = 0; i < section.length; i++) {
        section[i].style.display = "none";
    } //Hide all sections. Idea is if JS is not enabled at least sections will still show

    var nav = document.getElementById("mainNav");
    var links = nav.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var sectionId = links[i].getAttribute("href").split("#")[1];

        // console.log(sectionId);
        if (!document.getElementById(sectionId)) continue; //If DOM doesn't have the section you specified, continue the function. So the code doesn't break because you dont know your HTML.
        links[i].destination = sectionId;
        links[i].onclick = function() {
            showSection(this.destination);
            return false;
        }
    }

}

function showSection(id) {
    var sec = document.getElementsByTagName("section");
    for (var i = 0; i < sec.length; i++) {
        // if (sec[i].className.indexOf("section") == -1) continue;
        if (sec[i].getAttribute("id") != id) {
            sec[i].style.display = "none";
        } else {
            sec[i].style.display = "block";
        }
    }



//*********** Debugging Area *************************************************************
    // console.log(section);
    // console.log("The navigation is " + nav + " ." );
    // console.log("The links are " + links);

//*********** Debugging Area *************************************************************
}


showHide();

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function insertAfter(newElement,targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}

function addClass(element,value) {
  if (!element.className) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName+= " ";
    newClassName+= value;
    element.className = newClassName;
  }
}


function focusLabels() {
  if (!document.getElementsByTagName) return false;
  var labels = document.getElementsByTagName("label");
  for (var i=0; i<labels.length; i++) {
    if (!labels[i].getAttribute("for")) continue;
    labels[i].onclick = function() {
      var id = this.getAttribute("for");
      if (!document.getElementById(id)) return false;
      var element = document.getElementById(id);
      element.focus();
    }
  }
}

function resetFields(whichform) {
  
  for (var i=0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.type == "submit") continue;
    if (!element.defaultValue) continue;
    element.onfocus = function() {
    if (this.value == this.defaultValue) {
      this.value = "";
     }
    }
    element.onblur = function() {
      if (this.value == "") {
        this.value = this.defaultValue;
      }
    }
  }
}

function validateForm(whichform) {
  for (var i=0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.className.indexOf("required") != -1) {
      if (!isFilled(element)) {
        alert("Please fill in the "+element.name+" field.");
        return false;
      }
    }
    if (element.className.indexOf("email") != -1) {
      if (!isEmail(element)) {
        alert("The "+element.name+" field must be a valid email address.");
        return false;
      }
    }
    if (element.className.indexOf("phone") != -1) {
      if (!isPhone(element)) {
        alert("The "+element.name+" field must be a valid phone number.");
        return false;
      }
    }
  }
  return true;
}

function isPhone(field) {
  if (field.value.length < 7) {
    return false;
  } else {
    return true;
  }
}

function isFilled(field) {
  if (field.value.length < 1 || field.value == field.defaultValue) {
    return false;
  } else {
    return true;
  }
}

function isEmail(field) {
  if (field.value.indexOf("@") == -1 || field.value.indexOf(".") == -1) {
    return false;
  } else {
    return true;
  }
}

function prepareForms() {
  for (var i=0; i<document.forms.length; i++) {
    var thisform = document.forms[i];
    resetFields(thisform);
    thisform.onsubmit = function() {
      return validateForm(this);
    }
  }
}
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);
