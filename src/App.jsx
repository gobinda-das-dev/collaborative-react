import React, { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import data from '/data.json'

const App = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [crrScroll, setCrrScroll] = useState(0);
  const [prevCrrScroll, setPrevCrrScroll] = useState(crrScroll);
  const [monitor, setMonitor] = useState(0);
  const [isIntroCompleted, setIsIntroCompleted] = useState(false);
  const headings = useRef(null);
  const countRef = useRef(null);
  const subHeadingRef = useRef(null);
  const hoverRef = useRef(null);
  const cardContainerRef = useRef(null);
  const loaderCounterRef = useRef(null);

  // Enter Animation
  useGSAP(() => {
    splitHeading(headings.current);
    const imgs = document.querySelectorAll('.card-section .img-con img');
    const enterTl = gsap.timeline({
      defaults: {
        duration: 1.5,
        ease: 'power4.inOut'
      }
    });

    enterTl
      .from('.loader', {
        id: "loader",
        onUpdate: () => {
          const p = gsap.getById('loader').progress();
          const pg = Math.round(gsap.utils.mapRange(0, 1, 0, 100, p));
          loaderCounterRef.current.textContent = pg;
        }
      }, '+=0.5')
      .from('.loader div', { width: 0 }, '<+0.5')
      .to('.loader', { opacity: 0, duration: 0.5 })
      .set('.loader', { display: 'none' })
      .fromTo(imgs[0], {
        filter: 'saturate(0)',
      }, {
          filter: 'saturate(1)',
      })
      .from('.card-section .img-con',  {
        height: '25vh',
        scaleX: 0.75
      }, '<+0.3')
      .from(imgs[0], {
        height: '85vh',
        yPercent: -15,
        scaleX: 1.3,
        onComplete: () => setIsIntroCompleted(true)
      }, '<')
      .to('.background div', { height: 0 }, '<-1')
      .set('.card-section .img-con', { overflow: 'visible' })
      .from('.heading span', {
        yPercent: 100,
        opacity: 0,
        stagger: 0.1
      })
      .from([imgs[1], imgs[2]], { transform: 'translate(0, -50%)' }, '<')
      .from('.date span', { yPercent: 100 }, '<')
      .from('nav, .h-text', { opacity: 0 }, '<')
  }, { scope: cardContainerRef.current })

  // For ScrollAnimation
  useEffect(() => {
    if(!isIntroCompleted) return;
    const imgs = document.querySelectorAll('.card-section .img-con img');
    const handleWheel = (d) => {
      if (isAnimating) return;

      setIsAnimating(true);
      const floatTl = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });
      const { wheelDelta: wD } = d;

      if (wD > 0) {
        splitHeading(headings.current);
        changeCount('-')

        floatTl
          .to('.date span', { yPercent: -100 })
          .to([imgs[1], imgs[2]], {
            rotation: 0,
            opacity: 0.3,            
            transform: 'translate(0%, -50%)',
            duration: 0.7,
            ease: "power2.inOut",
            }, '<')
          .to('.card-section .img-con', {
              top: '100%',
              opacity: 0.5,
              transform: 'translate(-50%, 0)',
              duration: 1.5,
              ease: "power4.inOut",
          }, '-=0.5')
          .to('.heading span', {
            yPercent: 100,
            duration: 1,
            opacity: .3,
            ease: 'power1.in',
            stagger: 0.1,
            onComplete: () => setMonitor(Math.random())
          }, '<')

          .set('.card-section .img-con', { top: 0, transform: 'translate(-50%, -100%)' })
          .set('.date span', { yPercent: 100 })


          .to('.card-section .img-con', {
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 1,
            duration: 1.5,
            ease: "power4.inOut",
          }, '<')
          .to(imgs[1], {
            rotation: '-20deg',
            transform: 'translate(-50%, -50%)',
            top: "55%",
            opacity: 1,
            duration: 0.7,
            ease: "power2.inOut",
          }, '-=0.7')
          .to(imgs[2], {
            rotation: '20deg',
            transform: 'translate(50%, -50%)',
            top: "45%",
            opacity: 1,
            duration: 0.7,
            ease: "power2.inOut",
          }, '<')
          .to('.date span', {
            yPercent: 0,
            duration: .7
          }, '<+0.1')
      } else {
        splitHeading(headings.current);
        changeCount('+');

        floatTl
          .to('.date span', { yPercent: -100 })
          .to([imgs[1], imgs[2]], {
            rotation: 0,
            opacity: 0.3,
            transform: 'translate(0%, -50%)',
            duration: 0.7,
            ease: "power2.inOut",
            }, '<')
          .to('.card-section .img-con', {
              top: 0,
              opacity: 0.5,
              transform: 'translate(-50%, -100%)',
              duration: 1.5,
              ease: "power4.inOut",
          }, '-=0.5')
          .to('.heading span', {
            yPercent: -100,
            duration: 1,
            opacity: .3,
            stagger: 0.1,
            onComplete: () => setMonitor(Math.random())
          }, '<')


          .set('.card-section .img-con', { top: '100%', transform: 'translate(-50%, 0)' })
          .set('.date span', { yPercent: 100 })


          .to('.card-section .img-con', {
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 1,
            duration: 1.5,
            ease: "power4.inOut",
          }, '<')
          .to(imgs[1], {
            rotation: '-20deg',
            transform: 'translate(-50%, -50%)',
            top: "55%",
            opacity: 1,
            duration: 0.7,
            ease: "power2.inOut",
          }, '-=0.7')
          .to(imgs[2], {
            rotation: '20deg',
            transform: 'translate(50%, -50%)',
            top: "45%",
            opacity: 1,
            duration: 0.7,
            ease: "power2.inOut",
          }, '<')
          .to('.date span', {
            yPercent: 0,
            duration: .7
          }, '<+0.1');
      }
    };

    const hoverTl = gsap.timeline({paused: true, defaults: {ease: 'power3.inOut'}});
    hoverTl
      .to(imgs[0], { scale: 1.03 }, 0)
      .to(imgs[1], {
        rotate: -10,
        transform: 'translate(-40%, -55%)',
      }, 0)
      .to(imgs[2], {
        rotate: 10,
        transform: 'translate(40%, -55%)',
      }, 0)

    const handleMouseEnter = () => {
      if (isAnimating) return;
      hoverTl.play()
    }
    const handleMouseLeave = () => {
      if (isAnimating) return;
      hoverTl.reverse()
    }

    
    window.addEventListener('wheel', handleWheel);
    hoverRef.current.addEventListener('mouseenter', handleMouseEnter)
    hoverRef.current.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('wheel', handleWheel);
      hoverRef.current.removeEventListener('mouseenter', handleMouseEnter)
      hoverRef.current.removeEventListener('mouseleave', handleMouseLeave)
    };
  }, [isAnimating, crrScroll, isIntroCompleted]);

  // To Change Progress
  useGSAP(() => {
    if(!isIntroCompleted) return;
    gsap.to(countRef.current, {
      yPercent: -100 * crrScroll,
      ease: 'back'
    })
  }, [crrScroll, isIntroCompleted]);

  // To Change Data
  useEffect(() => {
    if(!isIntroCompleted) return;
    const imgs = document.querySelectorAll('.card-section .img-con img');
    imgs[0].src = data[crrScroll].imgs[0];
    imgs[1].src = data[crrScroll].imgs[1];
    imgs[2].src = data[crrScroll].imgs[2];

    headings.current.textContent = data[crrScroll].heading;
    splitHeading(headings.current);
    const hoi = prevCrrScroll > crrScroll;
    if((prevCrrScroll === 2 && crrScroll === 0) || (prevCrrScroll === 0 && crrScroll === 2)) {
      gsap.from('.heading span', {
        yPercent: !hoi ? -100 : 100,
        duration: 1,
        opacity: 1,
        stagger: 0.1
      })
    } else {
      gsap.from('.heading span', {
        yPercent: hoi ? -100 : 100,
        duration: 1,
        opacity: 1,
        stagger: 0.1
      })
    }
    

    subHeadingRef.current.textContent = data[crrScroll].subTitle;

    setPrevCrrScroll(crrScroll);
  }, [monitor, isIntroCompleted]);

  function splitHeading(headings) {
    const heading = headings;
    const chars = heading.textContent.split('');
    heading.textContent = '';
    chars.forEach((char) => {
      const span = document.createElement('span');
      gsap.set(span, { display: 'block', pointerEvents: 'none' })
      span.textContent = char;
      heading.appendChild(span);
    });
  }

  function changeCount(option) {
    setCrrScroll(prev => (option === '+' ? (prev < 2 ? ++prev : 0) : (prev > 0 ? --prev : 2)));
  }

  return (
    <main>
      <Navbar />
      <p className="h-text rotate-90 fixed top-[10%] left-[76%] z-10 opacity-[0.5] text-lg flex h-7 overflow-hidden">
        <span ref={countRef} className='flex flex-col'>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </span>
        <span>&nbsp;────&nbsp;</span>
        <span>3</span>
      </p>
      <div ref={cardContainerRef} className='card-section w-full h-screen bg-[#f6eee3] relative'>
        <div className="img-con overflow-hidden pointer-events-none h-[85vh] w-[30vw] fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img className='w-full h-full object-cover' style={{objectPosition: '50% 20%'}} src="https://images.prismic.io/cusp/43da11bd-03f5-426f-804b-c79112adf8a3_sprout.jpg?auto=compress,format" />

          <img className='w-1/2 h-1/2 object-cover absolute -z-10 left-0 -translate-x-1/2 top-[55%] -translate-y-1/2 -rotate-[20deg]' src="https://images.prismic.io/cusp/48913ed9-381d-4479-b04a-5237fe136c15_sprout-l.jpg?auto=compress,format" alt="" />
          <img className='w-1/2 h-1/2 object-cover absolute -z-10 right-0 translate-x-1/2 top-[45%] -translate-y-1/2 rotate-[20deg]' src="https://images.prismic.io/cusp/8dbf3f4c-f6ac-4072-9b4e-b4297a29c711_sprout-r.jpg?auto=compress,format" alt="" />

          <p className='date overflow-hidden text-sm absolute top-[13%] -translate-x-[150%] rotate-90 opacity-[0.5]'>
            <span ref={subHeadingRef} className='block w-14 text-base text-center'>Champion 2020</span> 
          </p>
        </div>

        <div ref={hoverRef} className="title-con fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          <h1 ref={headings} className='heading whitespace-nowrap leading-none overflow-hidden text-[22vw] uppercase font-thin text-[#f33a3a] flex'>SPROUT</h1>
        </div>

        <div className='background fixed h-screen w-full flex flex-col justify-between'>
          <div className='w-full h-1/2 bg-black'></div>
          <div className='w-full h-1/2 bg-black'></div>
        </div>

        <div className="loader fixed z-20 top-1/2 translate-y-[15vh] left-1/2 -translate-x-1/2 text-white text-2xl gap-[1vw] w-1/2 flex items-center">
          <span>0</span>
          <div className='w-full h-[2px] bg-white'></div>
          <span ref={loaderCounterRef}>100</span>
        </div>
      </div>
    </main>
  );
};

export default App;