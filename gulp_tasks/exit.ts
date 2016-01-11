// Hack because Mocha doesn't exit
export = function exit(gulp, plugins, option) {
    return () => {
        process.exit(0);
    };
};
