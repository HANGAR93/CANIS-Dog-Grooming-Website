/* =========================================================
   CANIS
   SCROLLYTELLING ENGINE
========================================================= */

gsap.registerPlugin(ScrollTrigger);


/*
 * Evita que Safari/iOS recalibre continuamente los
 * ScrollTriggers cuando aparece o desaparece la barra
 * del navegador durante el scroll.
 */
ScrollTrigger.config({
    ignoreMobileResize: true
});



/* =========================================================
   HELPERS
========================================================= */

const $ = (selector, scope = document) =>
    scope.querySelector(selector);


const $$ = (selector, scope = document) =>
    Array.from(scope.querySelectorAll(selector));



/* =========================================================
   RESPONSIVE UTILITIES
========================================================= */

const getSceneSize = () => {

    const vw =
        window.innerWidth;

    const vh =
        window.innerHeight;


    /*
     * PROPORCIÓN BASE
     * 720 × 660
     */

    const ratio =
        660 / 720;


    let width;


    if (vw <= 600) {

        width =
            vw * .98;

    } else {

        width =
            Math.min(
                720,
                vw * .59
            );

    }


    /*
     * Evita que una pantalla muy baja
     * deforme la escena.
     */

    const maxHeight =
        vh * .74;


    let height =
        width * ratio;


    if (height > maxHeight) {

        height =
            maxHeight;

        width =
            height / ratio;

    }


    return {
        width,
        height
    };

};



/* =========================================================
   CURSOR
========================================================= */

const cursor =
    $(".cursor");


const follower =
    $(".cursor-follower");


if (
    cursor &&
    follower &&
    window.matchMedia("(pointer:fine)").matches &&
    window.innerWidth > 900
) {

    let mouseX = 0;
    let mouseY = 0;

    let followerX = 0;
    let followerY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            gsap.to(
                cursor,
                {

                    x:
                        mouseX,

                    y:
                        mouseY,

                    duration:
                        .08,

                    overwrite:
                        true

                }
            );

        }
    );


    gsap.ticker.add(
        () => {

            followerX +=
                (
                    mouseX -
                    followerX
                ) * .13;


            followerY +=
                (
                    mouseY -
                    followerY
                ) * .13;


            gsap.set(
                follower,
                {

                    x:
                        followerX - 15,

                    y:
                        followerY - 15

                }
            );

        }
    );


    $$("a").forEach(
        link => {

            link.addEventListener(
                "mouseenter",
                () => {

                    gsap.to(
                        follower,
                        {

                            scale:
                                1.7,

                            borderColor:
                                "rgba(101,152,137,.6)",

                            duration:
                                .25,

                            ease:
                                "power2.out"

                        }
                    );

                }
            );


            link.addEventListener(
                "mouseleave",
                () => {

                    gsap.to(
                        follower,
                        {

                            scale:
                                1,

                            borderColor:
                                "rgba(41,68,93,.35)",

                            duration:
                                .25,

                            ease:
                                "power2.out"

                        }
                    );

                }
            );

        }
    );

}



/* =========================================================
   HERO INTRO
========================================================= */

const heroTimeline =
    gsap.timeline({

        defaults: {

            ease:
                "power3.out"

        }

    });


heroTimeline

    .from(
        ".site-header",
        {

            y:
                -40,

            opacity:
                0,

            duration:
                .8

        }
    )

    .from(
        ".hero-image",
        {

            clipPath:
                "inset(0 0 100% 0)",

            duration:
                1.0,

            ease:
                "power4.inOut"

        },
        .1
    )

    .from(
        ".hero-kicker",
        {

            y:
                30,

            opacity:
                0,

            duration:
                .6

        },
        "-=.3"
    )

    .from(
        ".hero-title span",
        {

            y:
                80,

            opacity:
                0,

            stagger:
                .12,

            duration:
                1

        },
        "-=.2"
    )

    .from(
        ".hero-subtitle",
        {

            y:
                25,

            opacity:
                0,

            duration:
                .6

        },
        "-=.6"
    )

    .from(
        ".hero-brand",
        {

            y:
                20,

            opacity:
                0,

            duration:
                .6

        },
        "-=.45"
    )

    .from(
        ".hero-description",
        {

            y:
                20,

            opacity:
                0,

            duration:
                .6

        },
        "-=.4"
    )

    .from(
        ".hero-button",
        {

            y:
                20,

            opacity:
                0,

            duration:
                .5

        },
        "-=.35"
    )

    .from(
        ".hero-location",
        {

            y:
                15,

            opacity:
                0,

            duration:
                .5

        },
        "-=.25"
    )

    .from(
        ".hero-badge",
        {

            scale:
                0,

            rotation:
                -20,

            opacity:
                0,

            duration:
                .7,

            ease:
                "back.out(1.7)"

        },
        "-=.7"
    );



