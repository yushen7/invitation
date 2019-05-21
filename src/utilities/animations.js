export default function enterAnimation({
    els = [],
    animationClassName = {},
    cur = 0,
    targetsData = [],
    event = '',
    delay = 1000
}) {
    const el = els[cur];
    //use animate.css;
    const defaultAnimationClassName = 'animated fadeIn';
    const dacl = defaultAnimationClassName;
    const id = el.getAttribute('data-id');
    //to detect the targetsData
    const val = targetsData[id];
    val.clName = !animationClassName ?
        dacl :
        val.clName;
    val.show = true;
    ++cur;
    if (cur === els.length) {
        return true;
    }
    setTimeout(() => {
        enterAnimation({
            els: els,
            cur: cur,
            targetsData,
            event,
            delay: delay
        })
    }, delay);
    return false;
    // el.addEventListener(event, (e) => {
    //     e.preventDefault();
    //     enterAnimation({
    //         els: els,
    //         cur: cur,
    //         targetsData,
    //         event
    //     });
    // }, {
    //     capture: true,
    //     once: true
    // });
};