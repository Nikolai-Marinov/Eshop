$(document).ready(function(){

let user = JSON.parse(localStorage.getItem("user"));

if (user) {

    $("#loginBtn").hide();
    $("#logoutBtn").show();

    if (sessionStorage.getItem("showWelcome") === "true") {

        $("#welcomeUser").text(user.username);

        let toast = new bootstrap.Toast(
            document.getElementById("welcomeToast"),
            {
                delay: 3000
            }
        );

        toast.show();

        sessionStorage.removeItem("showWelcome");
    }

} else {

    $("#loginBtn").show();
    $("#logoutBtn").hide();

}

loadProducts();



function loadProducts(){


$.ajax({

url:"https://fakestoreapi.com/products",
method:"GET",

success:function(products){


let html="";


products.forEach(product=>{


html += `

<div class="col-md-4">

<div class="card shadow">


<img src="${product.image}" 
class="card-img-top p-3">


<div class="card-body">


<h5 class="card-title">
${product.title}
</h5>


<p>
${product.description.substring(0,100)}...
</p>


<p class="price">
$${product.price}
</p>


<button 
class="btn btn-success addCart"
data-id="${product.id}"
data-title="${product.title}"
data-price="${product.price}"
data-image="${product.image}">

Add to cart

</button>


</div>

</div>

</div>


`;

});


$("#products").html(html);


}


});


}




$(document).on("click",".addCart",function(){



let product={

id:$(this).data("id"),
title:$(this).data("title"),
price:$(this).data("price"),
image:$(this).data("image"),
quantity:1

};


let user = JSON.parse(localStorage.getItem("user"));

if (!user) {

    let loginToast = new bootstrap.Toast(
        document.getElementById("loginToast"),
        {
            delay:3000
        }
    );

    loginToast.show();

    setTimeout(function(){

        window.location = "loginPage.html";

    },3000);

    return;
}

let cartKey = "cart_" + user.username;

let cart = JSON.parse(localStorage.getItem(cartKey)) || [];


let existing=cart.find(x=>x.id==product.id);



if(existing){

existing.quantity++;

}
else{

cart.push(product);

}


localStorage.setItem(cartKey, JSON.stringify(cart));


$("#cartMessage").text(product.title + " added to cart!");

let cartToast = new bootstrap.Toast(
    document.getElementById("cartToast"),
    {
        delay:2000
    }
);

cartToast.show();


});



$("#logoutBtn").click(function () {

    let toastElement = document.getElementById("logoutToast");
    let toast = new bootstrap.Toast(toastElement, {
        delay: 2000
    });

    toast.show();

    setTimeout(function () {

        localStorage.removeItem("user");

        $("#logoutBtn").hide();
        $("#loginBtn").show();

    }, 2000);

});

});