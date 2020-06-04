const FName = document.getElementById('name');
const FMail = document.getElementById('email');
const FPhone = document.getElementById('phone');
const FDesc = document.getElementById('desc');
let p1 = document.querySelector(".valname");
let p2 = document.querySelector(".valmail");
let p3 = document.querySelector(".valphone");

let but = document.getElementById('sign-close');
but.addEventListener('click', Validation);

function Addd() {
db.collection("clients").add({
    first: FName.value,
    mail: FMail.value,
    phone: FPhone.value,
    desc: FDesc.value
})
.then(function(docRef) {
    console.log("Ok:", docRef.id);
    ToOk();
})
.catch(function(error){
    console.log("No", error);
    ToNo();
});
Clear();
}
/* -------------------Input Cleaner -------------------------- */
function Clear() {
    FName.value='';
    FMail.value='';
    FPhone.value='';
    FDesc.value='';
}
/* -------------------Ok message -------------------------- */
function ToOk() {
    let per = document.querySelector('.status');
    let txt = document.querySelector("#status");
    if (per.classList.contains('status_hide')) {
        per.classList.remove('status_hide') }
    if (txt.classList.contains('status_no')) {
        txt.classList.remove('status_no')
    }
    txt.classList.add('status_ok');
    txt.innerHTML = 'Data sent successfully';
}
/* -------------------Error mesage -------------------------- */
function ToNo() {
    let per = document.querySelector('.status');
    let txt = document.querySelector("#status");
    if (per.classList.contains('status_hide')) {
        per.classList.remove('status_hide') }
    if (txt.classList.contains('status_ok')) {
        txt.classList.remove('status_ok')
    }
    txt.classList.add('status_no');
    txt.innerHTML = 'Sending error';
}
/* -------------------1-------------------------- */
function appear1(){
    if (p1.classList.contains('status_hide')) {
        p1.classList.remove('status_hide') }
}
function hide1() {
    p1.classList.add('status_hide') 
}
/* -------------------2-------------------------- */
function appear2(){
    if (p2.classList.contains('status_hide')) {
        p2.classList.remove('status_hide') }
}
function hide2() {
    p2.classList.add('status_hide') 
}
/* -------------------3-------------------------- */
function appear3(){
    if (p3.classList.contains('status_hide')) {
        p3.classList.remove('status_hide') }
}
function hide3() {
    p3.classList.add('status_hide') 
}
/* -------------------Validation -------------------------- */
function Validation() {
    document.querySelector('.status').classList.add('status_hide');
    const ValName = /[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)?/;
    const ValMail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    const ValPhone = /^\+\d{1}\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
    let point = 1;
    if (!ValName.test(FName.value)) {
        appear1(); /* return false; */ point = 0;
    } else {hide1();}

    if (!ValMail.test(FMail.value)) {
        appear2(); /* return false; */ point = 0;
    } else {hide2();}

    if (!ValPhone.test(FPhone.value)) {
        appear3(); /* return false; */ point = 0;
    } else {hide3();}

    if (point == 0) {
        ToNo();
    } else {
        console.log('ok');
        Addd();
    }
}