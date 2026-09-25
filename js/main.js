const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


const anchorLinks = document.querySelectorAll(
    'a[href^="#"]'
);

anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        history.replaceState(
            null,
            "",
            targetId
        );
    });
});


const galleryVideos = document.querySelectorAll(
    ".media-item video"
);

const videoObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.play().catch(() => {});
            } else {
                entry.target.pause();
            }

        });

    },
    {
        threshold: 0.25
    }
);

galleryVideos.forEach((video) => {
    videoObserver.observe(video);
});


const musicTracks = document.querySelectorAll(
    ".track"
);

let currentVideoId = null;
let youtubeTimeout = null;


musicTracks.forEach((track) => {

    track.addEventListener("click", (event) => {

        const videoId =
            track.dataset.videoId;

        if (!videoId) {
            return;
        }

        event.preventDefault();

        musicTracks.forEach((item) => {
            item.classList.remove("active");
        });

        track.classList.add("active");

        loadYouTubeVideo(videoId);

        const player =
            document.querySelector(".youtube-player");

        player.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

});


youtubePlayer.addEventListener(
    "load",
    () => {

        clearTimeout(youtubeTimeout);

        if (!currentVideoId) {
            return;
        }

        youtubeFallback.classList.remove("visible");

    }
);


window.addEventListener(
    "scroll",
    () => {

        const header =
            document.querySelector(".site-header");

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    },
    {
        passive: true
    }
);