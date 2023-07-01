
let page = 1;
let page_count;
let images = 'images/';
let div_img = document.querySelector('.img');
let div_text = document.querySelector('.text');
let point = false;
(function(){
    let response = fetch('data.json');
    response.then((data) =>{
        if(data.ok){
            return data.text();
        }else{
            throw new Error('not filed')
        }
        
    })
    .then((data) =>{
        localStorage.setItem('data', data);
    })
    .catch((error) =>{
        console.error(error)
    })
})();

function addToGalery(){
    
    let data = JSON.parse(localStorage.getItem('data'));
    empty();
    page_count = data.length;
    let img = document.createElement('img');
    data.forEach((item, index) =>{
        console.log(index);
        if(page == index+1){
            console.log(item.img)
            img.setAttribute('src', images+item.img)
            div_text.append(item.text)
            div_img.append(img)
        }
    })
}
function empty(){
    div_img.textContent = '';
    div_text.textContent = '';
}

function func(flag, target = false){
    
    if(flag == 'start' && target.textContent == 'Start'){
        point = true;
        addToGalery();
        target.textContent = 'Off';
    }else if(flag == 'start' && target.textContent == 'Off'){
        div_img.textContent = '';
        div_text.textContent = '';
        target.textContent = 'Start'
        point = false;
    }else if(flag == 'back'){
        if(page - 1 == 0){
            page = 3
        }else{
            page--;
        }
        if(point !== false) addToGalery();
    }else if(flag == 'forward'){
        if(page + 1 > page_count){
            page = 1
        }else{
            page++;
        }
        if(point !== false) addToGalery();
    }
}