'use strict';

export const hoverOnPlay = function ($card) {
  const $cardVideo = $card.querySelector('[data-video]');
  const $cardBadge = $card.querySelector('[data-card-badge]');

  let isPlaying = false;
  let playTimeout;

  $card.addEventListener('pointerover', function () {
    playTimeout = setTimeout(() => {
      $cardBadge.style.display = 'none';

      $cardVideo
        .play()
        .then((res) => {
          isPlaying = true;
        })
        .catch((err) => {
          isPlaying = false;
        });
    }, 500);
  });

  $card.addEventListener('pointerout', function () {
    playTimeout && clearTimeout(playTimeout);

    $card.style.display = 'grid';
    if (isPlaying) $cardVideo.pause();
  });
};
