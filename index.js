const showImg = document.getElementById("showImg");
const title = document.querySelector(".title");
const priceAmount = document.querySelector(".priceAmount");
const shop = document.getElementById("shop");
const checkoutPage = document.getElementById("checkoutPage");
const checkoutItemsContainer = document.getElementById("checkoutItemContainer");
const itemCounter = document.getElementById("itemCounter");
const amountContainer = document.querySelector(".amountContainer");
const shippingAndPromo = document.querySelector(".shippingAndPromo");

checkoutPage.style.display = "none";
function goToCheckoutPage(){
    shop.style.display = "none";
    checkoutPage.style.display = "block";
}
function backToShop(){
    shop.style.display = "block";
    checkoutPage.style.display = "none";
}

function previewCardOnClick(img,titleText,priceText){
    showImg.src = img;
    title.innerText = titleText;
    priceAmount.innerText = priceText;
}

let checkoutPageList = {
    checkoutItemList: [
        // {
        //     name: "DM 9106",
        //     quantity: 1,
        //     priceForOne: 100,
        //     price: 100,
        //     img: "./images/black-watch.png",
        //     currency: "USD",
        //     stockLimit: 3,
        // },
        // {
        //     name: "DM 7405",
        //     quantity: 1,
        //     priceForOne: 110,
        //     price: 110,
        //     img: "./images/blue-watch.png",
        //     currency: "USD",
        //     stockLimit: 3,
        // },
        // {
        //     name: "DM 9421",
        //     quantity: 1,
        //     priceForOne: 120,
        //     price: 120,
        //     img: "./images/silver-watch.png",
        //     currency: "USD",
        //     stockLimit: 3,
        // },
    ],
    totalItems: 0,
    discountAmount: 0,
    deliFee: 0,
    subTotal: 0,
}

const promoList = [
    {
        code: "promo1",
        discountAmount: 70,
    },
    {
        code: "promo2",
        discountAmount: 80,
    },
    {
        code: "promo3",
        discountAmount: 90,
    },
];

const shippingList = [
    {
        type: "Express",
        price: 3,
        currency: "USD",
    },
    {
        type: "Ship",
        price: 6,
        currency: "USD",
    },
    {
        type: "Flight",
        price: 10,
        currency: "USD",
    },
    
];

{/* <span class="item-count">3</span> */}
{/* <ion-icon name="bag"></ion-icon> */}
function itemCounterRender(totalItems){
    while(itemCounter.firstChild){
        itemCounter.removeChild(itemCounter.firstChild);
    }
    const itemCountElement = document.createElement("span");
    itemCountElement.innerText = totalItems;
    itemCountElement.className = "item-count";
    const bagIcon = document.createElement("ion-icon");
    bagIcon.name = "bag";
    itemCounter.append(itemCountElement,bagIcon);
}


{/* <p class="subTotal">Subtotal : $<span>330</span></p> */}    

function subTotalRender(subtotal,discountAmount,deliFee){
    while(amountContainer.firstChild){
        amountContainer.removeChild(amountContainer.firstChild);
    }
    const subTotal = document.createElement("p");
    subTotal.innerText = "Subtotal : $";
    subTotal.className = "subTotal";
    const subTotalSpan = document.createElement("span");
    subTotalSpan.innerText = subtotal;
    subTotal.appendChild(subTotalSpan);

    const discount = document.createElement("p");
    discount.innerText = "Discount : $";
    discount.className = "discount";
    const discountSpan = document.createElement("span");
    discountSpan.innerText = discountAmount;
    discount.appendChild(discountSpan);

    const delivery = document.createElement("p");
    delivery.innerText = "Delivery : $";
    delivery.className = "deliFee";
    const deliverySpan = document.createElement("span");
    deliverySpan.innerText = deliFee;
    delivery.appendChild(deliverySpan);
    amountContainer.append(discount,delivery,subTotal);

    if(checkoutPageList.checkoutItemList.length == 0){
        subtotal = 0;
        subTotalSpan.innerText = subtotal;
        deliFee = 0;
        deliverySpan.innerText = deliFee;
        discountAmount = 0;
        discountSpan.innerText = discountAmount;
    }
}

function checkoutItemListRender(checkoutItemsContainer,checkoutItemList){
    cleanCheckoutItemList();
    for (let i = 0; i < checkoutItemList.length; i++){
        const checkout = checkoutItemList[i];
        const checkoutItem = checkoutItemRender(checkout,i);
        checkoutItemsContainer.appendChild(checkoutItem);
        // console.log(checkoutPageList);
    }
}

