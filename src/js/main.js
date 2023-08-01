/*
* variables
*/
let char = {
    name                : document.querySelector('.js_create_name'),
    firstName           : document.querySelector('.js_first_name'),
    lastName            : document.querySelector('.js_last_name'),
    age                 : document.querySelector('.js_age'),
    male                : document.querySelector('.js_male'),
    female              : document.querySelector('.js_female'),
    errors              : document.querySelector('.js_errors'),
    back                : document.querySelector('.js_back'),
    inputtedData        : document.querySelector('.js_inputted_data'),
    settingBlock        : document.querySelector('.js_setting_block'),
    inputtedFirstName   : document.querySelector('.js_data_first_name'),
    inputtedLastName    : document.querySelector('.js_data_last_name'),
    inputtedAge         : document.querySelector('.js_data_age'),
    inputtedGender      : document.querySelector('.js_data_gender'),

    tabs                : document.querySelectorAll('.js_tab'),
    tabsContainers      : document.querySelectorAll('.js_tab_container'),

    btnCreate           : document.querySelector('.js_create_char'),

    validFirstName      : false,
    validLastName       : false,
    validAge            : false,
    playerGender        : 0, // 0 - female; 1 - male
};

let characterCreationArray = [
    // mother
    [
        'Ханна',
        'Одри',
        'Жасмин',
        'Жизель',
        'Амелия',
        'Изабелла',
        'Зоуи',
        'Ава',
        'Камила',
        'Виолетта',
        'Софая',
        'Эвелин',
        'Николь',
        'Эшли',
        'Грейс',
        'Брианна',
        'Натали',
        'Оливия',
        'Елизавета',
        'Шарлотта',
        'Эмма',
        'Мисти'
    ],
    // father
    [
        'Бенджамин',
        'Даниэль',
        'Джошуа',
        'Ноа',
        'Эндрю',
        'Хуан',
        'Алекс',
        'Айзек',
        'Эван',
        'Итан',
        'Винмсент',
        'Энджел',
        'Диего',
        'Эйдриен',
        'Габриэль',
        'Майкл',
        'Сантьяго',
        'Кевин',
        'Луи',
        'Самюэль',
        'Энтони',
        'Клод',
        'Джон',
        'Нико',
    ],
    // eyes-color
    [
        '#222222',
        '#432434',
        '#634322'
    ],
    // skin-color
    [
        '#ffffff',
        '#000000',
        '#634322'
    ],
    // hairstyle
    [
        'hairstyle1',
        'hairstyle2',
        'hairstyle3'
    ]
];

let newChar = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    mother: '',
    father: '',
    affinity: '',
    colorSkin: '',
};

/*
* test data
* */

/*
* functions dummy calls
* */
// crateName(); // start
secondStep();

/*
* main functions
* */
function crateName(){
    setTimeout(() => {
        char.name.classList.remove('hide')
    }, 500)
}

char.firstName.oninput = function () {
    validatorName();
};
char.lastName.oninput = function () {
    validatorLastName();
};
char.male.oninput = function () {
    char.playerGender = 1
};
char.female.oninput = function () {
    char.playerGender = 0
};
char.age.oninput = function () {
    validatorAge()
};

function createCharacterName() {

    let firstName = char.firstName.value,
        lastName = char.lastName.value,
        age = char.age.value,
        gender = char.playerGender;

    if (!char.validFirstName) {
        char.firstName.classList.add('error');
        showError('Заполните все поля');
    }
    if (!char.validLastName) {
        char.lastName.classList.add('error');
        showError('Заполните все поля');
    }
    if (!char.validAge) {
        char.age.classList.add('error');
        showError('Заполните все поля');
    }
    if(char.validFirstName && char.validLastName && char.validAge){
        console.log('firstName: ' + firstName + '; lastName: ' + lastName + '; age: ' + age + '; gender: ' + gender);

        char.name.classList.add('hide');

        char.inputtedFirstName.innerText = firstName;
        char.inputtedLastName.innerText = lastName;
        char.inputtedAge.innerText = age;
        if(gender === 0) char.inputtedGender.innerText = 'Женский';
        else char.inputtedGender.innerText = 'Мужской';

        newChar.firstName = firstName;
        newChar.lastName = lastName;
        newChar.age = age;
        newChar.gender = gender;
        secondStep();
    }
}

