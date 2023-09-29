let defaultInventory = "#my-items",
    warehouseInventory = "#warehouse",
    vehicleInventory = "#vehicle",
    itemsContainer          = $('.js-items-container'),
    warehouseItemsContainer = $('.js-warehouse-items-container'),
    $usedItemsBlock = $(".js-used-items"),
    $modalSplit = $('.js-modal-2'),
    singleWeightTemporary = 0.2; // <=== weightOfItems();

//  getSlotData()
let getSlotID = getSlotData('data-slot-id'),
    getOutfitType = getSlotData('data-item-type'),
    getItemID = getSlotData('data-id'),
    getDropBlockID = getSlotData('data-slot');


// JSON
var myItems = '[{"SlotID":25, "OutfitType":13, "ItemID":285434435,"ItemName":"Shoes","CustomName":"","Index":0,"Amount":1,"Attributes":null},{"SlotID":6, "OutfitType":8, "ItemID":28545132,"ItemName":"Vest","CustomName":"","Index":0,"Amount":2,"Attributes":null},{"SlotID":12, "OutfitType":1, "ItemID":285451,"ItemName":"Mask","CustomName":"","Index":0,"Amount":5,"Attributes":null},{"SlotID":1, "ItemID":285452,"ItemName":"Phone","CustomName":"iPhone XS","Index":1,"Amount":4,"Attributes":{"PhoneNumber":"1687630","PhoneNumberLength":8,"ContactList":null,"PhoneEnabled":true,"PhoneType":1,"FriendlyName":null,"PhoneCode":"","CustomName":"iPhone XS"}},{"SlotID":2, "ItemID":285457,"ItemName":"Flashlight","CustomName":"","Index":2,"Amount":1,"Attributes":null},{"SlotID": 3, "ItemID":1109511,"ItemName":"Pistol Ammo","CustomName":"","Index":3,"Amount":13,"Attributes":null},{ "SlotID": 4, "ItemID":1109511,"ItemName":"Pistol Ammo","CustomName":"","Index":3,"Amount":3,"Attributes":null}]';
var myItemsObj = [];
var myItemsPush = [];
var myItemsSplit = [];

Array.prototype.itemKey = function (id) {
    for (let i = 0; i < this.length; i++) {
        if (this[i].SlotID === id) {
            return i;
        }
    }
};

// showInventory
function showInventory(id){
    $('body').children(id).addClass('visible')
}

showInventory(defaultInventory); // show default-inventory
// showInventory(warehouseInventory); // show warehouse-inventory
// showInventory(vehicleInventory); // show warehouse-inventory

// dummyCall
function dummyCall() {
    createItemBlock();
    createWarehouseItemBlock();
    createCarsItemBlock(50);
    updatePlayerItems(myItems);
    filling(myItemsPush);
    dragAndDrop();
    dragAndDropWarehouse();
    dragAndDropVehicle();
    mdModal();
    dropDownList();
    changeWeightOfItems();
    changeWeightOfItemsWarehouse();
    hoverItems();
}
dummyCall();

// updatePlayerItems
function updatePlayerItems(items) {
    myItemsObj = JSON.parse(items);
    myItemsPush = [];
    myItemsObj.forEach(el => {
        myItemsPush.push(
            {
                SlotID: el.SlotID,
                OutfitType: el.OutfitType,
                id: el.ItemID,
                name: el.ItemName,
                img: 'img/pizza.svg',
                quantityValue: el.Amount,
                singleWeight: 0.2,
                interactionFirst: 'Съесть',
                interactionSecond: 'Выбросить'
            }
        )
    });
}

function pushToMyItemsObj(array) {
    myItemsObj.push(
        {
            SlotID: +array[0].SlotID,
            OutfitType: +array[0].OutfitType,
            ItemID: +array[0].id,
            ItemName: array[0].name,
            Amount: +array[0].quantityValue,
        }
    );
    myItems = JSON.stringify(myItemsObj);
    dummyCall()
}