function cleanCheckoutItemList(){
    let checkoutItemsContainer = document.getElementById("checkoutItemContainer");
    while(checkoutItemsContainer.firstChild){
        checkoutItemsContainer.removeChild(checkoutItemsContainer.firstChild);
    }
}

{/* <div class="checkoutItem">
    <img src="./images/black-watch.png" alt="">
    <p class="titleInCheckout">DM 9106</p>
    <div class="quantity">
        <ion-icon class="minusBtn" name="remove-circle"></ion-icon>
        <p>1</p>
        <ion-icon class="plusBtn" name="add-circle"></ion-icon>
    </div>
    <p class="priceInCheckout">$<span>100</span></p>
    <ion-icon class="removeBtn" name="close"></ion-icon>
</div> */}

function checkoutItemRender(item,index){
    const checkoutItem = document.createElement("div");
    checkoutItem.className = "checkoutItem";
    const imgElement = document.createElement("img");
    imgElement.src = item.img;
    const titleInCheckout = document.createElement("p");
    titleInCheckout.className = "titleInCheckout";
    titleInCheckout.innerText = item.name;
    const quantityElement = document.createElement("div");
    quantityElement.className = "quantity";
    const minusBtn = document.createElement("ion-icon");
    minusBtn.className = "minusBtn";
    minusBtn.name = "remove-circle";
    minusBtn.id = "minus" + index;
    const quantity = document.createElement("p");
    quantity.innerText = item.quantity;
    const plusBtn = document.createElement("ion-icon");
    plusBtn.className = "plusBtn";
    plusBtn.name = "add-circle";
    plusBtn.id = "plus" + index;
    const priceInCheckout = document.createElement("p");
    priceInCheckout.innerText = "$";
    const spanElement = document.createElement("span");
    spanElement.innerText = item.price;
    const removeBtn = document.createElement("ion-icon");
    removeBtn.className = "removeBtn";
    removeBtn.name = "close";
    removeBtn.id = "remove" + index;

    quantityElement.append(minusBtn,quantity,plusBtn);
    priceInCheckout.append(spanElement);
    checkoutItem.append(imgElement,titleInCheckout,quantityElement,priceInCheckout,removeBtn);

    return checkoutItem;
}

{/* 
    <div class="promo">
        <input id="promoCode" type="text" placeholder="Please Enter Promo Code">
        <input class="applyBtn" type="button" value="Apply">
    </div>
    <select name="shipping" id="shipping">
        <option value="Express">Express : 3USD</option>
    </select>
*/}
function shippingAndPromoRender(){
    const promoContainer = document.createElement("div");
    promoContainer.className = "promo";
    const promoInput = document.createElement("input");
    promoInput.id = "promoCode";
    promoInput.type = "text";
    promoInput.placeholder = "Please Enter Promo Code";
    const applyBtn = document.createElement("input");
    applyBtn.className = "applyBtn";
    applyBtn.type = "button";
    applyBtn.value = "Apply";
    applyBtn.disabled = false;
    promoContainer.append(promoInput,applyBtn);
    applyBtn.addEventListener("click", function(){
        applyPromo();
    });
    
    const shippingSlider = document.createElement("select");
    shippingSlider.id = "shipping";
    shippingSlider.name = "shipping";
    shippingSlider.addEventListener("change", function(e){
        computeDeliFee(e);
    });

    for(let item of shippingList){
        const child = optionsRender(item);
        shippingSlider.appendChild(child);
    }

    shippingAndPromo.append(promoContainer,shippingSlider);
}

function optionsRender(item){
    const option = document.createElement("option");
    option.value = item.type;
    option.textContent = item.type + " : " + item.price + item.currency;
    return option;
}


function createCheckoutItem(){
    
    const checkoutItem = {
        name: title.innerText,
        quantity: 1,
        priceForOne: +priceAmount.innerText,
        price: +priceAmount.innerText,
        img: showImg.src,
        currency: "USD",
        stockLimit: 3,
    }

    checkoutPageList.checkoutItemList.push(checkoutItem);
    const index = checkoutPageList.checkoutItemList.map(checkoutItem => checkoutItem.name).indexOf(title.innerText);

    // console.log(checkoutPageList.checkoutItemList.map(checkoutItem => checkoutItem.name));
    // console.log(index);

    if(checkoutItem.name === checkoutPageList.checkoutItemList[index].name){
        if(index === checkoutPageList.checkoutItemList.length - 1){
            checkoutItemsContainer.appendChild(checkoutItemRender(checkoutItem,index));
            checkoutPageList.totalItems = checkoutPageList.totalItems + 1,
            itemCounterRender(checkoutPageList.totalItems);

            checkoutPageList.subTotal =  checkoutPageList.subTotal + checkoutItem.priceForOne;
            subTotalRender(checkoutPageList.subTotal,checkoutPageList.discountAmount,checkoutPageList.deliFee);
        }else{
            checkoutPageList.checkoutItemList.pop();
            increaseQuantity(checkoutPageList.checkoutItemList[index]);
        }
    }
    checkoutPageList.subTotal = checkoutPageList.subTotal - checkoutPageList.deliFee;
    checkoutPageList.deliFee = 3;
    checkoutPageList.subTotal = checkoutPageList.subTotal + checkoutPageList.deliFee;
    subTotalRender(checkoutPageList.subTotal,checkoutPageList.discountAmount,checkoutPageList.deliFee);
}

