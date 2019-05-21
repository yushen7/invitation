export default function detectTransitionsPrefix() {
    const transitions = new Map();
    let transition, transitionEnd;
    transitions.set('webkitTransition', 'webkitTransitionEnd');
    transitions.set('transition', 'transitionend');

    const el = document.createElement('_');
    const style = el.style;
    for (let [i, j] of transitions) {
        if (style[i] === '') {
            transition = i;
            transitionEnd = j;
            break;
        }
    }
    const animations = new Map();
    animations.set('webkitAnimation', 'webkitAnimationEnd');
    animations.set('animation', 'animationend');
    let animationEnd, animation;
    for (let [i, j] of animations) {
        if (style[i] === '') {
            animation = i;
            animationEnd = j;
        }
    }
    return {
        transition,
        transitionEnd,
        animation,
        animationEnd
    }
}