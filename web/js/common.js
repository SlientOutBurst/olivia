//include this lib after loading jquery

$(document).bind("mobileinit", function(){
      $.mobile.defaultPageTransition = 'slidefade';
      $.mobile.defaultDialogTransition = 'pop';
      $.mobile.useFastClick = true;
      $.mobile.pageLoadErrorMessage("Please check your netconnection");
});

//add String.include protype for copatibility with older webkit versions
if (!String.prototype.includes) {
    String.prototype.includes = function() {
        'use strict';
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}



var themeColor; //sets the global themeColor for webview is accessible from all web
var NowPlayingTrackId;

// used to hide loader when ajaxerror occur
function hideLoading(){
    $.mobile.loading("hide");
    if(typeof(mainwindow)!== "undefined"){
        mainwindow.showAjaxError();
    }
}

$( document ).ajaxError(function( event, request, settings) {
    console.log(event,request,settings.url);
    hideLoading();
});

function changeBg(rgba){ // sets bg color var in mainwindow and changes bg color of webview
    themeColor = rgba;
    var arr = rgba.split(",");
    var r = arr[0];
    var g = arr[1];
    var b = arr[2];
    var a = arr[3];

    var scroll = "<style type='text/css'>::-webkit-scrollbar-track{background-color:rgba("+rgba+") !important;}</style>";
    $(scroll).appendTo('head');

    $("::-webkit-scrollbar-track").css("cssText","background-color:rgba("+rgba+") !important;");
    $("body").css("cssText","background-color:rgba("+rgba+") !important;");
    $(".ui-listview>.ui-li-divider").css("cssText","background-color:rgba("+rgba+") !important;");
    mainwindow.setThemeColor(themeColor);
}

function setNowPlaying(songId){ //nowPlaying styles are in main.css
    console.log(songId);
    if(typeof(songId) !== "undefined"){
        if(songId.length>0 && songId!=="0000000" && $.mobile.activePage.find("#"+songId).length > 0){
            //removes all now playing
            $(".nowPlaying").remove();
            $.mobile.activePage.remove(".nowPlaying");

            var songIdStr = "#"+songId;

            var maxWidth,width;
            if($.mobile.activePage.find(songIdStr).css("max-width") !== "undefined"){
                maxWidth = $.mobile.activePage.find(songIdStr).css("max-width");
                if($.mobile.activePage.find(songIdStr).width()!=="undefined" || $.mobile.activePage.find(songIdStr)){
                         width = $.mobile.activePage.find(songIdStr).width().toString();
                }
            }else{
                maxWidth = "100px";
                width = "100";
            }
            //adds nowPlaying pages
            $.mobile.activePage.find(songIdStr).css("cssText",'position: absolute;left: 0px;top: 0px; max-width:'+maxWidth);// removed width:'+width.toString()+'px;
            $.mobile.activePage.find(songIdStr).each(function( index ) {
              $( this ).before("<div style='max-width:"+width+"px; width:"+width+"px;' class='nowPlaying'></div>");
            });


            //for album [adds nowPlaying active page]
            $.mobile.activePage.find(songIdStr).css("cssText",'position: absolute;left: 0px;top: 0px;max-width:'+width+'px; width:'+width+'px;');
            $.mobile.activePage.find(songIdStr).before("<div style='max-width:"+width+"px; width:"+width+"px;' class='nowPlaying'></div>");
        }else{
            console.log("here");
            $(".nowPlaying").remove();
            $.mobile.activePage.remove(".nowPlaying");
        }
    }
}


var countries = {
    "Albania":"al",
    "Algeria":"dz",
    "Angola":"ao",
    "Anguilla":"ai",
    "Antigua and Barbuda":"ag",
    "Argentina":"ar",
    "Armenia":"am",
    "Australia":"au",
    "Austria":"at",
    "Azerbaijan":"az",
    "Bahamas":"bs",
    "Bahrain":"bh",
    "Barbados":"bb",
    "Belarus":"by",
    "Belgium":"be",
    "Belize":"bz",
    "Benin":"bj",
    "Bermuda":"bm",
    "Bhutan":"bt",
    "Bolivia":"bo",
    "Botswana":"bw",
    "Brazil":"br",
    "British Virgin Islands":"vg",
    "Brunei Darussalam":"bn",
    "Bulgaria":"bg",
    "Burkina Faso":"bf",
    "Cambodia":"kh",
    "Canada":"ca",
    "Cape Verde":"cv",
    "Cayman Islands":"ky",
    "Chad":"td",
    "Chile":"cl",
    "China":"cn",
    "Colombia":"co",
    "Congo, Republic of the":"cg",
    "Costa Rica":"cr",
    "Croatia":"hr",
    "Cyprus":"cy",
    "Czech Republic":"cz",
    "Denmark":"dk",
    "Dominica":"dm",
    "Dominican Republic":"do",
    "Ecuador":"ec",
    "Egypt":"eg",
    "El Salvador":"sv",
    "Estonia":"ee",
    "Fiji":"fj",
    "Finland":"fi",
    "France":"fr",
    "Gambia":"gm",
    "Germany":"de",
    "Ghana":"gh",
    "Greece":"gr",
    "Grenada":"gd",
    "Guatemala":"gt",
    "Guinea-Bissau":"gw",
    "Guyana":"gy",
    "Honduras":"hn",
    "Hong Kong":"hk",
    "Hungary":"hu",
    "Iceland":"is",
    "India":"in",
    "Indonesia":"id",
    "Ireland":"ie",
    "Israel":"il",
    "Italy":"it",
    "Jamaica":"jm",
    "Japan":"jp",
    "Jordan":"jo",
    "Kazakhstan":"kz",
    "Kenya":"ke",
    "Korea, Republic Of":"kr",
    "Kuwait":"kw",
    "Kyrgyzstan":"kg",
    "Lao, People's Democratic Republic":"la",
    "Latvia":"lv",
    "Lebanon":"lb",
    "Liberia":"lr",
    "Lithuania":"lt",
    "Luxembourg":"lu",
    "Macau":"mo",
    "Macedonia":"mk",
    "Madagascar":"mg",
    "Malawi":"mw",
    "Malaysia":"my",
    "Mali":"ml",
    "Malta":"mt",
    "Mauritania":"mr",
    "Mauritius":"mu",
    "Mexico":"mx",
    "Micronesia, Federated States of":"fm",
    "Moldova":"md",
    "Mongolia":"mn",
    "Montserrat":"ms",
    "Mozambique":"mz",
    "Namibia":"na",
    "Nepal":"np",
    "Netherlands":"nl",
    "New Zealand":"nz",
    "Nicaragua":"ni",
    "Niger":"ne",
    "Nigeria":"ng",
    "Norway":"no",
    "Oman":"om",
    "Pakistan":"pk",
    "Palau":"pw",
    "Panama":"pa",
    "Papua New Guinea":"pg",
    "Paraguay":"py",
    "Peru":"pe",
    "Philippines":"ph",
    "Poland":"pl",
    "Portugal":"pt",
    "Qatar":"qa",
    "Romania":"ro",
    "Russia":"ru",
    "Saudi Arabia":"sa",
    "Senegal":"sn",
    "Seychelles":"sc",
    "Sierra Leone":"sl",
    "Singapore":"sg",
    "Slovakia":"sk",
    "Slovenia":"si",
    "Solomon Islands":"sb",
    "South Africa":"za",
    "Spain":"es",
    "Sri Lanka":"lk",
    "St. Kitts and Nevis":"kn",
    "St. Lucia":"lc",
    "St. Vincent and The Grenadines":"vc",
    "Suriname":"sr",
    "Swaziland":"sz",
    "Sweden":"se",
    "Switzerland":"ch",
    "São Tomé and Príncipe":"st",
    "Taiwan":"tw",
    "Tajikistan":"tj",
    "Tanzania":"tz",
    "Thailand":"th",
    "Trinidad and Tobago":"tt",
    "Tunisia":"tn",
    "Turkey":"tr",
    "Turkmenistan":"tm",
    "Turks and Caicos":"tc",
    "Uganda":"ug",
    "Ukraine":"ua",
    "United Arab Emirates":"ae",
    "United Kingdom":"gb",
    "United States":"us",
    "Uruguay":"uy",
    "Uzbekistan":"uz",
    "Venezuela":"ve",
    "Vietnam":"vn",
    "Yemen":"ye",
    "Zimbabwe":"zw"
}

var recomm_url = "https://api.magicplaylist.co/mp/search";
var recomm_url_pl_create = "https://api.magicplaylist.co/mp/create/";
var recomm_url_search = "https://api.magicplaylist.co/mp/search?";

$.getScript("qrc:///web/js/color-thief.min.js", function() {
   alert("Script loaded but not necessarily executed.");
});

//helper function to return donminantColor and base64 of given image Url used by similar tracks list
function getBase64andDominantColor(coverUrl){
    var colorThief = new ColorThief();
    var base64, dominantColor;
    //init colorThief lib
    if(typeof(colorThief) === "undefined"){
        colorThief = new ColorThief(); // colorThief object init
    }
    toDataUrl(coverUrl, function(myBase64) {
        base64 = myBase64;
        //check if #coverImage element is present in page, create one if not present
        if(document.querySelector("#coverImage2") === null){
            $('body').append("<img style='display:none;' src='' id='coverImage2' />");
        }
        document.querySelector("#coverImage2").setAttribute("src",coverUrl);
        var img = document.querySelector("#coverImage2");
        if (!img.complete) {
            img.addEventListener('load', function handler(e) {
                e.currentTarget.removeEventListener(e.type, handler);
                dominantColor = colorThief.getColor(img);
                mainwindow.addToSimilarTracksQueue(dominantColor+"!=-=!"+base64);
            });
        }
    });
}

//send base64 url of covers
function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}