// Dynamically generating item blocks
// data-slot = [1 - 25]
function createItemBlock() {
    itemsContainer.html('');
    for (let i = 1; i <= 25; i++){
        itemsContainer.append("<div data-slot=\"" + i +"\" class=\"item-block item-block" + i + " js-item-block\"></div>");
    }
}

// Dynamically generating items-warehouse blocks
// data-slot = [101 - 201]
function createWarehouseItemBlock() {
    warehouseItemsContainer.html('');
    for (let i = 101; i < 201; i++){
        warehouseItemsContainer.append("<div data-slot=\"" + i +"\" class=\"item-block item-block" + i + " js-item-block\"></div>");
    }
}

// Dynamically generating items-warehouse blocks
// data-slot = [201 - (201 + amountOfSlots)]
function createCarsItemBlock(amountOfSlots) {
    warehouseItemsContainer.html('');
    for (let i = 201; i < (201 + amountOfSlots); i++){
        warehouseItemsContainer.append("<div data-slot=\"" + i +"\" class=\"item-block item-block" + i + " js-item-block\"></div>");
    }
}

// filling items in slots
function filling(itemsVar) {
    for (let i = 0; i < itemsVar.length; i++) {
        gettingItemDataFromArray(itemsVar[i]);
    }
}

// filling items-data from array
function gettingItemDataFromArray(item) {
    let weight = item.singleWeight * item.quantityValue;
    let thisBlock = $('.js-item-block[data-slot=\'' + item.SlotID  + '\']');
    $(thisBlock)
        .html(
            "<div class=\"item js-item \" data-slot-id=\"" + item.SlotID + "\" data-item-type=\"" + item.OutfitType + "\" data-id=\"" + item.id + "\">" +
            "<img class=\"item-img\" src=\"" + item.img + "\" alt=\"\">" +
            "<p class=\"item-weight\"><span class=\"value\">" + weight.toFixed(1) + "</span> кг</p>" +
            "<div class=\"item-title\"><p class=\"name\">" + item.name + "</p>" +
            "<p class=\"quantity\">x<span class=\"quantity-value\">" + item.quantityValue + "</span></p>" +
            "</div>" +
            "<div class=\"interaction-menu\" style='display: none'>" +
            "<button class=\"interaction-item1\">" + item.interactionFirst + "</button>" +
            "<button class=\"interaction-item1 md-trigger\" data-modal=\"modal-1\">" + item.interactionSecond + "</button>" +
            "</div>" +
            "</div>"
        );
}

// getSlotData function-closure
function getSlotData(dataName){
    return function (uiDraggable) {
        return +(uiDraggable.attr(dataName));
    }
}

// get array-key with help value
function getItemArrayKey(arr, value) {
    for(var i =0; i < myItemsObj.length; i++){
        if (arr[i].SlotID === value) return i;
    }
}

// get array-key with help value
function getSlotArrayKey(arr, value) {
    for(var i =0; i < myItemsObj.length; i++){
        if (arr[i].SlotID === value) return i;
    }
}