function validatorName() {
    let value = char.firstName.value;

    let rus = value.match(/[А-Яа-яёЁЇїІіЄєҐґ]/g),
        iChars = value.match(/[^\d\sA-Z]/gi),
        numbers = value.match(/[0-9]/g),
        space = value.match(/\s/);

    if (value.length === 0) {
        char.validFirstName = false;
    }

    for (let i = 0; i < value.length; i++) {

        char.firstName.value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

        if (iChars || rus || space) {
            showError('Имя может содержать только латинские символы.');
            char.validFirstName = false;
        } else if (numbers) {
            showError('Имя не может содержать цифры.');
            char.validFirstName = false;
        } else {
            char.validFirstName = true;
        }
    }
    if (!char.validFirstName) {
        char.firstName.classList.add('error');
    } else {
        showError('');
        char.firstName.classList.remove('error');
    }
}

function validatorLastName() {
    let value = char.lastName.value;

    let rus = value.match(/[А-Яа-яёЁЇїІіЄєҐґ]/g),
        iChars = value.match(/[^\d\sA-Z]/gi),
        numbers = value.match(/[0-9]/g),
        space = value.match(/\s/);

    if (value.length === 0) {
        char.validLastName = false;
    }

    for (let i = 0; i < value.length; i++) {

        char.lastName.value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

        if (iChars || rus || space) {
            showError('Фамилия может содержать только латинские символы.');
            char.validLastName = false;
        } else if (numbers) {
            showError('Фамилия не может содержать цифры.');
            char.validLastName = false;
        } else {
            char.validLastName = true;
        }
    }

    if (!char.validLastName) {
        char.lastName.classList.add('error');
    } else {
        showError('');
        char.lastName.classList.remove('error');
    }
}

function validatorAge() {
    let value = char.age.value,
        numbers = value.match(/[0-9]/g);

    if (value.length === 0) {
        char.validAge = false;
        char.age.classList.add('error')
    } else if(!numbers){
        char.age.classList.add('error');
        char.age.value = char.age.value.replace(/\D/g, "");
        char.validAge = false;
    }else {
        char.age.value = char.age.value.replace(/\D/g, "");
        showError('');
        char.age.classList.remove('error');
        char.validAge = true;
    }
}

function showError(string) {
    char.errors.innerText = string;
}

function backToStart() {
    char.inputtedData.classList.add('hide');
    char.back.classList.add('hide');
    char.settingBlock.classList.add('hide');
    setTimeout(() => {
        char.name.classList.remove('hide')
    }, 500)
}


function secondStep() {
    setTimeout(() => {
        char.back.classList.remove('hide');
        char.back.classList.remove('hide');
        char.settingBlock.classList.remove('hide');
        char.inputtedData.classList.remove('hide');
    }, 500)
}

function randomSetting() {
    console.log('random');
}

/*
* tabs
* */
char.tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        let activeTab = tab.classList.contains('active'),
            thisIndex = tab.dataset.index,
            $thisTabContainer = document.querySelector(`.js_tab_container[data-index='${thisIndex}']`);

        if(!activeTab){
            for ( let item of char.tabs) item.classList.remove('active');
            for ( let item of char.tabsContainers) item.classList.remove('active');

            tab.classList.add('active');
            $thisTabContainer.classList.add('active');
        }
    })
});

class RangeSlider{
    constructor(key, maxValue){
        this.object = newChar;
        this.$parent = document.querySelector(`#${key}`);
        this.key =  key;
        this.value = maxValue;
        this.object[this.key] = this.value/2;
        this.create();
    }

    create(){
        this.$parent
            .innerHTML = `
                <input class="${this.key}" type="range" step="1" value="${this.value/2}" min="1" max="${this.value}">
            `;

        $('input[type=range]').rangeslider({
            polyfill: false,
        });

        this.$className = document.querySelector(`.${this.key}`);

        this.$className.oninput = () => {
            this.object[this.key] = this.$className.value;
        }
    }
}

