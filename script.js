const words = ["Frontend Designer", "Canva Design & Editing", "Web Developer"];
let currentIndex = 0;
let charIndex = 0;
const textElement = document.querySelector('.text-animation span');

function typeWord() {
    const word = words[currentIndex];
    textElement.textContent = word.slice(0, charIndex);
    charIndex++;

    if (charIndex > word.length) {
        setTimeout(() => {
            charIndex = 0;
            currentIndex = (currentIndex + 1) % words.length;
            setTimeout(typeWord, 500);
        }, 2000); // Pause before switching words
    } else {
        setTimeout(typeWord, 200); // Typing speed
    }
}

document.addEventListener('DOMContentLoaded', typeWord);

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;  // Fixed the scroll position reference
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');  // Fixed typo from toogle to toggle
    navbar.classList.toggle('active');  // Fixed typo from toogle to toggle
};

const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");


function sendEmail(){
    const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Message: ${mess.value}`;
    Email.send({
        SecureToken : "1574f25a-f364-429c-b4c4-6d5d09a24929",
        To : 'manideepak2701@gmail.com',
        From : "manideepak2701@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
        // message => alert(message)
      message => {
        if (message == "OK"){
            Swal.fire({
                title: "Success",
                text: "Message sent Successfully!",
                icon: "success"
              });
        }
        else{
            alert(message)
        }
      }
    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");
    for(const item of items){
        if(item.value == ""){
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if(items[1].value != ""){
            checkEmail();
        }

        items[1].addEventListener("keyup", () => {
            checkEmail();
        });

        item.addEventListener("keyup", () => {
            if(item.value != ""){
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else{
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTxtEmail = document.querySelector(".error-txt.email")

    if(!email.value.match(emailRegex)){
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if(email.value != ""){
            errorTxtEmail.innerText = "Enter a valid email address";
        }
        else
        {
            errorTxtEmail.innerText = "Email Address can't be blank";
        }
    }
    else
    {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit", (sub) => {
    sub.preventDefault();
    checkInputs();

    if(!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !mess.classList.contains("error")){
        sendEmail();
    }

})