function dragAndDrop() {
    let $draggableBlock = $("#my-items .js-item");
    let $droppableBlock = $( "#my-items .js-item-block" );
    let $droppableBlockQuick = $( "#quick-use .js-item-block" );
    let $droppableBlockUsed = $( ".used-items" );
    let $droppableBlockUsedItemBlock = $( ".used-items .js-item-block" );

    $draggableBlock.draggable({
        containment: "#my-items",
        cursor: 'move',
        revert: true,
        revertDuration: 0,
        start:function (){
            hoverOutWearSlots($(this));
        },
        helper: function(event) {
            if (event.originalEvent.ctrlKey) {
                return $(this).clone();
            }
            else {
                return $(this)
            }
        },
        drag: function () {
            $(".js-item-block").removeClass('hover');
            $(this).parent().addClass('z-index-max');
        },
        stop: function () {
            $droppableBlock.removeClass('hover-type');
            $droppableBlock.removeClass('z-index-max');
            $droppableBlockUsed.removeClass('z-index-max');
        }
    });

    $droppableBlock.droppable({
        // greedy: true,
        revert: true,
        revertDuration: 0,
        over: function (event, ui) {
            let uiDraggableSlotId = getSlotID(ui.draggable),
                uiDraggableItemId = getItemID(ui.draggable),
                uiDraggableSlotId2 = +ui.draggable.parent().attr('data-slot'),
                thisId = + $(this).attr('data-slot'),
                thisItemId = + $(this).find('.js-item').attr('data-id');

            $(this).addClass('hover');
            $droppableBlock.droppable('enable');

            if((uiDraggableItemId === thisItemId) && (uiDraggableSlotId === thisId) ){
                $(this).droppable('disable');
            }
            else if((uiDraggableItemId === thisItemId) && (uiDraggableSlotId2 > 25)) {
                $(this).droppable('disable');
            }
            else if(uiDraggableItemId === thisItemId){
                $(this).droppable('enable');
            }
            else if ($(this).has('.js-item').length) {
                $(this).droppable('disable');
            }
        },
        drop: function (event, ui) {
            let uiDraggableSlotId = getSlotID(ui.draggable),
                uiDraggableItemId = getItemID(ui.draggable),
                thisId = + $(this).attr('data-slot'),
                thisItemId = + $(this).find('.js-item').attr('data-id');

            if( (uiDraggableItemId === thisItemId) && (uiDraggableSlotId !== thisId) ){
                stackItems(ui.draggable,$(this));
            }
            else if (event.originalEvent.ctrlKey && (+ui.draggable.find('.quantity-value').html() !== 1)) {
                modalInteractionSplit(getSlotID(ui.draggable),getItemID(ui.draggable),getDropBlockID($(this)));
            }
            else {
                $(this).append(ui.draggable);
                updateID(ui.draggable,getSlotID(ui.draggable),getItemID(ui.draggable),getDropBlockID($(this)));
            }

        }
    });

    $droppableBlockUsed.droppable({
        drop:function( event, ui ){
            $('.js-item-block').removeClass('hover');
            dropToOutfit($(this),ui.draggable);
            $(this).children(".js-item-block[data-outfit-type='" + getOutfitType(ui.draggable) + "']").addClass('not-empty')

        }
    });

    $droppableBlockUsedItemBlock.droppable({
        over: function( event, ui ){
            var uiDraggableSlotId = getSlotID(ui.draggable);

            if ($(this).has('.js-item').length) {
                $(this).droppable('disable');
            }
            if (uiDraggableSlotId >= 30 && uiDraggableSlotId <= 42){
                $('.used-items').addClass('z-index-max');
            }
            $(this).removeClass('not-empty')

        },
        drop: function ( event, ui ) {
            var outfitSlotType = + $(this).attr('data-outfit-type');
            if(getOutfitType(ui.draggable) === outfitSlotType){
                $(this).addClass('not-empty')
            }
        }
    });

    $droppableBlockQuick.droppable({
        drop:function( event, ui ){
            $(this).append(ui.draggable);
            updateID(ui.draggable,getSlotID(ui.draggable),getItemID(ui.draggable),getDropBlockID($(this)));
        }
    });

}

