//path handler
const pathHandler = (path) => {
    let res = {};
    console.log(res);
    const main = path.split('?');
    console.log(main);
    Object.assign(res, {
        "target": main[0]
    });
    return res;
}

export default pathHandler;