/* =========================================================
   HERO PARALLAX
========================================================= */

gsap.to(
    ".hero-image img",
    {

        yPercent:
            12,

        ease:
            "none",

        scrollTrigger: {

            trigger:
                ".hero",

            start:
                "top top",

            end:
                "bottom top",

            scrub:
                true

        }

    }
);


gsap.to(
    ".hero-content",
    {

        y:
            -100,

        opacity:
            .2,

        ease:
            "none",

        scrollTrigger: {

            trigger:
                ".hero",

            start:
                "top top",

            end:
                "70% top",

            scrub:
                true

        }

    }
);


gsap.to(
    ".hero-badge",
    {

        y:
            120,

        rotation:
            25,

        ease:
            "none",

        scrollTrigger: {

            trigger:
                ".hero",

            start:
                "top top",

            end:
                "bottom top",

            scrub:
                true

        }

    }
);



/* =========================================================
   MANIFESTO — CINEMATIC SCROLL
========================================================= */

const manifesto =
    document.querySelector(
        ".manifesto"
    );


if (manifesto) {

    const manifestoLines =
        manifesto.querySelectorAll(
            ".manifesto-title .line"
        );


    gsap.set(
        manifestoLines[0],
        {

            x:
                "-5vw",

            opacity:
                0

        }
    );


    gsap.set(
        manifestoLines[1],
        {

            x:
                "5vw",

            opacity:
                0

        }
    );


    gsap.set(
        manifestoLines[2],
        {

            y:
                35,

            opacity:
                0

        }
    );


    const manifestoTimeline =
        gsap.timeline({

            scrollTrigger: {

                trigger:
                    manifesto,

                start:
                    "top 75%",

                end:
                    "bottom 35%",

                scrub:
                    1.2

            }

        });


    manifestoTimeline

        .to(
            manifestoLines[0],
            {

                x:
                    0,

                opacity:
                    1,

                duration:
                    1

            }
        )

        .to(
            manifestoLines[1],
            {

                x:
                    0,

                opacity:
                    1,

                duration:
                    1

            },
            "-=.55"
        )

        .to(
            manifestoLines[2],
            {

                y:
                    0,

                opacity:
                    1,

                duration:
                    1.15

            },
            "-=.45"
        );

}



/* =========================================================
   VALUES
========================================================= */

const valuesSection =
    document.querySelector(
        ".values-section"
    );


if (valuesSection) {

    const valuesIntro =
        valuesSection.querySelector(
            ".values-intro"
        );


    const valueItems =
        valuesSection.querySelectorAll(
            ".value-item"
        );


    if (
        valuesIntro &&
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined"
    ) {

        gsap.from(
            valuesIntro,
            {

                y:
                    55,

                opacity:
                    0,

                duration:
                    1,

                ease:
                    "power3.out",

                scrollTrigger: {

                    trigger:
                        valuesSection,

                    start:
                        "top 80%",

                    toggleActions:
                        "play none none reverse"

                }

            }
        );

    }


    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined"
    ) {

        valueItems.forEach(
            (item, index) => {

                gsap.from(
                    item,
                    {

                        y:
                            35,

                        opacity:
                            0,

                        duration:
                            .8,

                        delay:
                            index * .07,

                        ease:
                            "power3.out",

                        scrollTrigger: {

                            trigger:
                                item,

                            start:
                                "top 90%",

                            toggleActions:
                                "play none none reverse"

                        }

                    }
                );

            }
        );

    }


    if (
        typeof gsap !== "undefined"
    ) {

        valueItems.forEach(
            (item, index) => {

                const icon =
                    item.querySelector(
                        ".value-icon"
                    );


                if (!icon) {

                    return;

                }


                gsap.to(
                    icon,
                    {

                        y:
                            index % 2 === 0
                                ? -3
                                : 3,

                        duration:
                            3 +
                            index * .15,

                        ease:
                            "sine.inOut",

                        repeat:
                            -1,

                        yoyo:
                            true

                    }
                );

            }
        );


        valueItems.forEach(
            (item, index) => {

                const orbit =
                    item.querySelector(
                        ".value-orbit"
                    );


                if (!orbit) {

                    return;

                }


                gsap.to(
                    orbit,
                    {

                        rotation:
                            index % 2 === 0
                                ? 360
                                : -360,

                        duration:
                            20 +
                            index * 2,

                        ease:
                            "none",

                        repeat:
                            -1

                    }
                );

            }
        );

    }

}



