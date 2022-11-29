var siteName = document.querySelector('#siteName');
var siteUrl = document.querySelector('#siteUrl');
var inputs = document.querySelectorAll('input');
var tableRaw = document.querySelector('#tableRaw');

var button = document.querySelector('.btn');
button.addEventListener('click', add);

var siteList = [];
if (localStorage.getItem('site') != null) {
    siteList = JSON.parse(localStorage.getItem('site'));
    display();
}

function add() {
        if(validateName() && validateUrl()){
        var site = {
            name: siteName.value,
            url: siteUrl.value
        }
        console.log(site);
        siteList.push(site);
        localStorage.setItem('site', JSON.stringify(siteList));
        display();
        clear();
    }
}


function display() {
    var box = '';
    for (var i = 0; i < siteList.length; i++) {
        box += `
        <div class="row">
				 <h2>${siteList[i].name}</h2>
				<a href="${siteList[i].url} " + \" target=\"_blank\" class="btn btn-primary">Visit</a>
				<button class="btn btn-danger" onclick="deleteName(${i})">Delete</button>
			</div>
        `
    }
    tableRaw.innerHTML = box;
}

function clear() {
    siteName.value = '';
    siteUrl.value = '';
}

function deleteName(index) {
    siteList.splice(index, 1);
    localStorage.setItem('site', JSON.stringify(siteList));
    display();
}
       
function validateName() {
    var regexName= /^[a-zA-Z]{1,10}$/;
    // for(var i=0;i<siteList.length;i++){
    //  if(siteList[i].name.includes(siteName)){
    //     siteName.nextElementSibling.style.display='block';
    //     siteName.nextElementSibling.innerHTML='this name already exist';
    //     return false;
    // }}
     if(regexName.test(siteName.value)==true)
    {
        siteName.nextElementSibling.style.display='none';
        return true;
    }

    else
    {
        siteName.nextElementSibling.style.display='block';
        siteName.nextElementSibling.innerHTML='Name is required';
        return false;
    }
    

      
}

function validateUrl() {
    var regexUrl= /^(http|https)(:\/\/)(www\.)[a-zA-Z0-9]{4,10}(\.com)$/;
        if(regexUrl.test(siteUrl.value)==true)
        {
            siteUrl.nextElementSibling.style.display='none';
            return true;
        }
       else
        {
            siteUrl.nextElementSibling.style.display='block';
            siteUrl.nextElementSibling.innerHTML='Url is required';
            return false;
        }
    }


