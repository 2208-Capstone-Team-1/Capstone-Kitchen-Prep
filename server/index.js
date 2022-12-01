const app = require('./app');
const { seed } = require('./db');

const init = async () => {
    try {
        await seed();
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`listening on port ${port}`));
    }
    catch (ex) {
        console.log(ex);
    }
};

init();