function dragAndDropWarehouse() {
    let $draggableBlock = $("#warehouse .js-item");
    let $droppableBlock = $( "#warehouse .js-item-block" );

    $draggableBlock.draggable({
        containment: "#warehouse",
        cursor: 'move',
        revert: true,
        revertDuration: 0,
        start: function () {
            $(this).removeClass('hover');
        },
        drag: function () {
            $(this).removeClass('hover');
        },
        stop: function () {
            $('.js-warehouse-items-container').removeClass('z-index-max');
            $('.js-item-block').removeClass('hover');
        }
    });

    $droppableBlock.droppable({
        revert: true,
        revertDuration: 0,
        over: function (event, ui) {
            let uiDraggableSlotId = getSlotID(ui.draggable),
                uiDraggableItemId = getItemID(ui.draggable),
                thisId = +$(this).attr('data-slot'),
                thisItemId = +$(this).find('.js-item').attr('data-id');

            $(this).addClass('hover');
            $droppableBlock.droppable('enable');

            if ((uiDraggableItemId === thisItemId) && (uiDraggableSlotId === thisId)) {
                $(this).droppable('disable');
            }
            else if (uiDraggableItemId === thisItemId) {
                $(this).droppable('enable');
            }
            else if ($(this).has('.js-item').length) {
                $(this).droppable('disable');
            }

            if (uiDraggableSlotId > 100){
                $('.js-warehouse-items-container').addClass('z-index-max');
            }
        },
        out: function () {
            $(this).removeClass('hover');
        },
        drop: function (event, ui) {
            let uiDraggableSlotId = getSlotID(ui.draggable),
                uiDraggableItemId = getItemID(ui.draggable),
                thisId = + $(this).attr('data-slot'),
                thisItemId = + $(this).find('.js-item').attr('data-id');

            if( (uiDraggableItemId === thisItemId) && (uiDraggableSlotId !== thisId) ){
                stackItems(ui.draggable,$(this));
            }
            else if (event.originalEvent.ctrlKey && (+ui.draggable.find('.quantity-value').html() !== 1)) {
                modalInteractionSplit(getSlotID(ui.draggable),getItemID(ui.draggable),getDropBlockID($(this)));
            }
            else {
                $(this).append(ui.draggable);
                updateID(ui.draggable,getSlotID(ui.draggable),getItemID(ui.draggable),getDropBlockID($(this)));
            }
        }
    });
}

function dragAndDropVehicle() {
    let $draggableBlock = $("#vehicle .js-item"),
        $droppableBlock = $( "#vehicle .js-item-block" );

    $draggableBlock.draggable({
        containment: "#vehicle",
        cursor: 'move',
        revert: true,
        revertDuration: 0,
        start: function () {
            $(this).removeClass('hover');
        },
        drag: function () {
            $(this).removeClass('hover');
        },
        stop: function () {
            $('.js-warehouse-items-container').removeClass('z-index-max');
            $('.js-item-block').removeClass('hover');
        }
    });

    $droppableBlock.droppable({
        revert: true,
        revertDuration: 0,
        over: function (event, ui) {
            var uiDraggableSlotId = getSlotID(ui.draggable);
            var uiDraggableItemId = getItemID(ui.draggable);
            var thisId = +$(this).attr('data-slot');
            var thisItemId = +$(this).find('.js-item').attr('data-id');
            $(this).addClass('hover');
            $droppableBlock.droppable('enable');

            if ((uiDraggableItemId === thisItemId) && (uiDraggableSlotId === thisId)) {
                $(this).droppable('disable');
            }
            else if (uiDraggableItemId === thisItemId) {
                $(this).droppable('enable');
            }
            else if ($(this).has('.js-item').length) {
                $(this).droppable('disable');
            }

            if (uiDraggableSlotId > 100){
                $('.js-warehouse-items-container').addClass('z-index-max');
            }
        },
        out: function () {
            $(this).removeClass('hover');
        },
        drop: function (event, ui) {
            let uiDraggableSlotId = getSlotID(ui.draggable),
                uiDraggableItemId = getItemID(ui.draggable),
                thisId = + $(this).attr('data-slot'),
                thisItemId = + $(this).find('.js-item').attr('data-id');

            if( (uiDraggableItemId === thisItemId) && (uiDraggableSlotId !== thisId) ){
                stackItems(ui.draggable,$(this));
            }
            else if (event.originalEvent.ctrlKey && (+ui.draggable.find('.quantity-value').html() !== 1)) {
                modalInteractionSplit(getSlotID(ui.draggable),getItemID(ui.draggable),getDropBlockID($(this)));
            }
            else {
                $(this).append(ui.draggable);
                updateID(ui.draggable,getSlotID(ui.draggable),getItemID(ui.draggable),getDropBlockID($(this)));
            }

        }
    });

}