/* =========================================================
   SERVICES
========================================================= */

const services =
    document.querySelector(
        ".services"
    );


if (services) {

    const servicesHeader =
        services.querySelector(
            ".services-header"
        );


    const serviceCards =
        services.querySelectorAll(
            ".service-card"
        );


    const priceNote =
        services.querySelector(
            ".price-note"
        );


    if (servicesHeader) {

        gsap.from(
            servicesHeader,
            {

                opacity:
                    0,

                y:
                    35,

                duration:
                    1,

                ease:
                    "power3.out",

                scrollTrigger: {

                    trigger:
                        services,

                    start:
                        "top 75%",

                    toggleActions:
                        "play none none reverse"

                }

            }
        );

    }


    if (serviceCards.length) {

        gsap.from(
            serviceCards,
            {

                opacity:
                    0,

                scale:
                    .96,

                stagger:
                    .10,

                duration:
                    .75,

                ease:
                    "power2.out",

                scrollTrigger: {

                    trigger:
                        ".service-stack",

                    start:
                        "top 78%",

                    toggleActions:
                        "play none none reverse"

                }

            }
        );


        ScrollTrigger.create({

            trigger:
                ".service-stack",

            start:
                "top 78%",

            once:
                true,

            onEnter:
                () => {

                    gsap.to(
                        serviceCards,
                        {

                            scale:
                                1.012,

                            duration:
                                .18,

                            stagger:
                                .08,

                            ease:
                                "power2.out",

                            onComplete:
                                () => {

                                    gsap.to(
                                        serviceCards,
                                        {

                                            scale:
                                                1,

                                            duration:
                                                .42,

                                            stagger:
                                                .08,

                                            ease:
                                                "elastic.out(1, .55)"

                                        }
                                    );

                                }

                        }
                    );

                }

        });

    }


    if (priceNote) {

        gsap.from(
            priceNote,
            {

                opacity:
                    0,

                y:
                    15,

                duration:
                    .8,

                ease:
                    "power2.out",

                scrollTrigger: {

                    trigger:
                        priceNote,

                    start:
                        "top 90%",

                    toggleActions:
                        "play none none reverse"

                }

            }
        );

    }

}



/* =========================================================
   TRANSFORMATION — 6 STEP PHOTO SEQUENCE
========================================================= */

const transformation =
    $(".transformation");


