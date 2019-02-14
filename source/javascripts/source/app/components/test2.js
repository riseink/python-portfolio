let animateLogo = anime.timeline({
    autoplay: true,
  })

  animateLogo.add({
  targets: '.svg_block_lens polygon',
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
  targets: '.svg_block_lens polygon',
  translateX: [0],
  translateY: ["100%", 0],
  rotate: [60,0],
  delay: anime.stagger(100, {direction: 'normal'})
  })
  .add({
    targets: '#lens1',
    points: [
        { value: '18.2,7 40.1,25 1,52.2 1.6,32.5' },
        { value: '18.2,7 41.8,35.3 1,52.2 1.6,32.5' },
        { value: '18.2,7 40.1,25 1,52.2 1.6,32.5' },

    ],
    easing: 'easeOutElastic',
    duration: 1000,
    delay:0,

  })
  .add({
    targets: '#lens2',
    points: [
        { value: '20.4,5.7 58.1,36.4 67.4,9 47.3,0.4' },
        { value: '20.4,5.7 47.8,39.7 67.5,8.4 47.3,0.4' },
        { value: '20.4,5.7 58.1,36.4 67.4,9 47.3,0.4' },

    ],
    easing: 'easeOutElastic',
    duration: 1000,
    delay:0,
  },'-=1000')
  .add({
    targets: '#lens3',
    points: [
        { value: '69.3,10.1 53.9,56.6 81.6,56.6 82.5,33.4' },
        { value: '69.3,10.1 45.5,46.7 81.6,56.6 82.5,33.4' },
        { value: '69.3,10.1 53.9,56.6 81.6,56.6 82.5,33.4' },

    ],
    easing: 'easeOutElastic',
    duration: 1000,
    delay:0,

  },'-=1000')
  .add({
    targets: '#lens4',
    points: [
        { value: '80.7,59 32.6,59 40.2,84.1 62.4,79.3' },
        { value: '80.7,59 38.1,46.7 40.2,84.1 62.4,79.3' },
        { value: '80.7,59 32.6,59 40.2,84.1 62.4,79.3' },

    ],
    easing: 'easeOutElastic',
    duration: 1000,
    delay:0,

  },'-=1000')
  .add({
    targets: '#lens5',
    points: [
        { value: '37.8,83.6 24.4,39.3 1.6,54.4 12,71.5' },
        { value: '37.8,83.6 35.8,40.3 1.6,54.4 12,71.5' },
        { value: '37.8,83.6 24.4,39.3 1.6,54.4 12,71.5' },

    ],
    easing: 'easeOutElastic',
    duration: 1000,
    delay:0,

  },'-=1000')
  .add({
    
    complete: function() {

              let animateLens1 = anime({
			      targets: '#lens1',
			      points: [
			          { value: '18.2,7 40.1,25 1,52.2 1.6,32.5' },
			          { value: '18.2,7 41.8,35.3 1,52.2 1.6,32.5' },
			          { value: '18.2,7 40.1,25 1,52.2 1.6,32.5' },

			      ],
			      easing: 'easeOutElastic',
			      duration: 1000,
			      delay:0,
				  loop:false,
				  
              });
			  
              let animateLens2 = anime({
			      targets: '#lens2',
			      points: [
			          { value: '20.4,5.7 58.1,36.4 67.4,9 47.3,0.4' },
			          { value: '20.4,5.7 47.8,39.7 67.5,8.4 47.3,0.4' },
			          { value: '20.4,5.7 58.1,36.4 67.4,9 47.3,0.4' },

			      ],
			      easing: 'easeOutElastic',
			      duration: 1000,
			      delay:0,
				  loop:false,
				  
              });
			  
              let animateLens3 = anime({
			      targets: '#lens3',
			      points: [
			          { value: '69.3,10.1 53.9,56.6 81.6,56.6 82.5,33.4' },
			          { value: '69.3,10.1 45.5,46.7 81.6,56.6 82.5,33.4' },
			          { value: '69.3,10.1 53.9,56.6 81.6,56.6 82.5,33.4' },

			      ],
			      easing: 'easeOutElastic',
			      duration: 1000,
			      delay:0,
				  loop:false,
				  
              });
			  
              let animateLens4 = anime({
			      targets: '#lens4',
			      points: [
			          { value: '80.7,59 32.6,59 40.2,84.1 62.4,79.3' },
			          { value: '80.7,59 38.1,46.7 40.2,84.1 62.4,79.3' },
			          { value: '80.7,59 32.6,59 40.2,84.1 62.4,79.3' },

			      ],
			      easing: 'easeOutElastic',
			      duration: 1000,
			      delay:0,
				  loop:false,
				  
              });
			  
              let animateLens5 = anime({
			      targets: '#lens5',
			      points: [
			          { value: '37.8,83.6 24.4,39.3 1.6,54.4 12,71.5' },
			          { value: '37.8,83.6 35.8,40.3 1.6,54.4 12,71.5' },
			          { value: '37.8,83.6 24.4,39.3 1.6,54.4 12,71.5' },

			      ],
			      easing: 'easeOutElastic',
			      duration: 1000,
			      delay:0,
				  loop:false,
				  
              });

              document.querySelector('.svg_container').onmouseover = function(){
				  animateLens1.play();
				  animateLens2.play();
				  animateLens3.play();
				  animateLens4.play();
				  animateLens5.play();
				  
              };

              document.querySelector('.svg_container').onmouseout = function(){
				  animateLens1.pause();
				  animateLens2.pause();
				  animateLens3.pause();
				  animateLens4.pause();
				  animateLens5.pause();
				  
              }
        }
    })
 