// lighting OutWearSlots if u drag item with this type
function hoverOutWearSlots($this){
    let SlotKey = getSlotArrayKey(myItemsObj,getSlotID($this)),
        ItemType = myItemsObj[SlotKey].OutfitType;

    $usedItemsBlock.children('[data-outfit-type="'+ItemType+'"]').addClass('hover-type');
}

// automatically dropping items to outwear-slots
function dropToOutfit($this, uiDraggable){
    let slot = getSlotID(uiDraggable),
        itemType = getOutfitType(uiDraggable);

    for (var i = 1; i <= 13; i++){
        if (i === itemType) {
            let dataSlot = + $this.children('[data-outfit-type="'+i+'"]').attr('data-slot');

            if ($this.children('[data-outfit-type="'+i+'"]').has('.js-item').length) {
                break;
            }

            for (var j = 0; j <= myItemsObj.length; j++){
                if (myItemsObj[j].SlotID === slot) {

                    putOnItems($this ,uiDraggable, j, dataSlot, itemType);

                    break;
                }
            }
            break;
        }
    }
}

function putOnItems($this, uiDraggable, itemKey, dataSlot, OutfitType) {
    let itemName = myItemsObj[itemKey].ItemName,
        itemId = myItemsObj[itemKey].ItemID,
        itemAmount = myItemsObj[itemKey].Amount;

    if (itemAmount > 1){
        myItemsObj[itemKey].Amount = itemAmount -1;
        newArray(dataSlot, itemName, itemId, '1', OutfitType);
    }
    else {
        $usedItemsBlock.children('[data-slot="'+dataSlot+'"]').append(uiDraggable);
        updateID(uiDraggable,+uiDraggable.attr('data-slot-id'),getItemID(uiDraggable),dataSlot);
    }
}

// updating ISs when item is dropped
function updateID(ui, slotId, itemId, dropBlockID) {
    for (let i = 0; i < myItemsObj.length; i++) {
        if (myItemsObj[i].SlotID === slotId) {
            myItemsObj[i].SlotID = dropBlockID;
            ui.attr('data-slot-id', dropBlockID);
            myItems = JSON.stringify(myItemsObj);
            break;
        }
    }
    changeWeightOfItems();
    changeWeightOfItemsWarehouse();
}

// stackItems
function stackItems(uiDraggable, $this){
    let uiDraggableSlotId = getSlotID(uiDraggable),
        thisSlotId = +$this.attr('data-slot'),
        uiDraggableItemArrayKey = getSlotArrayKey(myItemsObj, uiDraggableSlotId),
        uiDraggableItemAmount = myItemsObj[uiDraggableItemArrayKey].Amount;

    stackBlockAmount(thisSlotId, uiDraggableItemAmount);
    myItemsObj.splice(uiDraggableItemArrayKey, 1);
    myItems = JSON.stringify(myItemsObj);
    dummyCall()
}

// stack ItemBlockAmount
function stackBlockAmount(SlotID, uiDraggableItemAmount) {
    for (let i = 0; i < myItemsObj.length; i++) {
        if (myItemsObj[i].SlotID === SlotID) {
            var oldAmount = myItemsObj[i].Amount ;
            myItemsObj[i].Amount = oldAmount + uiDraggableItemAmount;
            break;
        }
    }
}

// Generating modal for item
function modalInteractionDrop() {

    let item = '.js-item',
        modalID = $('.js-modal-1'),
        inputMaxValue = $('#myRange');

    $('.js-item-block').on('click', item, function () {

        let thisItemID = +($(this).attr('data-slot-id')),
            thisItemKey = getItemArrayKey(myItemsObj, thisItemID),
            ItemName = myItemsObj[thisItemKey].ItemName,
            ItemAmount = myItemsObj[thisItemKey].Amount;

        modalID.find('.js-modal-item-name').text(ItemName);
        modalID.find('.js-value').text(ItemAmount);
        inputMaxValue.attr('max', ItemAmount);
        inputMaxValue.val('1');

        $('.js-button-max').on('click', function () {
            $('#myRange').val(ItemAmount);
            $('#input-value').text(ItemAmount);
        });

        changeUnderTheLineValue();
    });
}

