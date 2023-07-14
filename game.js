function get_computer_choice() {
    let choices = ['rock', 'paper', 'scissors'];
    let random_idx = Math.floor(Math.random() * 3)
    return choices[random_idx]
}

function play_round(player_selection, computer_selection) {
    let win = 'Tied!'; // Default win value

    // Player Wins
    if (player_selection === 'rock' && computer_selection === 'scissors' || 
        player_selection === 'scissors' && computer_selection === 'paper' ||
        player_selection === 'paper' && computer_selection === 'rock'
        ) {
            win = 'Player Wins!';
        }

    // Computer Wins
    else if (computer_selection === 'rock' && player_selection === 'scissors' ||
        computer_selection === 'scissors' && player_selection === 'paper' ||
        computer_selection === 'paper' && player_selection === 'rock'
        ) {
            win = 'Computer Wins!';
        }

    return win;
}

function game(n_games) {
    let player_selection = null;
    let computer_selection = null;
    let player_points = 0;
    let computer_points = 0;
    let i = 0;

    // Update score in index.html
    function update_score() {
        score_element.textContent = "Player: " + player_points + " - Computer: " + computer_points;
    }

    function button_click(event) {
        player_selection = event.target.id;
        computer_selection = get_computer_choice();
        playing_rounds();
    }

    function retry_game() {
        // Reset values
        player_selection = null;
        computer_selection = null;
        player_points = 0;
        computer_points = 0;
        i = 0;
        
        update_score();
        win_element.textContent = "";
        retry_button.style.display = "none"
    
        game(5);
    }

    // Playing the rounds
    function playing_rounds() {
        let round = play_round(player_selection, computer_selection);
        
        // During the round
        if (round === 'Player Wins!') {
            player_points++;
            console.log('Player won round ' + (i + 1) + ' Player: ' + player_points + ' Computer: ' + computer_points);
        }

        else if (round === 'Computer Wins!') {
            computer_points++;
            console.log('Computer won round ' + (i + 1) + ' Player: ' + player_points + ' Computer: ' + computer_points);
        }

        else {
            console.log(round + ' Player: ' + player_points + ' Computer: ' + computer_points);
        }

        update_score();

        i++;

        // After the round is finished
        // Game over
        if (player_points === n_games || computer_points === n_games) { 
            rock_button.removeEventListener('click', button_click);
            paper_button.removeEventListener('click', button_click);
            scissors_button.removeEventListener('click', button_click); 
        }
        // continue playing
        else { 
            rock_button.addEventListener('click', button_click);
            paper_button.addEventListener('click', button_click);
            scissors_button.addEventListener('click', button_click);
            retry_button.addEventListener('click', retry_game);
        }

        // Update win text
        if (player_points === n_games) {
            win_element.textContent = "You won the match!";
            retry_button.style.display = "block"
        }

        else if (computer_points === n_games) {
            win_element.textContent = "Oh no... the computer won the match.";
            retry_button.style.display = "block"
        }

        else {
            win_element.textContent = "";
            retry_button.style.display = "none"
        }
    }

    rock_button.addEventListener('click', button_click);
    paper_button.addEventListener('click', button_click);
    scissors_button.addEventListener('click', button_click);
    retry_button.addEventListener('click', retry_game);
}

const rock_button = document.querySelector('#rock');
const paper_button = document.querySelector('#paper');
const scissors_button = document.querySelector('#scissors');
const retry_button = document.querySelector('#retry')
const score_element = document.querySelector('#score');
const win_element = document.querySelector('#win');

game(5);