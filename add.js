let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');
let track_writer = document.querySelector('.track-writer');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');
let repeat_btn = document.querySelector('.repeat-track')

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    title: 'မဂ်လာႏဒျာႏဗွေႏဩ',
    artist: 'ကာတွန်းစွိုꩻ',
    writer: 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
    coverPath: 'assets/images/logo.jpg',
    discPath: 'assets/music/music1.mp3',
  },
  {
    title: 'ဆုတောင်ꩻနော',
    writer:'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
    artist: 'ခွန်ချို',
    coverPath: 'assets/images/cover4.jpg',
    discPath: 'assets/music/music2.mp3',
  },
  
  {
    title: 'တဖြာꩻတွမ်ႏတဖြာꩻ',
    artist: 'ခွန်ခွန်ကျော်ဦး',
    coverPath: 'assets/images/cover1.jpg',
    discPath: 'assets/music/music3.mp3',
    writer: 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
  },
  {
    title: 'အောဝ်ႏကော့ꩻမွောင်ꩻ',
    artist: 'ခွန်ပျူ',
    coverPath: 'assets/images/cover3.jpg',
    discPath: 'assets/music/music4.mp3',
    writer: 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
  },
  {
    title: 'သေနာႏလဲဥ်း',
    artist: 'ခွန်ပဒဲကော',
    coverPath: 'assets/images/cover5.jpg',
    discPath: 'assets/music/music5.mp3',
    writer: 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
  },
  {
    title: 'အောဝ်ႏ',
    artist: 'ခွန်ခွန်ကျော်ဦး',
    coverPath: 'assets/images/cover1.jpg',
    discPath: 'assets/music/music6.mp3',
    writer: 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
  },
  {
    title: 'လဲဥ်ꩻထိုႏမွန်းခွေꩻ',
    artist: 'ခွန်ကော်လီ',
    coverPath: 'assets/images/cover2.jpg',
    discPath: 'assets/music/music7.mp3',
    writer: 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
  },
  {
    title: 'တဥ်ႏခွေါင်ဒျာႏနော်',
    artist: 'ခွန်ဝဒုတ်',
    coverPath: 'assets/images/cover7.jpg',
    discPath: 'assets/music/music8.mp3',
    writer: 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
  },
  {
    title: 'အွဥ်ႏဖိင်ꩻခန်း ',
    artist: 'ခွန်ချို',
    coverPath: 'assets/images/cover4.jpg',
    discPath: 'assets/music/music9.mp3',
    writer: 'တဲမ်း-ခွန်ပဒဲကော',
  },
  {
    title: 'မွိုက်လွေꩻဟိုင်း',
    artist: 'ခွန်ကျော်စိုး',
    coverPath: 'assets/images/cover8.jpg',
    discPath: 'assets/music/music10.mp3',
    writer: 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
  },
  {
    title: 'ကမ်ူးဒျာႏနာꩻသꩻ',
    artist: 'ခွန်ခွန်ကျော်ဦး',
    coverPath: 'assets/images/cover1.jpg',
    discPath: 'assets/music/music11.mp3',
    writer: 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
  },
  {
    title: 'မဲ့ꩻခွေꩻလွဥ်ꩻယန်း',
    artist: 'ခွန်ပဒဲကော',
    coverPath: 'assets/images/cover5.jpg',
    discPath: 'assets/music/music12.mp3',
    writer: 'တဲမ်း-ခွန်ပဒဲကော',
  },
  {
    title: 'နာꩻထန်ႏထိုꩻ',
    artist: 'ခွန်ဇော်ခက်',
    coverPath: 'assets/images/cover6.jpg',
    discPath: 'assets/music/music13.mp3',
    writer: 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
  },
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].discPath;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].coverPath+ ")";
    track_name.textContent = music_list[track_index].title;
    track_artist.textContent = music_list[track_index].artist;
    track_writer.textContent = music_list[track_index].writer;
    

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
   
}


function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}





