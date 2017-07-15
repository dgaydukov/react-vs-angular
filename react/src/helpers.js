/**
 * Created by diman on 07.06.17.
 */


import config from 'site-config';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

export function populateAxios(axios) {
    axios.defaults.baseURL = config.baseURL;
    axios.defaults.timeout = 20000;
    axios.defaults.headers.common['X-PlatformId'] = config.platformId;

    var userId = cookies.get(config.cookieUserIdName),
        accessToken = cookies.get(config.cookieAuthTokenName);
    if(userId && accessToken){
        axios.defaults.headers.common["UserId"] = userId;
        axios.defaults.headers.common["PayQRApiAuthorization"] = accessToken;
    }
    else{
        delete axios.defaults.headers.common["UserId"];
        delete axios.defaults.headers.common["PayQRApiAuthorization"];
    }
}

export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


export function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}

export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function replaceSpecialChars(word) {
    var chars = {
        " ": "-",
        ".": "",
        "'": "",
        '"': "",
        "!": "",
        "№":"",
        "&": "i",
        "«":"",
        "»":""
    };
    return word.split('').map(function (char) {
        return chars[char] != undefined ? chars[char] : char;
    }).join("");
}

function convertToCyrillic(word) {
    var chars = {
        a: "а",
        b: "б",
        c: "с",
        d: "д",
        e: "е",
        f: "ф",
        g: "г",
        h: "х",
        i: "и",
        j: "ж",
        k: "к",
        l: "л",
        m: "м",
        n: "н",
        o: "о",
        p: "п",
        q: "к",
        r: "р",
        s: "с",
        t: "т",
        u: "у",
        v: "в",
        w: "в",
        x: "кс",
        y: "ай",
        z: "з",
    };
    return word.split('').map(function (char) {
        return chars[char] != undefined ? chars[char] : char;
    }).join("");
}
function convertToLatin(word) {
    var chars = {
        'а': 'a',
        'б': 'b',
        'в': 'v',
        'г': 'g',
        'д': 'd',
        'е': 'e',
        'ё': 'yo',
        'ж': 'zh',
        'з': 'z',
        'и': 'i',
        'й': 'j',
        'к': 'k',
        'л': 'l',
        'м': 'm',
        'н': 'n',
        'о': 'o',
        'п': 'p',
        'р': 'r',
        'с': 's',
        'т': 't',
        'у': 'u',
        'ф': 'f',
        'х': 'h',
        'ц': 'c',
        'ч': 'ch',
        'ш': 'sh',
        'щ': 'sh',
        'ъ': '',
        'ы': 'y',
        'ь': '',
        'э': 'e',
        'ю': 'yu',
        'я': 'ya'
    };
    return word.split('').map(function (char) {
        return chars[char] != undefined ? chars[char] : char;
    }).join("");
}


export function getSemanticLatinName(name) {
    return convertToLatin(replaceSpecialChars(name.trim().toLowerCase()));
}
export function getSemanticCyrillic(name) {
    return convertToCyrillic(replaceSpecialChars(name.trim().toLowerCase()));
}


export function formatIsoDate(date) {
    date = new Date(date);
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    var newDate = `${day}-${month}-${year} ${date.getHours()}:${date.getMinutes()}`;
    return newDate;
}

export function getSocialNetworkAuthUrl(network){
    return `https://payqr.ru/websdk/auth/${network}?url=${getPrevPath(window.location.href)}&platform_id=${config.platformId}`;
}

export function checkPassword(password) {
    /*
     1. Цифры
     2. Латинские символы
     3. Заглавные буквы
     4. 7 символов
     Пример надежного пароля:
     Mx440se
     */
    return /(?=^\S+$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-za-z0-9]{7,16}/.test(password)
}

export function getPrevPath(path) {
    path = path || window.location.pathname;
    return path.split("/").slice(0,-1).join("/");
}
export function getNextPath(path) {
    return `${window.location.pathname}/${path}`
}


export function loadYM() {
    (function (d, w, c) {
        (w[c] = w[c] || []).push(function() {
            try {
                w.yaCounter45039860 = new Ya.Metrika(
                    { id:45039860, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true }
                );
            } catch(e) { }
        });
        var n = d.getElementsByTagName("script")[0],
            s = d.createElement("script"),
            f = function ()
            { n.parentNode.insertBefore(s, n); }
            ;
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://mc.yandex.ru/metrika/watch.js";
        if (w.opera == "[object Opera]")
        { d.addEventListener("DOMContentLoaded", f, false); }
        else
        { f(); }
    })(document, window, "yandex_metrika_callbacks");
}