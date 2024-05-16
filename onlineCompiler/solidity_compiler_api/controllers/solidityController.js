const solc = require('solc');

function compileSolidity(req, res) {
    const { code, version } = req.body;

    solc.loadRemoteVersion(version, function (err, solcSpecific) {
        if (err) {
            console.error("Error loading Solidity version:", err);
            return res.status(500).json({ error: 'Failed to load Solidity version', details: err.message });
        }

        try {
            const input = {
                language: 'Solidity',
                sources: {
                    'Contract.sol': {
                        content: code,
                    },
                },
                settings: {
                    outputSelection: {
                        '*': {
                            '*': ['*'],
                        },
                    },
                },
            };

            const output = JSON.parse(solcSpecific.compile(JSON.stringify(input)));
            res.json({ output });
        } catch (compileError) {
            console.error("Compilation error:", compileError);
            res.status(500).json({ error: 'Compilation error', details: compileError.message });
        }
    });
}

module.exports = {
    compileSolidity
};
