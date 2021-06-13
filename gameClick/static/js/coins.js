let image = document.querySelector('.image');
let score = document.querySelector('.score');
let power = document.querySelector('.click_power');
let hit = document.querySelector('.hit');
let lvl = document.querySelector('.lvl');
let button_click = document.querySelector('.button_click');


let power_up_cost = document.querySelector('.power_up_cost');
let hit_up_cost = document.querySelector('.hit_up_cost');

let b_power_up = document.querySelector('.button_power_up');
let b_hit_up = document.querySelector('.button_hit_up');

let hp_bar = document.querySelector('.hp-bar');
let hp_score = document.querySelector('.hp-score');

let buttons = document.querySelectorAll('.button-boost')

let boss_hp = parseInt(hit.textContent) * parseInt(lvl.textContent);

function updata() {
    const csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value
    const c_score = +score.textContent;
    const c_power = +power.textContent;
    const c_hit = +hit.textContent;
    const c_lvl = +lvl.textContent;
    const c_power_up_cost = +power_up_cost.textContent;
    const c_hit_up_cost = +hit_up_cost.textContent;

    console.log(csrftoken)
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRFToken': csrftoken
        },
        credentials: 'same-origin',
        body: JSON.stringify({c_score, c_power, c_hit, c_lvl, c_power_up_cost, c_hit_up_cost})
    }
    try {
        fetch('/updata', options);
    } catch (e) {
        console.error(e);
    }
}

button_click.onclick = function () {
    let hp = 0;
    if (parseInt(hp_score.textContent) != 0) {
        if (parseInt(hp_score.textContent) > parseInt(hit.textContent)) {
            hp_score.textContent = parseInt(hp_score.textContent) - parseInt(hit.textContent);
            hp = parseInt(hp_score.textContent)/boss_hp * 100;
        } else{
            hp_score.textContent = 0;
            score.textContent = parseInt(score.textContent) + (boss_hp * 1.5);
            image.classList.toggle('dead');
        }
        hp_bar.style.width = hp + '%';
    }
    else {
        boss_hp *= parseInt(lvl.textContent);
        hp_score.textContent =  boss_hp;
        hp_bar.style.width = '100%';
        image.classList.toggle('dead');
    }
    updata();
};

b_power_up.onclick = function () {
    if(parseInt(score.textContent) >= parseInt(power_up_cost.textContent)){
        score.textContent = parseInt(score.textContent) - parseInt(power_up_cost.textContent);
        power.textContent = parseInt(power.textContent) * parseInt(lvl.textContent) + 1;
        lvl.textContent++;
        power_up_cost.textContent *= lvl.textContent**2 /parseInt(lvl.textContent);
        updata();
    }
};

b_hit_up.onclick = function () {
    if(parseInt(score.textContent) >= parseInt(hit_up_cost.textContent)){
        score.textContent = parseInt(score.textContent) - parseInt(hit_up_cost.textContent);
        hit.textContent = parseInt(hit.textContent) * parseInt(lvl.textContent) + 1;
        lvl.textContent++;
        hit_up_cost.textContent *= lvl.textContent**2 /parseInt(lvl.textContent);
        updata();
    }
};

hp_score.textContent = boss_hp;
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function green_red() {
        if (buttons[i].classList.contains('red')) {
            if (parseInt(score.textContent) >= parseInt(power.textContent)){
                score.textContent =   parseInt(score.textContent) - parseInt(power.textContent);
            }
            else score.textContent = 0;
            buttons[i].textContent = 'Заработать'
            buttons[(i+1) % 2].textContent = 'Потратить'
        } else {
            score.textContent = parseInt(power.textContent) + parseInt(score.textContent);
            buttons[i].textContent = 'Потратить'
            buttons[(i+1) % 2].textContent = 'Заработать'
        }
        buttons[0].classList.toggle('red');
        buttons[0].classList.toggle('green');
        buttons[1].classList.toggle('red');
        buttons[1].classList.toggle('green');
        updata();
    }
}

