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
/*------------------------------------------------------------------------
 * set_cookie(name, value, days)
 * 
 * Set a cookie with the name and value passed as the first two arguments, 
 * set to expire in the number of days specified in the third argument.
 *------------------------------------------------------------------------*/

function set_cookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
    }
    else 
        expires = "";

    document.cookie = name + "=" + value + expires + "; path=/";
}


/*------------------------------------------------------------------------
 * get_cookie(name)
 * 
 * Returns the value of the cookie identified by the name argument.
 *------------------------------------------------------------------------*/

function get_cookie(name) {
    var namestr  = name + "=";
    var cookbits = document.cookie.split(';');
    var n;

    for(n = 0; n < cookbits.length; n++) {
        var c = cookbits[n];

        /* remove leading whitespace */
        while (c.charAt(0) == ' ') 
            c = c.substring(1, c.length);

        /* if the name start this cookie fragment, return the value */
        if (c.indexOf(namestr) == 0) 
            return c.substring(namestr.length, c.length);
    }
    return null;
}



/*------------------------------------------------------------------------
 * load_style()
 * 
 * Initialises the stylesheet based on any cookie currently set.
 *------------------------------------------------------------------------*/

function load_style() {
    var style;
    if (style = get_cookie("lpm_stylesheet"))
        set_style(style);
    if (style = get_cookie("lpm_page"))
        document.getElementById("page").className = style;
}


/*------------------------------------------------------------------------
 * save_style()
 * 
 * Saves the stylesheet name back to a cookie
 *------------------------------------------------------------------------*/

function save_style() { 
    var style;
    if (style = get_style())
        set_cookie("lpm_stylesheet", style, 365);
    set_cookie("lpm_page", document.getElementById("page").className, 365);
}


/*------------------------------------------------------------------------
 * get_style()
 * 
 * Returns the title of the current active stylesheet.
 *------------------------------------------------------------------------*/

function get_style() {
    var elems = document.getElementsByTagName("link");
    var n, elem, title;

    for (n = 0; (elem = elems[n]); n++) {
        if (elem.getAttribute("rel").indexOf("style") != -1 
        && (title = elem.getAttribute("title"))
        && ! elem.disabled)
            return title;
    }
    return null;
}


/*------------------------------------------------------------------------
 * set_style(title)
 * 
 * Set the active stylesheet by enabling the <link rel="style" ...> 
 * element that has a title attribute matching the title argument,
 * and disabling all others.
 *------------------------------------------------------------------------*/

function set_style(title) {
    var elems = document.getElementsByTagName("link");
    var n, elem, tattr;
//    alert("SET " + title);

    set_cookie("lpm_stylesheet", title, 365);

    for (n = 0; n < elems.length; n++) {
        elem = elems[n];

        if (elem.getAttribute("rel").indexOf("style") != -1 
        && (tattr = elem.getAttribute("title"))) {
            elem.disabled = true;
            if (tattr == title) {
                elem.disabled = false;
            }
        }
    }
    return false;
}


/* generate the colour switching palette */

function generate_palette() {
    var menu  = document.getElementById("palette");
    var elems = document.getElementsByTagName("link");
    var n, elem, title, text='';

    if (! menu)
        return;

    for (n = 0; (elem = elems[n]); n++) {
        if (elem.getAttribute("rel").indexOf("style") != -1 
        && (title = elem.getAttribute("title")))
            text = text 
                 + '<li><a class="' 
                 + title.toLowerCase()
                 + '" onclick="set_style(\''
                 + title 
                 + "')\"></a></li>\n";
    }
    menu.innerHTML = text;

    return null;
}


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

page_onload(load_style);
page_onunload(save_style);
page_onload(generate_palette);
page_onload(generate_layout_menu);

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
