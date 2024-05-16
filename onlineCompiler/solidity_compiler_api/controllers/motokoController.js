const mo = require('motoko');

async function executeMotoko(req, res) {
    const motokoCode = `${req.body.code}`;
    mo.write('Main.mo', motokoCode);
    res.json({"func": mo.candid('Main.mo')});
}

module.exports = {
    executeMotoko
};