function increaseQuantity(item){
    if(item.quantity + 1 > item.stockLimit){
        alert("It is over stock");
    }else{
        item.quantity = item.quantity + 1;
        item.price = item.price + item.priceForOne;
        checkoutPageList.totalItems = checkoutPageList.totalItems + 1,
        checkoutPageList.subTotal =  checkoutPageList.subTotal + item.priceForOne;
        itemCounterRender(checkoutPageList.totalItems);
        subTotalRender(checkoutPageList.subTotal,checkoutPageList.discountAmount,checkoutPageList.deliFee);
        checkoutItemListRender(checkoutItemsContainer,checkoutPageList.checkoutItemList);
    }
}

function decreaseQuantity(item){
    if(item.quantity - 1 == 0){
        deleteFunction(item);
    }else{
        item.quantity = item.quantity - 1;
        item.price = item.price - item.priceForOne;
        checkoutPageList.totalItems = checkoutPageList.totalItems - 1, 
        checkoutPageList.subTotal =  checkoutPageList.subTotal - item.priceForOne;
        itemCounterRender(checkoutPageList.totalItems);
        subTotalRender(checkoutPageList.subTotal,checkoutPageList.discountAmount,checkoutPageList.deliFee);
        checkoutItemListRender(checkoutItemsContainer,checkoutPageList.checkoutItemList);
    }
}

function deleteFunction(item){
    const result = checkoutPageList.checkoutItemList.filter(obj => obj !== item);
    checkoutPageList.checkoutItemList = result;
    checkoutPageList.totalItems = checkoutPageList.totalItems - item.quantity;
    checkoutPageList.subTotal =  checkoutPageList.subTotal - (item.priceForOne * item.quantity);
    itemCounterRender(checkoutPageList.totalItems);
    subTotalRender(checkoutPageList.subTotal,checkoutPageList.discountAmount,checkoutPageList.deliFee);
    checkoutItemListRender(checkoutItemsContainer,checkoutPageList.checkoutItemList);
}

function computeDeliFee(event){
    checkoutPageList.subTotal = checkoutPageList.subTotal - checkoutPageList.deliFee;
    const value = event.target.value;
    const item = shippingList.filter((shipping) => shipping.type === value);
    checkoutPageList.deliFee = item[0].price;
    checkoutPageList.subTotal = checkoutPageList.subTotal + checkoutPageList.deliFee;
    subTotalRender(checkoutPageList.subTotal,checkoutPageList.discountAmount,checkoutPageList.deliFee);
}

function applyPromo(){
    console.log("haha");
    let promoInput = document.getElementById("promoCode");
    let applyBtn = document.querySelector(".applyBtn");
    const value = promoInput.value;
    const item = promoList.filter((promo) => promo.code === value);
    if(item.length > 0){
        checkoutPageList.discountAmount = item[0].discountAmount;
        checkoutPageList.subTotal = checkoutPageList.subTotal - checkoutPageList.discountAmount;
        subTotalRender(checkoutPageList.subTotal,checkoutPageList.discountAmount,checkoutPageList.deliFee);
        if(item[0].discountAmount !== 0){
            applyBtn.disabled = true;
        }
    }
}

document.addEventListener("click" , function(event){
    if(event.target.id.includes("plus")){
        const index = event.target.id.slice(4);
        increaseQuantity(checkoutPageList.checkoutItemList[index]);
    }
    if(event.target.id.includes("minus")){
        const index = event.target.id.slice(5);
        decreaseQuantity(checkoutPageList.checkoutItemList[index]);
    }
    if(event.target.id.includes("remove")){
        const index = event.target.id.slice(6);
        deleteFunction(checkoutPageList.checkoutItemList[index]);
    }
});

checkoutItemListRender(checkoutItemsContainer,checkoutPageList.checkoutItemList);
subTotalRender(checkoutPageList.subTotal,checkoutPageList.discountAmount,checkoutPageList.deliFee);
itemCounterRender(checkoutPageList.totalItems);
shippingAndPromoRender();