if (transformation) {

    const sequence =
        $(".dog-sequence", transformation);


    const camera =
        $(".dog-camera", transformation);


    const scene =
        $(".dog-scene", transformation);



    /* =====================================================
       SIX SHOTS
    ===================================================== */

    const shots = [

        $(".dog-shot-01", transformation),

        $(".dog-shot-02", transformation),

        $(".dog-shot-03", transformation),

        $(".dog-shot-04", transformation),

        $(".dog-shot-05", transformation),

        $(".dog-shot-06", transformation)

    ];



    /* =====================================================
       IMAGES
    ===================================================== */

    const images = [

        $(".dog-shot-01 img", transformation),

        $(".dog-shot-02 img", transformation),

        $(".dog-shot-03 img", transformation),

        $(".dog-shot-04 img", transformation),

        $(".dog-shot-05 img", transformation),

        $(".dog-shot-06 img", transformation)

    ];



    /* =====================================================
       RESPONSIVE SCENE
    ===================================================== */

    let currentSceneScale =
        1;


    let currentPhotoLift =
        0;


    const syncSceneSize = () => {

        const size =
            getSceneSize();


        gsap.set(
            scene,
            {

                width:
                    size.width,

                height:
                    size.height

            }
        );


        currentSceneScale =
            size.width / 720;


        /*
         * MISMO PUNTO DE REFERENCIA
         * PARA TODOS LOS DISPOSITIVOS.
         *
         * No depende de la altura del móvil.
         */

        currentPhotoLift =
            30 *
            currentSceneScale;


        const beforeOffset =
            20 *
            currentSceneScale;



        /* =================================================
           FOTOS 1 · 2 · 3
        ================================================= */

        gsap.set(
            images[0],
            {

                y:
                    -currentPhotoLift +
                    beforeOffset

            }
        );


        gsap.set(
            images[1],
            {

                y:
                    -currentPhotoLift +
                    beforeOffset

            }
        );


        gsap.set(
            images[2],
            {

                y:
                    -currentPhotoLift +
                    beforeOffset

            }
        );



        /* =================================================
           FOTOS 4 · 5 · 6
        ================================================= */

        gsap.set(
            images[3],
            {

                y:
                    -currentPhotoLift

            }
        );


        gsap.set(
            images[4],
            {

                y:
                    -currentPhotoLift

            }
        );


        gsap.set(
            images[5],
            {

                y:
                    -currentPhotoLift

            }
        );

    };


    syncSceneSize();



    /* =====================================================
       UI
    ===================================================== */

    const heading =
        $(".transformation-heading", transformation);


    const storyIndex =
        $(".story-index", transformation);


    const storyTitle =
        $(".story-state-title", transformation);


    const captionTitle =
        $(".dog-caption-title", transformation);


    const notes =
        $$(".dog-note", transformation);


    const copyBefore =
        $(".transformation-copy-before", transformation);


    const copyMiddle =
        $(".transformation-copy-middle", transformation);


    const copyAfter =
        $(".transformation-copy-after", transformation);


    const processDescription =
        $(".transformation-description", transformation);



    /* =====================================================
       ATMOSPHERE
    ===================================================== */

    const halo =
        $(".dog-halo", transformation);


    const shadow =
        $(".dog-shadow", transformation);


    const ringOne =
        $(".dog-ring-one", transformation);


    const ringTwo =
        $(".dog-ring-two", transformation);


    const orbitOne =
        $(".orbit-one", transformation);


    const orbitTwo =
        $(".orbit-two", transformation);


    const ambientOne =
        $(".ambient-one", transformation);


    const ambientTwo =
        $(".ambient-two", transformation);


    const atmosphere =
        $(".transformation-wash", transformation);


    const grid =
        $(".transformation-grid", transformation);


    const light =
        $(".transformation-light", transformation);


    const lightSweep =
        $(".dog-light-sweep", transformation);


    const flash =
        $(".dog-flash", transformation);


    const scrollIndicator =
        $(".transformation-scroll", transformation);


    const finalMessage =
        $(".transformation-final", transformation);



    /* =====================================================
       INITIAL
    ===================================================== */

    gsap.set(
        sequence,
        {

            scale:
                .88,

            y:
                55

        }
    );


    gsap.set(
        camera,
        {

            rotateX:
                0,

            rotateY:
                0,

            z:
                0

        }
    );


    gsap.set(
        shots,
        {

            opacity:
                0,

            visibility:
                "hidden",

            scale:
                .94,

            x:
                0,

            y:
                0,

            rotateZ:
                0

        }
    );



    /* =====================================================
       FOTO 1
    ===================================================== */

    gsap.set(
        shots[0],
        {

            opacity:
                1,

            visibility:
                "visible",

            scale:
                1

        }
    );



    /* =====================================================
       IMAGE LOOK
    ===================================================== */

    gsap.set(
        images[0],
        {

            scale:
                1.664,

            filter:
                "saturate(.78) contrast(.92)"

        }
    );


    gsap.set(
        images[1],
        {

            scale:
                1.6,

            filter:
                "saturate(.80) contrast(.93)"

        }
    );


    gsap.set(
        images[2],
        {

            scale:
                1.63,

            filter:
                "saturate(.82) contrast(.94)"

        }
    );


    gsap.set(
        images[3],
        {

            scale:
                1.5,

            filter:
                "saturate(.60) contrast(.97) brightness(1.01) sepia(.20)"

        }
    );


    gsap.set(
        images[4],
        {

            scale:
                1.5,

            filter:
                "saturate(.62) contrast(.97) brightness(1.01) sepia(.20)"

        }
    );


    gsap.set(
        images[5],
        {

            scale:
                1.5,

            filter:
                "saturate(.64) contrast(.98) brightness(1.01) sepia(.20)"

        }
    );



    /* =====================================================
       UI INITIAL
    ===================================================== */

    gsap.set(
        copyMiddle,
        {

            opacity:
                0,

            y:
                20

        }
    );


    gsap.set(
        copyAfter,
        {

            opacity:
                .25,

            x:
                20

        }
    );


    gsap.set(
        notes,
        {

            opacity:
                0

        }
    );


    gsap.set(
        flash,
        {

            opacity:
                0,

            scale:
                .7

        }
    );


    gsap.set(
        lightSweep,
        {

            opacity:
                0,

            x:
                0

        }
    );


    gsap.set(
        finalMessage,
        {

            opacity:
                0,

            scale:
                .9

        }
    );



    /* =====================================================
       INITIAL CAPTION
    ===================================================== */

    if (captionTitle) {

        gsap.set(
            captionTitle,
            {

                opacity:
                    1,

                x:
                    0

            }
        );


        captionTitle.textContent =
            "ANTES";

    }



    /* =====================================================
       STATES
    ===================================================== */

    const states = [

        {
            index:
                "01 / 06",

            title:
                "OBSERVAR"
        },

        {
            index:
                "02 / 06",

            title:
                "ENTENDER"
        },

        {
            index:
                "03 / 06",

            title:
                "PREPARAR"
        },

        {
            index:
                "04 / 06",

            title:
                "TRANSFORMAR"
        },

        {
            index:
                "05 / 06",

            title:
                "CUIDAR"
        },

        {
            index:
                "06 / 06",

            title:
                "DESPUÉS"
        }

    ];



    let currentState =
        -1;


    let currentCaptionState =
        "ANTES";



    /* =====================================================
       STATE UPDATE
    ===================================================== */

    function updateState(progress) {

        let index =
            Math.floor(
                progress * 6
            );


        if (index >= 6) {

            index =
                5;

        }


        if (
            index !==
            currentState
        ) {

            currentState =
                index;


            const state =
                states[index];


            if (storyIndex) {

                storyIndex.textContent =
                    state.index;

            }


            if (storyTitle) {

                storyTitle.textContent =
                    state.title;

            }

        }


        const nextCaptionState =
            index >= 3
                ? "DESPUÉS"
                : "ANTES";


        if (
            nextCaptionState ===
            currentCaptionState
        ) {

            return;

        }


        currentCaptionState =
            nextCaptionState;


        if (captionTitle) {

            captionTitle.textContent =
                nextCaptionState;

        }

    }



    /* =====================================================
       MAIN SCROLL
    ===================================================== */

    const mobileScroll =
        window.innerWidth <= 600;


    const timeline =
        gsap.timeline({

            scrollTrigger: {

                trigger:
                    transformation,

                start:
                    "top top",

                /*
                 * Usamos la distancia real de la sección.
                 * Esto evita depender de cómo Safari calcule
                 * bottom/bottom cuando cambia la barra.
                 */

                end: () => {

                    const sectionHeight =
                        transformation.offsetHeight;


                    const viewportHeight =
                        window.innerHeight;


                    const distance =
                        sectionHeight -
                        viewportHeight;


                    return "+=" +
                        Math.max(
                            distance,
                            viewportHeight * 5
                        );

                },

                /*
                 * En móvil la respuesta al dedo
                 * debe ser prácticamente inmediata.
                 *
                 * En desktop mantenemos el movimiento
                 * más cinematográfico.
                 */

                scrub:
                    mobileScroll
                        ? .2
                        : 1,

                invalidateOnRefresh:
                    true,

                onUpdate:
                    self =>
                        updateState(
                            self.progress
                        )

            }

        });



    /* =====================================================
       INTRO
    ===================================================== */

    timeline

        .to(
            sequence,
            {

                scale:
                    1,

                y:
                    0,

                duration:
                    1,

                ease:
                    "power3.out"

            }
        )

        .to(
            camera,
            {

                rotateX:
                    2,

                rotateY:
                    -3,

                duration:
                    1

            },
            "<"
        )



        /* =================================================
           01 → 02
        ================================================= */

        .to(
            shots[0],
            {

                opacity:
                    0,

                scale:
                    1.035,

                x:
                    -18,

                duration:
                    .55,

                ease:
                    "power2.inOut"

            }
        )

        .to(
            shots[1],
            {

                opacity:
                    1,

                visibility:
                    "visible",

                scale:
                    1,

                x:
                    0,

                duration:
                    .55,

                ease:
                    "power3.out"

            },
            "<+.12"
        )

        .to(
            notes[0],
            {

                opacity:
                    1,

                duration:
                    .35

            },
            "<"
        )



        /* =================================================
           02 → 03
        ================================================= */

        .to(
            shots[1],
            {

                opacity:
                    0,

                scale:
                    .97,

                x:
                    18,

                duration:
                    .55,

                ease:
                    "power2.inOut"

            }
        )

        .to(
            shots[2],
            {

                opacity:
                    1,

                visibility:
                    "visible",

                scale:
                    1,

                x:
                    0,

                duration:
                    .55,

                ease:
                    "power3.out"

            },
            "<+.12"
        )

        .to(
            notes[0],
            {

                opacity:
                    0,

                duration:
                    .25

            },
            "<"
        )

        .to(
            notes[1],
            {

                opacity:
                    .8,

                duration:
                    .35

            },
            "<+.15"
        )



        /* =================================================
           03 — BEFORE FRONT
        ================================================= */

        .to(
            shots[2],
            {

                scale:
                    .96,

                duration:
                    .5

            }
        )



        /* =================================================
           TRANSFORMATION
           03 → 04
        ================================================= */

        .to(
            notes[1],
            {

                opacity:
                    0,

                duration:
                    .25

            }
        )

        .to(
            ringOne,
            {

                scale:
                    1.14,

                rotation:
                    35,

                duration:
                    .7

            },
            "<"
        )

        .to(
            ringTwo,
            {

                scale:
                    1.08,

                rotation:
                    -25,

                duration:
                    .7

            },
            "<"
        )

        .to(
            lightSweep,
            {

                opacity:
                    1,

                x:
                    "260%",

                duration:
                    .65,

                ease:
                    "power2.inOut"

            }
        )

        .to(
            flash,
            {

                opacity:
                    .95,

                scale:
                    1.15,

                duration:
                    .18,

                ease:
                    "power2.out"

            },
            "<+.18"
        )

        .to(
            shots[2],
            {

                opacity:
                    0,

                scale:
                    .82,

                duration:
                    .25

            },
            "<+.08"
        )

        .to(
            shots[3],
            {

                opacity:
                    1,

                visibility:
                    "visible",

                scale:
                    1,

                duration:
                    .42,

                ease:
                    "power3.out"

            },
            "<+.12"
        )

        .to(
            flash,
            {

                opacity:
                    0,

                scale:
                    1.45,

                duration:
                    .32

            },
            "<+.1"
        )

        .to(
            lightSweep,
            {

                opacity:
                    0,

                x:
                    "500%",

                duration:
                    .35

            },
            "<"
        )

        .to(
            copyBefore,
            {

                opacity:
                    .25,

                x:
                    -18,

                duration:
                    .35

            },
            "<"
        )

        .to(
            copyMiddle,
            {

                opacity:
                    1,

                y:
                    0,

                duration:
                    .45

            },
            "<+.1"
        )



        /* =================================================
           04 → 05
        ================================================= */

        .to(
            shots[3],
            {

                opacity:
                    0,

                scale:
                    1.04,

                x:
                    18,

                duration:
                    .55,

                ease:
                    "power2.inOut"

            }
        )

        .to(
            shots[4],
            {

                opacity:
                    1,

                visibility:
                    "visible",

                scale:
                    1,

                x:
                    0,

                duration:
                    .55,

                ease:
                    "power3.out"

            },
            "<+.12"
        )



        /* =================================================
           05 → 06
        ================================================= */

        .to(
            shots[4],
            {

                opacity:
                    0,

                scale:
                    .97,

                x:
                    -18,

                duration:
                    .55,

                ease:
                    "power2.inOut"

            }
        )

        .to(
            shots[5],
            {

                opacity:
                    1,

                visibility:
                    "visible",

                scale:
                    1,

                x:
                    0,

                duration:
                    .6,

                ease:
                    "power3.out"

            },
            "<+.12"
        )

        .to(
            copyMiddle,
            {

                opacity:
                    .2,

                y:
                    -15,

                duration:
                    .4

            },
            "<"
        )

        .to(
            copyAfter,
            {

                opacity:
                    .9,

                x:
                    0,

                duration:
                    .5

            },
            "<+.1"
        )

        .to(
            notes[2],
            {

                opacity:
                    1,

                y:
                    -8,

                duration:
                    .45

            },
            "<"
        )



        /* =================================================
           ANTES / DESPUÉS → FINAL
        ================================================= */

        .to(
            captionTitle,
            {

                opacity:
                    0,

                x:
                    -12,

                duration:
                    .35,

                ease:
                    "power2.out"

            },
            "<+.05"
        )



        /* =================================================
           FINAL
        ================================================= */

        .to(
            shots[5],
            {

                scale:
                    1.03,

                duration:
                    .7

            }
        )

        .to(
            scrollIndicator,
            {

                opacity:
                    0,

                y:
                    15,

                duration:
                    .4

            },
            "<"
        )

        .to(
            processDescription,
            {

                opacity:
                    0,

                y:
                    15,

                duration:
                    .4,

                ease:
                    "power2.inOut"

            },
            "<"
        )

        .to(
            copyMiddle,
            {

                opacity:
                    0,

                duration:
                    .3

            },
            "<"
        )

        .to(
            copyAfter,
            {

                opacity:
                    0,

                y:
                    -15,

                duration:
                    .35

            },
            "<"
        )

        .to(
            notes[2],
            {

                opacity:
                    0,

                duration:
                    .3

            },
            "<"
        )

        .to(
            sequence,
            {

                scale:
                    .88,

                opacity:
                    .08,

                duration:
                    .7,

                ease:
                    "power2.inOut"

            }
        )

        .to(
            scene,
            {

                opacity:
                    .22,

                scale:
                    1.08,

                duration:
                    .7

            },
            "<"
        )

        .to(
            finalMessage,
            {

                opacity:
                    1,

                scale:
                    1,

                duration:
                    .7,

                ease:
                    "power3.out"

            },
            "<+.15"
        )

        .to(
            light,
            {

                scale:
                    1.18,

                opacity:
                    .75,

                duration:
                    .7

            },
            "<"
        );



    /* =====================================================
       CONTINUOUS ATMOSPHERE
    ===================================================== */

    gsap.to(
        halo,
        {

            scale:
                1.12,

            ease:
                "none",

            scrollTrigger: {

                trigger:
                    transformation,

                start:
                    "top top",

                end:
                    "bottom bottom",

                scrub:
                    true

            }

        }
    );


    gsap.to(
        ambientTwo,
        {

            rotation:
                360,

            scale:
                1.08,

            ease:
                "none",

            scrollTrigger: {

                trigger:
                    transformation,

                start:
                    "top top",

                end:
                    "bottom bottom",

                scrub:
                    true

            }

        }
    );


    gsap.to(
        ambientOne,
        {

            rotation:
                -180,

            x:
                20,

            ease:
                "none",

            scrollTrigger: {

                trigger:
                    transformation,

                start:
                    "top top",

                end:
                    "bottom bottom",

                scrub:
                    true

            }

        }
    );


    gsap.to(
        ringOne,
        {

            rotation:
                360,

            ease:
                "none",

            scrollTrigger: {

                trigger:
                    transformation,

                start:
                    "top top",

                end:
                    "bottom bottom",

                scrub:
                    true

            }

        }
    );


    gsap.to(
        ringTwo,
        {

            rotation:
                -360,

            ease:
                "none",

            scrollTrigger: {

                trigger:
                    transformation,

                start:
                    "top top",

                end:
                    "bottom bottom",

                scrub:
                    true

            }

        }
    );


    gsap.to(
        orbitOne,
        {

            rotation:
                360,

            ease:
                "none",

            scrollTrigger: {

                trigger:
                    transformation,

                start:
                    "top top",

                end:
                    "bottom bottom",

                scrub:
                    true

            }

        }
    );


    gsap.to(
        orbitTwo,
        {

            rotation:
                -360,

            ease:
                "none",

            scrollTrigger: {

                trigger:
                    transformation,

                start:
                    "top top",

                end:
                    "bottom bottom",

                scrub:
                    true

            }

        }
    );


    gsap.to(
        atmosphere,
        {

            xPercent:
                6,

            yPercent:
                -3,

            scale:
                1.12,

            ease:
                "none",

            scrollTrigger: {

                trigger:
                    transformation,

                start:
                    "top top",

                end:
                    "bottom bottom",

                scrub:
                    true

            }

        }
    );


    gsap.to(
        shadow,
        {

            scaleX:
                .75,

            opacity:
                .55,

            ease:
                "none",

            scrollTrigger: {

                trigger:
                    transformation,

                start:
                    "top top",

                end:
                    "bottom bottom",

                scrub:
                    true

            }

        }
    );



    /* =====================================================
       RESPONSIVE RESIZE
    ===================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        syncSceneSize();

                        ScrollTrigger.refresh();

                    },
                    120
                );

        }
    );

}



/* =========================================================
   ABOUT
========================================================= */

const aboutTimeline =
    gsap.timeline({

        scrollTrigger: {

            trigger:
                ".about",

            start:
                "top 70%",

            toggleActions:
                "play none none reverse"

        }

    });


aboutTimeline

    .from(
        ".about-image img",
        {

            scale:
                1.25,

            duration:
                1.5,

            ease:
                "power3.out"

        }
    )

    .from(
        ".about-content > *",
        {

            y:
                50,

            opacity:
                0,

            stagger:
                .12,

            duration:
                .7

        },
        "-=1"
    );



/* =========================================================
   RESERVATION
========================================================= */

const reservationTimeline =
    gsap.timeline({

        scrollTrigger: {

            trigger:
                ".reservation",

            start:
                "top 70%",

            toggleActions:
                "play none none reverse"

        }

    });


reservationTimeline

    .from(
        ".reservation-inner > *",
        {

            y:
                60,

            opacity:
                0,

            stagger:
                .12,

            duration:
                .8,

            ease:
                "power3.out"

        }
    );



/* =========================================================
   RESERVATION BACKGROUND
========================================================= */

gsap.to(
    ".reservation-background",
    {

        rotation:
            8,

        x:
            100,

        ease:
            "none",

        scrollTrigger: {

            trigger:
                ".reservation",

            start:
                "top bottom",

            end:
                "bottom top",

            scrub:
                true

        }

    }
);



/* =========================================================
   SCROLL PROGRESS
========================================================= */

gsap.to(
    ".scroll-progress span",
    {

        width:
            "100%",

        ease:
            "none",

        scrollTrigger: {

            start:
                "top top",

            end:
                "max",

            scrub:
                .2

        }

    }
);



/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    $$("main section[id]");


const navLinks =
    $$(".nav-link");


sections.forEach(
    section => {

        ScrollTrigger.create({

            trigger:
                section,

            start:
                "top center",

            end:
                "bottom center",

            onEnter:
                () =>
                    activate(
                        section.id
                    ),

            onEnterBack:
                () =>
                    activate(
                        section.id
                    )

        });

    }
);



function activate(id) {

    navLinks.forEach(
        link => {

            const target =
                link.getAttribute(
                    "href"
                );


            link.classList.toggle(
                "active",
                target ===
                    "#" + id
            );

        }
    );

}



/* =========================================================
   LOAD / REFRESH
========================================================= */

window.addEventListener(
    "load",
    () => {

        ScrollTrigger.refresh();

    }
);

/* =========================================================
   PAGE INTRO
   UNA VEZ POR SESIÓN + SCROLL BLOQUEADO
========================================================= */

const pageIntro =
    document.querySelector(".page-intro");


const pageIntroBrand =
    document.querySelector(".page-intro-brand");


/*
 * Comprobamos si esta sesión ya ha visto la intro.
 */

const introAlreadyShown =
    sessionStorage.getItem("canisIntroShown") === "true";


if (
    pageIntro &&
    pageIntroBrand &&
    !introAlreadyShown
) {

    /*
     * BLOQUEAR SCROLL
     */

    const originalOverflow =
        document.body.style.overflow;


    document.body.style.overflow =
        "hidden";


    /*
     * Marcar la intro como mostrada
     * inmediatamente.
     *
     * Así no vuelve a aparecer
     * durante esta sesión.
     */

    sessionStorage.setItem(
        "canisIntroShown",
        "true"
    );


    /*
     * TIMELINE
     */

    const pageIntroTimeline =
        gsap.timeline();


    pageIntroTimeline

        /*
         * Fondo blanco inicial
         */
        .set(
            pageIntro,
            {
                opacity: 1
            }
        )

        /*
         * APARECE LOGO + CANIS
         */
        .to(
            pageIntroBrand,
            {

                opacity: 1,

                y: 0,

                scale: 1,

                duration: 1.15,

                ease:
                    "power3.out"

            }
        )

        /*
         * PAUSA
         */
        .to(
            pageIntroBrand,
            {

                opacity: 1,

                duration: .65

            }
        )

        /*
         * SALE EL CONJUNTO
         */
        .to(
            pageIntroBrand,
            {

                opacity: 0,

                y: -10,

                scale: .985,

                duration: .75,

                ease:
                    "power2.inOut"

            }
        )

        /*
         * FADE FINAL
         */
        .to(
            pageIntro,
            {

                opacity: 0,

                duration: .8,

                ease:
                    "power2.inOut",

                onComplete: () => {

                    /*
                     * Eliminamos la intro
                     */
                    pageIntro.remove();


                    /*
                     * DEVOLVEMOS EL SCROLL
                     */
                    document.body.style.overflow =
                        originalOverflow;

                }

            },

            "-=.20"

        );



} else if (pageIntro) {

    /*
     * La intro ya se mostró
     * durante esta sesión.
     *
     * La eliminamos inmediatamente.
     */

    pageIntro.remove();

}