function modalInteractionSplit(slotId, itemId, dropBlockID) {
    let thisItemKey = myItemsObj.itemKey(slotId),
        thisItemAmount = myItemsObj[thisItemKey].Amount,
        inputId = $('#input-divide');

    $modalSplit.attr('data-slot-id', slotId);
    $modalSplit.attr('data-drop-slot-id', dropBlockID);

    $('.js-modal-2-button').click();
    inputId.val('1');
    inputId.attr('max', thisItemAmount);
    rangeOfInputSplit(thisItemAmount);

    $('.js-modal-2-min').on('click', function () {
        inputId.val('1');
    });
    $('.js-modal-2-half').on('click', function () {
        inputId.val(Math.ceil(thisItemAmount / 2));
    });
    $('.js-modal-2-max').on('click', function () {
        inputId.val(thisItemAmount - 1);
    });

}

$modalSplit.on('click', '.js-split', function () {
    let slotId = + $modalSplit.attr('data-slot-id'),
        dropSlotId = + $modalSplit.attr('data-drop-slot-id'),
        thisItemKey = myItemsObj.itemKey(slotId),
        inputId = $('#input-divide'),
        inputValue;

    inputValue = inputId.val();

    splitItem(thisItemKey, slotId, dropSlotId, inputValue);
    $modalSplit.removeClass('md-show');
});

// add value from split-popup
function rangeOfInputSplit(maxValue){
    let app = {
        vars: {
            input: document.getElementById('input-divide'),
            min: 1,
            max: maxValue - 1
        },

        keyup: function() {
            if(app.vars.input.value.length >= 0 && app.vars.input.value.length <= 2) {
                setTimeout (function(){
                    if(app.vars.input.value.length !== 0) {
                        if(app.vars.input.value < app.vars.min) {
                            app.vars.input.value = app.vars.min;
                        }
                    }
                }, 500);
            }

            if(app.vars.input.value.length >= 2) {
                if(app.vars.input.value >= app.vars.max) {
                    app.vars.input.value = app.vars.max;
                }
            }
        },

        init: function() {
            app.vars.input.onkeyup = app.keyup;
        }
    };

    app.init();
}

function splitItem(thisItemKey, slotId, dropBlockID, inputValue) {
    let splitedItemKey = myItemsObj.itemKey(slotId),
        splitedId = myItemsObj[splitedItemKey].ItemID,
        splitedType = myItemsObj[splitedItemKey].OutfitType,
        splitedName = myItemsObj[splitedItemKey].ItemName,
        splitedQuantityValue = myItemsObj[splitedItemKey].Amount,
        newAmount = splitedQuantityValue - inputValue;

    myItemsObj[splitedItemKey].Amount = newAmount;
    newArray(dropBlockID, splitedName, splitedId, inputValue, splitedType);
}

// get draggable item data
function newArray(splitSlotID, splitItemName, splitItemID, splitAmount, OutfitType) {
    myItemsSplit = [];
    myItemsSplit.push(
        {
            SlotID: splitSlotID,
            OutfitType: OutfitType,
            id: splitItemID,
            name: splitItemName,
            img: 'img/pizza.svg',
            quantityValue: splitAmount,
            singleWeight: 0.2,
            interactionFirst: 'Съесть',
            interactionSecond: 'Выбросить'
        }
    );
    pushToMyItemsObj(myItemsSplit)
}

// total weight of items
function weightOfItems() {
    var sum = 0;
    for (var i = 0; i < myItemsObj.length; i++) {
        if (myItemsObj[i].SlotID <= 25) {
            sum += myItemsObj[i].Amount * singleWeightTemporary;
        }
    }
    return sum;
}

// change weight of items ===> linePercent(); weightOfItems();
function changeWeightOfItems() {
    $('.amount-of-space .total').html(weightOfItems().toFixed(1));

    function linePercent() {
        let totalValue = 10;
        let result = totalValue / 100 * weightOfItems();
        if (result >= 1) {
            return 100 + '%'
        }
        else {
            return result * 100 + '%';
        }
    }

    $('.filling-percentage').css('width', linePercent());
}

