const rootElement = document.documentElement;
const themeSwitcher = document.getElementById('theme-switcher');
const themeIcon = document.getElementById('themeIcon');
const musicContainer = document.getElementById('music-container');
const audio = document.getElementById('audio');
const title = document.getElementById('music-title');
const cover = document.getElementById('music-cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const player = document.getElementById('player');
const progress = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');

console.log(player);


console.log(playBtn);

const songObj = [
    {
        id: 1,
        songName: 'Kun faya kun',
        artist: 'AR rahaman, Javed',
        musicTime: '6:21'
    },

    {
        id: 2,
        songName: 'Ae Ajnabi',
        artist: 'U. narayan, mahalakshmi',
        musicTime: '5:39'
    },

    {
        id: 3,
        songName: 'Pehla nasha',
        artist: 'U narayan, S. sargam',
        musicTime: '4:17'
    },
    {
        id: 4,
        songName: 'Chand sifarish',
        artist: 'Jatin-Lalit, Shaan',
        musicTime: '4:37'
    },
    {
        id: 5,
        songName: 'Ek ladki ko dekha',
        artist: 'Kumar sanu',
        musicTime: '4:18'
    },
    {
        id: 6,
        songName: 'Mere mehboob',
        artist: 'Kishore kumar',
        musicTime: '4:33'
    },
    {
        id: 7,
        songName: 'Main hoon na',
        artist: 'Sonu nigam, S. Ghosal',
        musicTime: '5:56'
    },
    {
        id: 8,
        songName: 'Main yahan hoon',
        artist: 'M. mohan, U. narayan',
        musicTime: '4:57'
    },
    {
        id: 9,
        songName: 'Bholi si surat',
        artist: 'Lata, U. narayan',
        musicTime: '4:13'
    },
    {
        id: 10,
        songName: 'Mere hath main',
        artist: 'Sonu N., Sundhi C.',
        musicTime: '4:43'
    },
]

// song duration
let songLength;

// Song Itrating

songObj.forEach(key => {

    musicContainer.innerHTML += `
    <div class="music-container__list" onclick="selectSong(${key.id})" >
    <div class="music-details">
      <div class="music-thump__data">
        <small class="number" id="number">${key.id}</small>
        <img
          width="100"
          height="100"
          src="./Asset/Images/${key.songName}.jpg"
          alt="cover image"
        />
        <div class="music-info">
          <p class="music-title">${key.songName}</p>
          <p class="music-bio">${key.artist}</p>
        </div>
      </div>
      <div class="minutes">${key.musicTime}</div>
    </div>
  </div> 
    `
})

// Select music
let index = songObj.length - 1;

function selectSong(id) {
   
    songObj.some((entry, i) => {
        if(entry.id === id) {
            index = i;
        }
    })
    player.classList.add('playing')
    loadSong(index)
    playSong()
}

// prev song
function prevSong() {
    index--;

    if(index < 0) {
        index = songObj.length - 1
    }
    
    loadSong(index);
  
    playSong();
}

// next song
function nextSong() {
    index++;
  
if(index > songObj.length - 1) {
    index = 0
}

    loadSong(index);
  
    playSong();
  }
  

// play song function
function playSong() {
    
    musicContainer.classList.add("play");
    playBtn.querySelector("i.far").classList.remove("fa-play-circle");
    playBtn.querySelector("i.far").classList.add("fa-pause-circle");
      
    audio.play();
    songLength = audio.duration
   
}

// pause song function
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.far").classList.add("fa-play-circle");
    playBtn.querySelector("i.far").classList.remove("fa-pause-circle");
    audio.pause();
}

// loadSong
function loadSong(index) {
   title.innerText = songObj[index].songName;
   audio.src = `./Asset/Audio/${songObj[index].songName}.mp3`;
   cover.src = `./Asset/Images/${songObj[index].songName}.jpg`;
}

// event listener
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains("play");
   

    if(isPlaying) {
        pauseSong()
    }else {
        playSong()
    }
})

// update progress
function updateProgress(e) {
    let { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    if(duration === currentTime) {
        nextSong()
    }
}

// set progress bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration
    console.log(duration);
  
    audio.currentTime = (clickX / width) * duration;
   
}

// Theme switcher
themeSwitcher.addEventListener('click', () => {
    rootElement.classList.toggle('dark');
    themeIcon.classList.toggle('fa-sun');
})

// prev song 
prevBtn.addEventListener('click', prevSong)

// next song
nextBtn.addEventListener('click', nextSong)

// Time of song
audio.addEventListener('timeupdate', updateProgress)

//click progressBar
progress.addEventListener('click', setProgressBar)
