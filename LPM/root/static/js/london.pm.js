/*------------------------------------------------------------------------
 * functions to handle multiple handler for onload and onunload events.
 *------------------------------------------------------------------------*/

var onload_functions   = new Array();
var onunload_functions = new Array();

function page_onload(func) {
    onload_functions.push(func);
}

function page_onunload(func) {
    onunload_functions.push(func);
}

function page_load() {
    for(var i = 0; i < onload_functions.length; i++) {
        try { onload_functions[i](); }
        catch(err) { alert(err) }
    }
}

function page_unload() {
    for(var i = 0; i < onunload_functions.length; i++)
        onunload_functions[i]();
}

window.onload   = page_load;
window.onunload = page_unload;

/* add the 'Go Large' menu item */

function generate_layout_menu() {
    var menu  = document.getElementById("side_menu");

    if (! menu)
        return;

    menu.innerHTML = menu.innerHTML
        + '<li><a href="#" onclick="$(\'#page\').toggleClass(\'wide\'); return false">'
        + 'Go <span class="go_small">Small</span>'
        + '<span class="text">&nbsp;/&nbsp;</span>'
        + '<span class="go_large">Large</span></a>'
        + '</li>';
}


/* register load/unload handlers */

// page_onload(generate_layout_menu);

function checkTitle() {
    if (!window.location.hash) {
        return; 
    }
    var hash = window.location.hash;
    hash = hash.substr(1,hash.length);
    var elements = document.getElementsByName(hash);
    for (var i=0; i<elements.length; i++) {
        if (elements[i].tagName != 'A') {
            continue;
        }
    var children  = elements[i].firstChild;
        if (!children) {
            continue;
        }
        document.title = "London.pm: " + children.nodeValue;
        break;
    }
}


function swapElements(on, off) {
    var elements = getElementsByClass(on, document);
    for (var i=0; i<elements.length; i++) {
        // elements[i].style.visibility = 'visible';
        elements[i].style.display    = 'block';
    }

    elements = getElementsByClass(off, document);
    for (var i=0; i<elements.length; i++) {
        // elements[i].style.visibility = 'collapse';
        elements[i].style.display = 'none';
    }
}

function getElementsByClass(searchClass,node,tag) {
    var classElements = new Array();
    if ( node == null )
        node = document;
    if ( tag == null )
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
    for (i = 0, j = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}

page_onload(checkTitle);
