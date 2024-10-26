function setDefaultValues(){
    let delay_input = document.getElementById('delay');
    let kps_input = document.getElementById('kps');
    
    if (kps_input.value == ''){
        kps_input.value = 5;
    }
    if (delay_input.value == ''){
        delay_input.value = 0;
    }
}

function checkErrors() {
    let text_input = document.getElementById('textinput');
    let input_warning = document.getElementById('inputwarning');
    let delay_input = document.getElementById('delay');
    let delay_warning = document.getElementById('delaywarning');
    let kps_input = document.getElementById('kps');
    let kps_warning = document.getElementById('kpswarning');

    let output = false;

    if (/[^\d]/g.test(delay_input.value)) {
        delay_warning.textContent = "Input field must only contain numerical characters";
        output = true;
        throw new Error('provided delay contained non numerical characters');
    } else if (delay_input.value === "") {
        delay_warning.textContent = "Input field cannot be empty";
        output = true;
        throw new Error('provided delay was empty');
    } else {
        delay_warning.textContent = "";
    }

    if (/[^\d]/g.test(kps_input.value)) {
        kps_warning.textContent = "Input field must only contain numerical characters";
        output = true;
        throw new Error('provided kps contained non numerical characters');
    } else if (kps_input.value === "") {
        kps_warning.textContent = "Input field cannot be empty";
        output = true;
        throw new Error('provided kps was empty');
    } else {
        kps_warning.textContent = "";
    }
    
    if (text_input.value === "") {
        input_warning.textContent = "provide an input string you dunce";
        output = true;
        throw new Error('provided input string was empty');
    } else {
        input_warning.textContent = "";
    }

    return output;
}

function randInt(min, max) {
    // self explanatory
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function secondsToDHMS(seconds) {
    // probably a more efficient way of doing this
    var days = Math.floor(seconds / (3600 * 24));
    var hours = Math.floor((seconds % (3600 * 24)) / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var seconds = Math.floor(seconds % 60);

    let days_display = "";
    if (days != 0){
        days_display = `${days} day${(days === 1 ? "" : "s")}`;
    }

    let hours_display = "";
    if (hours != 0){
        hours_display = `${hours} hour${(hours === 1 ? "" : "s")}`;
    }

    let minutes_display = "";
    if (minutes != 0){
        minutes_display = `${minutes} minute${(minutes === 1 ? "" : "s")}`;
    }

    let seconds_display = "";
    if (seconds != 0){
        seconds_display = `${seconds} second${(seconds === 1 ? "" : "s")}`;
    }  

    const parts = [days_display, hours_display, minutes_display, seconds_display].filter(part => part !== "");

    if (parts.length > 1) {
        return parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1];
    } else if (parts.length === 1) {
        return parts[0];
    } else {
        return "";
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // borrowed without permission from StackOverflow.com
}

async function monkeyTypewriter(input_str, delay, keystrokes, model){
    
    let output_str = new Array(input_str.length).fill('');
    let output_element = document.getElementById('output');
    let attempts_element = document.getElementById('attempts');
    let time_element = document.getElementById('timetoacheive');
    let time = document.getElementById('time');
    let probability = document.getElementById('probability');
    let attempts = 1;
    
    if (checkErrors()){
        return;
    }
    
    time.textContent = 'assuming a rate of ' + keystrokes + ' keystrokes per second it would take 1 monkey'
    probability.textContent = "1 in " + numberWithCommas(96**input_str.length); // 96 different ascii characters to choose from
    if (model === "regular monkey typewriter"){
        for (let i = 0; i < input_str.length; i++) { // iterate through input str
            while(output_str[i] != input_str[i]){ // while character is incorrect
                attempts++
                attempts_element.textContent = numberWithCommas(attempts) + ' keystrokes';
                time_element.textContent = secondsToDHMS(attempts/keystrokes);
                let new_char = String.fromCharCode(randInt(32, 127)); // random ascii character
                output_str[i] = new_char;
                output_element.textContent = output_str.join('');

                await new Promise(resolve => setTimeout(resolve, delay)); // delay
            }
        } 
                
    } else if (model === "dumb monkey typewriter"){
        let i = 1;
        while (output_str.join('') != input_str) { // while character is incorrect
            let new_char = String.fromCharCode(randInt(32, 127));
            output_str[i] = new_char;
            attempts++
            attempts_element.textContent = numberWithCommas(attempts) + ' keystrokes';
            time_element.textContent = secondsToDHMS(attempts/keystrokes);
            output_element.textContent = output_str.join('');
            if (output_str[i] != input_str[i]){
                i = 0;
                output_str = new Array(input_str.length).fill('');
            } else{
                i += 1;
            }
            await new Promise(resolve => setTimeout(resolve, delay)); // delay
        }
    } else if (model === "highbrow monkey typewriter"){
        let i = 1;
        while (output_str.join('') != input_str) {
            attempts++;
            attempts_element.textContent = numberWithCommas(attempts) + ' keystrokes';
            time_element.textContent = secondsToDHMS(attempts / keystrokes);
            await new Promise(resolve => setTimeout(resolve, delay));
            let new_char = String.fromCharCode(randInt(32, 127));
            for (let i = 0; i < input_str.length; i++) { // iterate through every character in input_str
                output_element.textContent = output_str.join('') + new_char; // update display
                if (new_char == input_str[i] && output_str[i] != new_char) { // if new character is correct and output[i] isn't already correct
                    output_str[i] = new_char; // update
                    new_char = String.fromCharCode(randInt(32, 127)); // new character
                }
            }
        }
        output_element.textContent = output_str.join('');
    }
}
