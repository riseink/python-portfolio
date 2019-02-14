let animateLogo = anime.timeline({
    autoplay: true,
  })

  animateLogo.add({
  targets: '.svg_block_lens path',
  translateY: "100%",
  delay:0,
  duration:0.0000001,
  class:'test',
  })
  .add({
  targets: '.svg_block_art',
  translateX: "-80%",
  delay:0,
  duration:0.0001,
  })
  .add({
  targets: '.svg_block_capture path',
  translateX: ["-100%", 0],
  translateY: ["-100%", 0],
  delay: anime.stagger(100, {direction: 'normal'})
  })
  .add({
  targets: '.svg_block_art path',
  translateX: ['100%', 0],
  translateY: ['100%', 0],
  delay: anime.stagger(100, {direction: 'normal'})
  })
  .add({
  targets: '.svg_block_art',
  translateX: ["-80%", 0],
  delay:100
  })
  .add({
  targets: '.svg_block_lens path',
  translateX: [0],
  translateY: ["100%", 0],
  rotate: [60,0],
  delay: anime.stagger(100, {direction: 'normal'})
  })
  .add({
  targets: '.svg_block_lens',
  rotate: [0,180, 0],
  duration: 1250,
  easing:"easeInOutBack",
  complete: function() {
            var animateLens = anime({
                targets: '#lens1',
                d: [
                    { value: '70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369' },
                ]
            });

            var animateLens1 = anime({
                targets: '.svg_block_lens',
                rotate: [360],
                loop: true,
                autoplay:false,
                easing:"linear",
                duration:600,
            });

            document.querySelector('.svg_container').onmouseover = animateLens.play;
            document.querySelector('.svg_container').onmouseout = animateLens.pause;
          }
  })