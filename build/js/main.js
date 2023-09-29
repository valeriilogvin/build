let $body               = $("body"),
    $chat               = $('.chat'),
    $chatForm           = $('.chat form'),
    $chatFormInput      = $('.chat form input'),
    $chatButton         = $('.chat a.button'),
    $pistolAmo          = $('.pistol-ammo'),
    $region             = $('.region'),
    $street             = $('.street'),
    $fuel               = $('.fuel'),
    $date               = $('.date'),
    $time               = $('.time'),
    $speed              = $('.speed'),
    $money              = $('.money'),
    $blocked            = $('.blocked'),
    $microImg           = $('.micro-img'),
    $engineIcon         = $('.engine-icon'),
    $hudHelpPlayer      = $('.hud-help-player'),
    $hudHelpVehicle     = $('.hud-help-vehicle'),
    $hudVoiceVehicle    = $('.hud-voice-vehicle'),
    $hudVoicePlayer     = $('.hud-voice-player'),
    animationEasing     = 'linear';

moneyAmount('42343122');
locationData('Davis', 'Дэвис авеню');
engineON(); // on/off engine
microON(); // on/off micro
clock(); // time
turnSignal(); // turn-arrow toggle
blockedCar(); // lock/unlock
fuelAmount(82);
pistolAmoAmount(33);
vehicleSpeed(80);
changeChatInput();
showChat();
displayingMicro(1); // 0 - player; 1 - vehicle
displayingHelp(1); // 0 - player; 1 - vehicle

function displayingHelp(type){
    // 0 - hud-voice
    if( type === 0 ){
        $hudHelpPlayer.css('display', 'block');
        showHudHelp($hudHelpPlayer)
    }
    else if( type === 1 ){
        $hudHelpVehicle.css('display', 'block');
        showHudHelp($hudHelpVehicle)
    }
}

function displayingMicro(type){
    // 0 - hud-voice
    if( type === 0 ){
        $hudVoicePlayer.css('display', 'flex');
    }
    else if( type === 1 ){
        $hudVoiceVehicle.css('display', 'flex');
    }
}

function clock() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hours = d.getHours();
    var minutes = d.getMinutes();

    if (day <= 9) day = "0" + day;
    if (hours <= 9) hours = "0" + hours;
    if (minutes <= 9) minutes = "0" + minutes;
    if (month <= 9) month = "0" + month;

    $date.html(day + "." + month);
    $time.html(hours + ":" + minutes);
    setTimeout("clock()", 1000);
}

function showChat(){
    $body.keydown(function (e) {

        if ((e.keyCode === 84) && ($chat.is(':hidden'))) {
            console.log('press "T" & chat is show');
            $chat.fadeIn(animationEasing);
            $chatFormInput.focus();
            return false
        }
        else if ((e.keyCode === 84) && ($chat.is(':visible')) && (isFocus() !== false)) {
            console.log('press "T" & chat is hide');
            $chat.fadeOut(animationEasing);
        }
    });
}

function showHudHelp(className) {
    $body.keydown(function (e) {

        if ((e.keyCode === 117) && (className.is(':hidden'))) {
            console.log('press "F6" & hud-help is hide');
            className.fadeIn(animationEasing);
        }
        else if ((e.keyCode === 117) && (className.is(':visible')) && (isFocus() !== false)) {
            console.log('press "F6" & hud-help is hide');
            className.fadeOut(animationEasing);
        }
    });
}

function engineON() {
    $body.keydown(function (e) {
        if( (e.keyCode === 50) && (isFocus() !== false)) {
            console.log('keydown "2"');

            // do function ON engine

            $engineIcon.toggleClass('engine-on')
        }
    });
}

function microON() {
    $body.keydown(function (e) {
        if( (e.keyCode === 66) && (isFocus() !== false)) {
            console.log('keydown "B"');

            // do function ON micro

            $microImg.addClass('micro-on')
        }
    });
    $body.keyup(function (e) {
        if( (e.keyCode === 66) && (isFocus() !== false)) {
            console.log('keyup "B"');

            // do function OFF micro

            $microImg.removeClass('micro-on')
        }
    });
}

function blockedCar() {
    $body.keydown(function (e) {
        if ((e.keyCode === 76) && (isFocus() !== false)) {
            console.log('press "L"');

            $blocked.toggleClass('blocked-on')
        }
    });
}

function turnSignal() {
    $body.keydown(function (e) {
        if ((e.keyCode === 37) && (isFocus() !== false)) { // press "left"
            console.log('press "left"');
            if( $('.turn-signal-left').hasClass('active') && $('.turn-signal-right').hasClass('active') ){
                $('.turn-signal').removeClass('active')
                $('.turn-signal-left').addClass('active')
            }
            else if( $('.turn-signal-left').hasClass('active') ){
                $('.turn-signal-left').removeClass('active')
            }
            else{
                $('.turn-signal-right').removeClass('active')
                $('.turn-signal-left').addClass('active')
            }
        }
        else if ((e.keyCode === 39) && (isFocus() !== false)) { // press "right"
            console.log('press "right"');
            if( $('.turn-signal-right').hasClass('active') && $('.turn-signal-left').hasClass('active') ){
                $('.turn-signal').removeClass('active')
                $('.turn-signal-right').addClass('active')
            }
            else if( $('.turn-signal-right').hasClass('active') ){
                $('.turn-signal-right').removeClass('active')
            }
            else{
                $('.turn-signal-left').removeClass('active')
                $('.turn-signal-right').addClass('active')
            }
        }
        else if( (e.keyCode === 40) && (isFocus() !== false)) {
            console.log('keydown "down"');

            if($('.turn-signal-left').hasClass('active') && $('.turn-signal-right').hasClass('active')){
                $('.turn-signal')
                    .removeClass('active')
            }
            else if($('.turn-signal-left').hasClass('active') || $('.turn-signal-right').hasClass('active')){
                $('.turn-signal')
                    .removeClass('active')
                    .addClass('active')
            }
            else {
                $('.turn-signal')
                    .addClass('active');
            }
        }
    });
}

function fuelAmount(amount){
    $fuel.text(amount + 'L');
}

function moneyAmount(amount) {
    var n = amount.toString(),
        replacedAmount = n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    $money.text('$'+replacedAmount);
}

function locationData(region,street) {
    $region.text(region);
    $street.text(street);
}

function pistolAmoAmount(amount){
    $pistolAmo.fadeIn(animationEasing);
    $pistolAmo.text(amount);
}

function vehicleSpeed(speed) {
    $speed.text(speed + ' КМ/Ч');
}

function changeChatInput() {
    $chat.on('click', '.chat-buttons a.button', function () {
        var $this = $(this),
            $thisAttr = $this.attr('data-show'),
            $thisInputBlock = $chatForm.find('.'+ $thisAttr +''),
            $thisValueText = $chatForm.children(':visible').find('input').val();

        $chatButton.removeClass('show');
        $this.addClass('show');
        console.log();
        $chatForm.children().hide();
        $chatForm.find('.'+ $thisAttr +'').show();
        $chatForm.find('.'+ $thisAttr +'').find('input').val($thisValueText);
        $chatFormInput.focus();
        paddingInputText($thisInputBlock)
    });
}

function paddingInputText($thisInputBlock) {
    var thisInputTextWidth = $thisInputBlock.find('.inputText').width();
    var thisInput = $thisInputBlock.find('input');
    console.log(thisInputTextWidth);
    thisInput.css('padding-left', thisInputTextWidth + 25)
}

function isFocus() {
    if ($chatFormInput.is(":focus")) {
        return false
    }
}