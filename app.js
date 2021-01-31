const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
const playpause = document.querySelector('.play-pause');
const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.artist-name');
const songImage = document.querySelector('.artist-image');
const audio = document.querySelector('audio');
const playTime = document.querySelector('.play-time');
const totalTime = document.querySelector('.total-time');
const source = document.querySelector('source');
const slider = document.querySelector('input');

const songs = [
    {name: "In My Feelings", artist: "Drake", image: "images/drake.jpg", song: "media/imf.flac"},
    {name: "Bitterlove", artist: "Ardhito Pramono", image: "images/ardhito.jpg", song: "media/bitterlove.flac"},
    {name: "At My Worst", artist: "Pink Sweat$", image: "images/pinksweat.jpg", song: "media/amw.flac"}
];

var currentIndex = 0;
var totalSong = songs.length;
var playing;

function loadTrack(index) {
    slider.value = 0;
    songName.innerText = songs[index].name;
    artistName.innerText = songs[index].artist;
    songImage.style.backgroundImage = `url(${songs[index].image})`;
    audio.src = songs[index].song;
    audio.onloadedmetadata = function() {
        let minute = Math.floor(audio.duration / 60);
        let second = Math.ceil(audio.duration % 60);
        totalTime.innerText = `${minute}:${second}`;
    }
}

function playPause() {
    var timer;
    if (playing != true) {
        audio.play();
        playing = true;
        playpause.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
        timer = setInterval(function() {
        if (slider.value == 100) {
            setTimeout(nextTrack(), 2000);
        }
        slider.value = (audio.currentTime * 100) / audio.duration;
        var currentMinute = Math.floor(audio.currentTime / 60);
        var currentSecond = Math.ceil(audio.currentTime % 60);
        if (currentSecond < 10) {
            playTime.innerText = `${currentMinute}:0${currentSecond}`;
        } else {
            playTime.innerText = `${currentMinute}:${currentSecond}`;
        }
        }, 1000)

    } else {
        audio.pause();
        playing = false;
        playpause.innerHTML = '<i class="fa fa-play play-transform" aria-hidden="true"></i>';
        clearInterval(timer);
    }
}

function playSong() {
    setTimeout(loadTrack(currentIndex), 2000);
    audio.play();
    playing = true;
    playpause.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

function nextTrack() {
    if (currentIndex < totalSong-1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    playSong();
    playTime.innerText = "0:00";
}

function previousTrack() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalSong-1;
    }
    playSong();
    playTime.innerText = "0:00";
}

function changeDuration() {
    slider_position = audio.duration * (slider.value / 100);
    audio.currentTime = slider_position;
}