class TextSlider {
    constructor(key, arrayIndex, itemIndex){
        this.object = newChar;
        this.key = key;
        this.$selector = document.querySelector(`#${this.key}`);
        this.arrayIndex = arrayIndex;
        this.itemIndex = itemIndex;
        this.btnPrev = this.$selector.previousElementSibling;
        this.btnNext = this.$selector.nextElementSibling;
        this.arrayLength = characterCreationArray[this.arrayIndex].length;
        this.lastIndex =  this.arrayLength - 1;

        this.btnPrev.addEventListener('click', () => {
            this.itemIndex--;
            if(this.itemIndex === -1) this.itemIndex = this.lastIndex;
            this.append();
        });

        this.btnNext.addEventListener('click', () => {
            this.itemIndex++;
            if(this.itemIndex === this.arrayLength) this.itemIndex = 0;
            this.append();
        });

        this.append();
    }

    append(){
        // this.object[this.key] = characterCreationArray[this.arrayIndex][this.itemIndex].toString(); // mother name
        this.object[this.key] = this.itemIndex; // mother index
        this.$selector.innerText = characterCreationArray[this.arrayIndex][this.itemIndex];
    }

}

class ColorSelect {
    constructor(key, colorArray){
        this.object = newChar;
        this.key = key;
        this.$selector = document.querySelector(`#${this.key}`);
        this.colorArray = colorArray;
        this.object[this.key] = 0;
        this.append();
    }

    append(){
        for(let i = 0; i < this.colorArray.length; i++){
            this.color = this.colorArray[i];
            this.$selector.insertAdjacentHTML('beforeend', `
                <div data-index="${i}" class="item js_color_item" style="background: ${this.color}"></div>
            `)
        }
        this.appendToNewChar();

    }
    appendToNewChar(){
        this.items = this.$selector.querySelectorAll('.js_color_item');

        this.items.forEach(item => {
            item.addEventListener('click', () => {
                if(!item.classList.contains('active')){
                    for(let el of this.items) el.classList.remove('active');
                    item.classList.add('active')
                }
                this.index = +item.dataset.index;
                this.object[this.key] = this.index;
            })
        })
    }

}

new TextSlider( 'mother', 0, 0);
new TextSlider( 'father', 1, 0);

new RangeSlider( 'affinity', 10);
new RangeSlider( 'colorSkin', 10);
new RangeSlider( 'browsHeight', 10);
new RangeSlider( 'browsDepth', 10);
new RangeSlider( 'browsSaturation', 10);
new RangeSlider( 'eyes', 10);

new RangeSlider( 'cheekbonesHeight', 10);
new RangeSlider( 'cheekbonesWidth', 10);
new RangeSlider( 'cheeksDepth', 10);

new RangeSlider( 'noseWidth', 10);
new RangeSlider( 'noseHeight', 10);
new RangeSlider( 'noseTip', 10);
new RangeSlider( 'noseTipWidth', 10);
new RangeSlider( 'noseTipHeight', 10);
new RangeSlider( 'noseBreak', 10);

new RangeSlider( 'jawWidth', 10);
new RangeSlider( 'jawHeight', 10);

new RangeSlider( 'chinWidth', 10);
new RangeSlider( 'chinHeight', 10);
new RangeSlider( 'chinDepth', 10);
new RangeSlider( 'chinDimple', 10);

new RangeSlider( 'neckWidth', 10);

new RangeSlider( 'skinPigmentation', 10);
new RangeSlider( 'skinSaturation', 10);
new RangeSlider( 'aging', 10);
new RangeSlider( 'burns', 10);
new RangeSlider( 'acne', 10);
new RangeSlider( 'freckles', 10);

new ColorSelect( 'eyesColor', characterCreationArray[2]);
new ColorSelect( 'skinColor', characterCreationArray[3]);
new ColorSelect( 'hairColor', characterCreationArray[3]);
new ColorSelect( 'hairAdditionalColor', characterCreationArray[3]);

new TextSlider( 'hairstyle', 4, 0);
new TextSlider( 'eyebrowsStyle', 4, 0);
new TextSlider( 'faceHair', 4, 0);
new TextSlider( 'bodyHair', 4, 0);

new TextSlider( 'outerwear', 4, 0);
new TextSlider( 'tShirts', 4, 0);
new TextSlider( 'pants', 4, 0);
new TextSlider( 'shoes', 4, 0);

char.btnCreate.addEventListener('click', () => {
    console.log(newChar)
});
