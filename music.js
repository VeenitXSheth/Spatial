window.addEventListener('load', function() {

    const userPath = document.referrer;

    if (!userPath || userPath === '') {
        location.href = 'https://spatial.veenitxs.repl.co/join';
    } else {
        console.log('user allowed!');
    };
    
});

const songs = ["Repeat It", "Pop Out", "Blinding Lights", "Dance Monkey", "Shape Of You", "Someone You Loved", "Rockstar"];
const artists = ["Lil Tecca", "Polo G", "The Weekend", "Tones And I", "Ed Sheeran", "Lewis Capaldi", "Post Malone", "21 Savage"];

const RepeatItPlayer = document.querySelector('.player-repeat-it');
const PopOutPlayer = document.querySelector('.player-pop-out');

const searchbar = document.querySelector('input');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', function() {

    term = searchbar.value;

    for (let i = 0; i < songs.length; i++) {
        if (songs[i] === term) {
            const players = document.getElementById('player');
            const termPlayer = document.querySelector(`.player-${term}`);

            players.style.display = 'none';
            termPlayer.style.display = 'flex';
            
        }
    }
    
});

async function authUser() {

    const url = 'https://spatial.veenitxs.repl.co/music'
    const res = await fetch(url,
    {
        method: 'GET',
    })
    console.log(res);
};

window.addEventListener('load', function() {

    authUser()
        
})