// total weight of items
function weightOfItemsWarehouse() {
    var sum = 0;
    for (var i = 0; i < myItemsObj.length; i++) {
        if (myItemsObj[i].SlotID >= 101) {
            sum += myItemsObj[i].Amount * singleWeightTemporary;
        }
    }
    return sum;
}

// change weight of items
function changeWeightOfItemsWarehouse() {
    $('.amount-of-space-warehouse .total').html(weightOfItemsWarehouse().toFixed(1));

    function linePercent() {
        let totalValue = 10;
        let result = totalValue / 1000000 * weightOfItemsWarehouse();
        if (result >= 1) {
            return 100 + '%'
        }
        else {
            return result * 100 + '%';
        }
    }

    $('.filling-percentage-warehouse').css('width', linePercent());
}

// click for item
function dropDownList() {
    let integrationMenuBlock = '#my-items .interaction-menu';
    let item = '.item';

    $('.items-block .item-block').on('click', item, function () {
        $(this).children(integrationMenuBlock).slideToggle(0);
        $(this).parent().addClass('active')
    });
    $(document).mouseup(function (e) { // событие клика по веб-документу
        let div = $(integrationMenuBlock); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            div.hide(); // скрываем его
            $(item).parent().removeClass('active');
        }
    });

    modalInteractionDrop();
}

// change value in modal-drop
function changeUnderTheLineValue() {
    let inputSlider = $('#myRange').attr('value');
    let inputDemo = $('#input-value');
    inputDemo.text(inputSlider);
    $(document).on('input', '#myRange', function () {
        let $item = $(this),
            value = $item.val();

        inputDemo.text(value);
    });
}

// status circle change
function changeStatusCircle(){

    let satiety = {
        value : 90,
        id    : '#satiety',
    };
    let thirst = {
        value : 30,
        id    : '#thirst',
    };
    let mood = {
        value : 100,

        id    : '#mood',
    };
    let drugAddict = {
        value : 0,
        id    : '#drug-addict',
    };

    function currentValue(value)
    {
        for( let i = 0; i <= 100; i=(i+5)){
            if(value <= i){
                return i;
            }
        }
    }
    function changeCircle(elem)
    {
        let img = '<img src="img/status/' + elem.id.slice(1) + '/' + currentValue(elem.value) + '.svg" alt="">';
        $(elem.id).find('.circle-front').html(img);
        $(elem.id).find('.value').text(elem.value);
    }
    changeCircle(satiety);
    changeCircle(thirst);
    changeCircle(mood);
    changeCircle(drugAddict);
}
changeStatusCircle();

// md-modal
function mdModal() {
    let overlay = document.querySelector( '.md-overlay' );
    [].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

        let modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
            close = modal.querySelector( '.md-close' );

        function removeModal( hasPerspective ) {
            classie.remove( modal, 'md-show' );

            if( hasPerspective ) {
                classie.remove( document.documentElement, 'md-perspective' );
            }
        }

        function removeModalHandler() {
            removeModal( classie.has( el, 'md-setperspective' ) );
        }

        el.addEventListener( 'click', function( ev ) {
            classie.add( modal, 'md-show' );
            overlay.removeEventListener( 'click', removeModalHandler );
            overlay.addEventListener( 'click', removeModalHandler );

            if( classie.has( el, 'md-setperspective' ) ) {
                setTimeout( function() {
                    classie.add( document.documentElement, 'md-perspective' );
                }, 25 );
            }
        });

        close.addEventListener( 'click', function( ev ) {
            ev.stopPropagation();
            removeModalHandler();
        });

    } );
}

function hoverItems() {
    $( ".js-item-block" ).hover(
        function() {
            $( this ).addClass( "hover" );
        },
        function() {
            $( this ).removeClass( "hover" );
        }
    );
}


$(document).ready(function () {
    document.getElementById('input-divide').onkeydown = function (e) {
        return !(/^[А-Яа-яA-Za-z ]$/.test(e.key));  // IE > 9
    };
});